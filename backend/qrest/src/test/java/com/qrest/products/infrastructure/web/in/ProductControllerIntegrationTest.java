package com.qrest.products.infrastructure.web.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qrest.categories.domain.model.Category;
import com.qrest.products.application.ports.in.CreateProductUseCase;
import com.qrest.products.domain.exception.DuplicateProductException;
import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.mapper.ProductMapper;
import com.qrest.products.infrastructure.web.dto.CreateProductRequestDTO;
import com.qrest.products.infrastructure.web.dto.ProductDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests de integración (slice) para `ProductController`.
 *
 * Nota: usamos `@WebMvcTest` para probar el controlador en aislamiento, con MockMvc. Los beans dependientes
 * (`CreateProductUseCase` y `ProductMapper`) se mockean con `@MockBean`.
 *
 * Se incluyen pruebas con comentarios que explican propósito, preparación/mocks, entrada y expectativas.
 */
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = ProductController.class)
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CreateProductUseCase createProductUseCase;

    @MockBean
    private ProductMapper productMapper;

    /**
     * createProduct_success
     * - Propósito: verificar que el endpoint POST /api/admin/products/create acepta una petición válida,
     *   invoca el caso de uso, y retorna 201 con el ProductDTO resultante.
     * - Preparación / Mocks:
     *   * productMapper.createRequestDTOToProduct(...) -> devuelve un Product de dominio válido (sin id)
     *   * createProductUseCase.execute(...) -> devuelve Product con id asignado (simula persistencia)
     *   * productMapper.productToDTO(...) -> devuelve ProductDTO que será serializado en la respuesta
     * - Entrada: JSON válido de CreateProductRequestDTO
     * - Expectativa: status 201 y body JSON con id y name esperados
     */
    @Test
    void createProduct_success() throws Exception {
        CreateProductRequestDTO requestDTO = new CreateProductRequestDTO("Coca", "Descripción", 1.5, true, 1L, "img.jpg");

        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product mappedProduct = new Product(null, "Coca", "Descripción", 1.5, true, category, "img.jpg");
        Product createdProduct = new Product(100L, "Coca", "Descripción", 1.5, true, category, "img.jpg");
        ProductDTO responseDTO = new ProductDTO(100L, "Coca", "Descripción", 1.5, true, 1L, "Bebidas", "img.jpg");

        when(productMapper.createRequestDTOToProduct(any(CreateProductRequestDTO.class))).thenReturn(mappedProduct);
        when(createProductUseCase.execute(any(Product.class))).thenReturn(createdProduct);
        when(productMapper.productToDTO(createdProduct)).thenReturn(responseDTO);

        mockMvc.perform(post("/api/admin/products/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(100))
                .andExpect(jsonPath("$.name").value("Coca"));

        verify(productMapper).createRequestDTOToProduct(any(CreateProductRequestDTO.class));
        verify(createProductUseCase).execute(any(Product.class));
        verify(productMapper).productToDTO(createdProduct);
        verifyNoMoreInteractions(productMapper, createProductUseCase);
    }

    /**
     * createProduct_validationError
     * - Propósito: enviar una petición inválida (p.ej. nombre vacío) y verificar que el controlador devuelve 400
     *   por fallos de validación (@Valid).
     * - Preparación / Mocks: no se deben invocar los mocks si la validación falla antes.
     * - Entrada: JSON con name = ""
     * - Expectativa: status 400 y no interacción con el caso de uso.
     */
    @Test
    void createProduct_validationError() throws Exception {
        // name vacío produce @NotBlank violation
        CreateProductRequestDTO invalid = new CreateProductRequestDTO("", "D", 1.0, true, 1L, "img.jpg");

        mockMvc.perform(post("/api/admin/products/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(createProductUseCase);
        verifyNoInteractions(productMapper);
    }

    /**
     * createProduct_useCaseThrows
     * - Propósito: simular que el caso de uso lanza una excepción de dominio (p.ej. DuplicateProductException)
     *   y verificar que el controlador deja que la excepción se propague (HTTP 500 por defecto si no hay
     *   un handler global).
     * - Preparación / Mocks:
     *   * productMapper.createRequestDTOToProduct -> mappedProduct
     *   * createProductUseCase.execute -> lanza DuplicateProductException
     * - Entrada: petición válida
     * - Expectativa: status 500
     */
    @Test
    void createProduct_useCaseThrows() throws Exception {
        CreateProductRequestDTO requestDTO = new CreateProductRequestDTO("Coca", "Desc", 1.5, true, 1L, "img.jpg");
        Category category = Category.reconstitute(1L, "Bebidas", true);
        Product mappedProduct = new Product(null, "Coca", "Desc", 1.5, true, category, "img.jpg");

        when(productMapper.createRequestDTOToProduct(any(CreateProductRequestDTO.class))).thenReturn(mappedProduct);
        when(createProductUseCase.execute(any(Product.class))).thenThrow(new DuplicateProductException("dup"));

        mockMvc.perform(post("/api/admin/products/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isInternalServerError());

        verify(productMapper).createRequestDTOToProduct(any(CreateProductRequestDTO.class));
        verify(createProductUseCase).execute(any(Product.class));
    }
}

