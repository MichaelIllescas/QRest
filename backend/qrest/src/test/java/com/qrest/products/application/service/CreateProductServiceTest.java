package com.qrest.products.application.service;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.model.Category;
import com.qrest.products.application.ports.out.ProductRepositoryPort;
import com.qrest.products.domain.exception.DuplicateProductException;
import com.qrest.products.domain.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

/**
 * Suite de tests unitarios para el servicio CreateProductService.
 *
 * Propósito general:
 * - Verificar la lógica del caso de uso de registrar (crear) un producto sin arrancar el contexto de Spring.
 * - Aislar dependencias (repositorios) mediante Mockito para probar solo la orquestación y reglas de negocio
 *   implementadas en el servicio.
 *
 * Contrato (resumen):
 * - Entrada: Product (debe contener name y category con id).
 * - Salida: Product devuelto por el repositorio (normalmente con id asignado después de persistir).
 * - Efectos: llama a productRepositoryPort.existsByName(name) y categoryRepositoryPort.findById(category.id)
 *   y finalmente productRepositoryPort.save(product) si las validaciones pasan.
 * - Errores esperados: DuplicateProductException (nombre duplicado), CategoryNotFoundException (categoría inexistente),
 *   propagación de excepciones del repositorio, y NPE si se pasa null actualmente.
 */
@ExtendWith(MockitoExtension.class)
class CreateProductServiceTest {

    @Mock
    private ProductRepositoryPort productRepositoryPort;

    @Mock
    private CategoryRepositoryPort categoryRepositoryPort;

    private CreateProductService createProductService;

    @BeforeEach
    void setUp() {
        createProductService = new CreateProductService(productRepositoryPort, categoryRepositoryPort);
    }

    /**
     * shouldSaveProductWhenValid
     * - Propósito: Happy path — cuando el nombre no existe y la categoría existe, se debe persistir el producto.
     * - Preparación / Mocks:
     *   * productRepositoryPort.existsByName("Coca") -> false
     *   * categoryRepositoryPort.findById(1L) -> Optional.of(category)
     *   * productRepositoryPort.save(...) -> devuelve un Product con id (simula repo asignando id)
     * - Entrada: Product con id=null, name="Coca", category.id=1
     * - Expectativa: se devuelve el Product guardado (con id), se llamó a existsByName, findById y save.
     * - Verificaciones adicionales: se captura el Product pasado a save y se comprueba nombre y categoría.
     */
    @Test
    void shouldSaveProductWhenValid() {
        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product product = new Product(null, "Coca", "Descripción", 1.5, true, category, "img.jpg");

        when(productRepositoryPort.existsByName("Coca")).thenReturn(false);
        when(categoryRepositoryPort.findById(1L)).thenReturn(Optional.of(category));

        Product saved = new Product(1L, "Coca", "Descripción", 1.5, true, category, "img.jpg");
        when(productRepositoryPort.save(any(Product.class))).thenReturn(saved);

        Product result = createProductService.execute(product);

        // Resultado esperado: repo devuelve producto persistido
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);

        // Verificar que el objeto pasado a save contiene los datos esperados
        ArgumentCaptor<Product> captor = ArgumentCaptor.forClass(Product.class);
        verify(productRepositoryPort).save(captor.capture());
        Product captured = captor.getValue();
        assertThat(captured.getName()).isEqualTo("Coca");
        assertThat(captured.getCategory()).isEqualTo(category);

