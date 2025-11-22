package com.qrest.products.infrastructure.web.in;

import com.qrest.products.application.ports.in.UploadProductImageUseCase;
import com.qrest.products.infrastructure.web.dto.ProductImageUploadResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit test para el controlador {@link ImageProductUploadController} usando WebMvcTest.
 *
 * Objetivo:
 * - Probar la capa web (MVC) en aislamiento, sin levantar todo el contexto de Spring Boot.
 * - Verificar que el endpoint POST /api/admin/product-images/upload:
 *   - acepta multipart/form-data con un archivo,
 *   - delega en el caso de uso {@link UploadProductImageUseCase},
 *   - responde con 201 Created y un JSON que contiene la URL de la imagen.
 *
 * Setup:
 * - {@link MockMvc} para simular llamadas HTTP al controlador.
 * - {@link UploadProductImageUseCase} es un @MockBean para controlar la respuesta.
 */
@WebMvcTest(ImageProductUploadController.class)
class ImageProductUploadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UploadProductImageUseCase uploadProductImageUseCase;

    @Test
    @DisplayName("POST /upload -> devuelve 201 y URL de imagen")
    void uploadImage_ReturnsCreated() throws Exception {

        // Archivo simulado: representación de un multipart file enviado por el cliente.
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "producto.jpg",
                "image/jpeg",
                "contenidoFake".getBytes()
        );

        // Configurar el comportamiento esperado del caso de uso: devolver DTO con URL.
        when(uploadProductImageUseCase.uploadImage(any()))
                .thenReturn(new ProductImageUploadResponseDTO("http://localhost/images/producto.jpg"));

        // Ejecutar la llamada al endpoint y comprobar respuestas HTTP y contenido JSON.
        mockMvc.perform(
                        multipart("/api/admin/product-images/upload")
                                .file(file)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.imageUrl").value("http://localhost/images/producto.jpg"));
    }
}
