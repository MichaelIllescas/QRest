package com.qrest.products.infrastructure.mapper;

import com.qrest.categories.infrastructure.persistence.repository.CategoryRepositoryAdapter;
import com.qrest.categories.domain.model.Category;
import com.qrest.products.domain.exception.ProductIntegrityException;
import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.persistence.entity.ProductEntity;
import com.qrest.products.infrastructure.web.dto.CreateProductRequestDTO;
import com.qrest.products.infrastructure.web.dto.ProductDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

/**
 * Suite de tests unitarios para ProductMapperImpl.
 *
 * Propósito:
 * - Verificar que las conversiones entre Product, ProductDTO, ProductEntity y CreateProductRequestDTO
 *   se realizan correctamente.
 * - Probar null-safety (cuando la entrada es null debe devolver null).
 * - Controlar la búsqueda de categoría mediante un mock de CategoryRepositoryPortAdapter.
 */
@ExtendWith(MockitoExtension.class)
class ProductMapperImplTest {

    @Mock
    private CategoryRepositoryAdapter categoryRepository;

    private ProductMapperImpl mapper;

    @BeforeEach
    void setUp() {
        mapper = new ProductMapperImpl(categoryRepository);
    }

    /**
     * productToDTO - Happy path
     * - Propósito: convertir un Product completo a ProductDTO conservando campos y categoría (id y nombre).
     */
    @Test
    void productToDTO_shouldMapFields() {
        Category category = Category.reconstitute(2L, "Bebidas", true);
        Product product = new Product(10L, "Coca", "Desc", 1.5, true, category, "img.jpg");

        ProductDTO dto = mapper.productToDTO(product);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(10L);
        assertThat(dto.getName()).isEqualTo("Coca");
        assertThat(dto.getCategoryId()).isEqualTo(2L);
        assertThat(dto.getCategoryName()).isEqualTo("Bebidas");
    }

    /**
     * productToDTO - null safety
     */
    @Test
    void productToDTO_shouldReturnNullWhenInputNull() {
        assertThat(mapper.productToDTO(null)).isNull();
    }

    /**
     * dtoToProduct - Happy path
     * - Propósito: convertir ProductDTO (que tiene categoryName) a Product usando Category.create(name).
     */
    @Test
    void dtoToProduct_shouldCreateCategoryFromName() {
        ProductDTO dto = new ProductDTO(5L, "Cafe", "Desc", 2.0, true, null, "Bebidas", "img.jpg");

        Product product = mapper.dtoToProduct(dto);

        assertThat(product).isNotNull();
        assertThat(product.getId()).isEqualTo(5L);
        assertThat(product.getCategory()).isNotNull();
        assertThat(product.getCategory().getName()).isEqualTo("Bebidas");
    }

    /**
     * dtoToProduct - null safety
     */
    @Test
    void dtoToProduct_shouldReturnNullWhenInputNull() {
        assertThat(mapper.dtoToProduct(null)).isNull();
    }

    /**
     * entityToProduct - Happy path
     * - Propósito: convertir ProductEntity a Product consultando categoryRepository.findById(id).
     */
    @Test
    void entityToProduct_shouldFetchCategoryById() {
        ProductEntity entity = new ProductEntity(11L, "Tea", "Desc", 1.2, true, 3L, "img2.jpg");
        Category category = Category.reconstitute(3L, "Tés", true);

        when(categoryRepository.findById(3L)).thenReturn(Optional.of(category));

        Product product = mapper.entityToProduct(entity);

        assertThat(product).isNotNull();
        assertThat(product.getId()).isEqualTo(11L);
        assertThat(product.getCategory()).isEqualTo(category);

        verify(categoryRepository).findById(3L);
    }

    /**
     * entityToProduct - category not found -> Product constructor throws ProductIntegrityException
     */
    @Test
    void entityToProduct_shouldReturnProductWithNullCategoryWhenNotFound() {
        ProductEntity entity = new ProductEntity(11L, "Tea", "Desc", 1.2, true, 99L, "img2.jpg");

        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        // Como el constructor de Product exige categoría no nula, se espera excepción de integridad
        assertThrows(ProductIntegrityException.class, () -> mapper.entityToProduct(entity));
        verify(categoryRepository).findById(99L);
    }

    /**
     * productToEntity - Happy path
     */
    @Test
    void productToEntity_shouldMapFields() {
        Category category = Category.reconstitute(4L, "Postres", true);
        Product product = new Product(20L, "Brownie", "Choco", 3.0, true, category, "img3.jpg");

        ProductEntity entity = mapper.productToEntity(product);

        assertThat(entity).isNotNull();
        assertThat(entity.getCategoryId()).isEqualTo(4L);
        assertThat(entity.getId()).isEqualTo(20L);
    }

    /**
     * createRequestDTOToProduct - Happy path
     * - Propósito: convertir CreateProductRequestDTO a Product consultando la categoría por id.
     */
    @Test
    void createRequestDTOToProduct_shouldFetchCategoryAndCreateProduct() {
        // Constructor: (String name, String description, Double price, Boolean available, Long categoryId, String imageUrl)
        CreateProductRequestDTO dto = new CreateProductRequestDTO("X", "D", 2.5, true, 7L, "img.png");
        Category category = Category.reconstitute(7L, "Salados", true);

        when(categoryRepository.findById(7L)).thenReturn(Optional.of(category));

        Product product = mapper.createRequestDTOToProduct(dto);

        assertThat(product).isNotNull();
        assertThat(product.getId()).isNull();
        assertThat(product.getCategory()).isEqualTo(category);

        verify(categoryRepository).findById(7L);
    }

    /**
     * createRequestDTOToProduct - null safety
     */
    @Test
    void createRequestDTOToProduct_shouldReturnNullWhenInputNull() {
        assertThat(mapper.createRequestDTOToProduct(null)).isNull();
    }
}