        // Verificar interacciones esperadas y ausencia de llamadas extra
        verify(productRepositoryPort).existsByName("Coca");
        verify(categoryRepositoryPort).findById(1L);
        verifyNoMoreInteractions(productRepositoryPort, categoryRepositoryPort);
    }

    /**
     * shouldThrowDuplicateWhenNameExists
     * - Propósito: Asegurar que si ya existe un producto con el mismo nombre, el servicio lanza DuplicateProductException.
     * - Preparación / Mocks:
     *   * productRepositoryPort.existsByName("Coca") -> true
     * - Entrada: Product con name="Coca"
     * - Expectativa: DuplicateProductException lanzada y NO se llama a save ni a la búsqueda de categoría.
     */
    @Test
    void shouldThrowDuplicateWhenNameExists() {
        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product product = new Product(null, "Coca", "Descripción", 1.5, true, category, "img.jpg");

        when(productRepositoryPort.existsByName("Coca")).thenReturn(true);

        assertThrows(DuplicateProductException.class, () -> createProductService.execute(product));

        // Verificaciones: existsByName fue consultado, no se intentó guardar y no hubo interacción con categoryRepository
        verify(productRepositoryPort).existsByName("Coca");
        verify(productRepositoryPort, never()).save(any());
        verifyNoMoreInteractions(productRepositoryPort);
        verifyNoInteractions(categoryRepositoryPort);
    }

    /**
     * shouldThrowCategoryNotFound
     * - Propósito: Si la categoría asociada al producto no existe, lanzar CategoryNotFoundException.
     * - Preparación / Mocks:
     *   * productRepositoryPort.existsByName("Coca") -> false
     *   * categoryRepositoryPort.findById(1L) -> Optional.empty()
     * - Entrada: Product con category.id = 1
     * - Expectativa: CategoryNotFoundException lanzada y no se llama a save.
     */
    @Test
    void shouldThrowCategoryNotFound() {
        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product product = new Product(null, "Coca", "Descripción", 1.5, true, category, "img.jpg");

        when(productRepositoryPort.existsByName("Coca")).thenReturn(false);
        when(categoryRepositoryPort.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CategoryNotFoundException.class, () -> createProductService.execute(product));

        // Verificaciones: se consultó existsByName y findById; save no fue llamado
        verify(productRepositoryPort).existsByName("Coca");
        verify(categoryRepositoryPort).findById(1L);
        verify(productRepositoryPort, never()).save(any());
        verifyNoMoreInteractions(productRepositoryPort, categoryRepositoryPort);
    }

    /**
     * shouldPropagateWhenSaveFails
     * - Propósito: Asegurar que si el repositorio lanza una excepción durante save, esta se propaga.
     * - Preparación / Mocks:
     *   * productRepositoryPort.existsByName("Coca") -> false
     *   * categoryRepositoryPort.findById(1L) -> Optional.of(category)
     *   * productRepositoryPort.save(...) -> lanza RuntimeException("DB error")
     * - Entrada: Product válido
     * - Expectativa: la RuntimeException se propaga hacia el caller.
     */
    @Test
    void shouldPropagateWhenSaveFails() {
        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product product = new Product(null, "Coca", "Descripción", 1.5, true, category, "img.jpg");

        when(productRepositoryPort.existsByName("Coca")).thenReturn(false);
        when(categoryRepositoryPort.findById(1L)).thenReturn(Optional.of(category));
        when(productRepositoryPort.save(any(Product.class))).thenThrow(new RuntimeException("DB error"));

        assertThrows(RuntimeException.class, () -> createProductService.execute(product));

        verify(productRepositoryPort).existsByName("Coca");
        verify(categoryRepositoryPort).findById(1L);
        verify(productRepositoryPort).save(any());
        verifyNoMoreInteractions(productRepositoryPort, categoryRepositoryPort);
    }

    /**
     * shouldThrowNPEWhenProductIsNull
     * - Propósito: Documentar comportamiento actual cuando se pasa null al servicio (hoy lanza NullPointerException).
     * - Preparación / Mocks: ninguna
     * - Entrada: null
     * - Expectativa: NullPointerException y sin interacciones con repositorios.
     * - Nota: Si prefieres manejar null con IllegalArgumentException, hay que cambiar la implementación del servicio.
     */
    @Test
    void shouldThrowNPEWhenProductIsNull() {
        assertThrows(NullPointerException.class, () -> createProductService.execute(null));
        verifyNoInteractions(productRepositoryPort, categoryRepositoryPort);
    }
}
