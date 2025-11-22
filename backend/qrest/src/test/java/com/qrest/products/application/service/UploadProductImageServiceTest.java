package com.qrest.products.application.service;

import com.qrest.products.application.ports.out.ProductImageStoragePort;
import com.qrest.products.domain.exception.ImageEmptyException;
import com.qrest.products.domain.exception.ImageTooLargeException;
import com.qrest.products.domain.exception.InvalidImageTypeException;
import com.qrest.products.infrastructure.web.dto.ProductImageUploadResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests para {@link UploadProductImageService}.
 *
 * Objetivo general:
 * - Validar las reglas de negocio y validaciones relacionadas con la subida de imágenes
 *   (tamaño máximo, tipos permitidos y archivo no vacío).
 *
 * Contrato de la suite:
 * - Dependencias externas (almacenamiento) son mocadas mediante {@link ProductImageStoragePort}.
 * - Se inyectan valores de configuración usando ReflectionTestUtils para garantizar
 *   escenarios deterministas (maxSize = 1024, allowedTypes = image/png,image/jpeg).
 */
@ExtendWith(MockitoExtension.class)
class UploadProductImageServiceTest {

    @Mock
    private ProductImageStoragePort storagePort;

    @InjectMocks
    private UploadProductImageService service;

    @BeforeEach
    void setUp() {
        // Configurar valores inyectados por @Value para que las pruebas sean deterministas.
        ReflectionTestUtils.setField(service, "maxSize", 1024L);
        ReflectionTestUtils.setField(service, "allowedTypes", "image/png,image/jpeg");
    }

    /**
     * Caso feliz: archivo válido -> debe delegar en el storage y devolver la URL.
     *
     * Entrada:
     * - MultipartFile con contenido, nombre y tipo "image/jpeg".
     * Dependencias simuladas:
     * - storagePort.save(...) devuelve una URL.
     * Resultado esperado:
     * - Se devuelve un DTO con la URL proporcionada por el storage.
     */
    @Test
    void uploadImage_happyPath_returnsUrl() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "product.jpg",
                "image/jpeg",
                "dummy-image-bytes".getBytes()
        );

        when(storagePort.save(any(MultipartFile.class))).thenReturn("http://cdn.example.com/product.jpg");

        ProductImageUploadResponseDTO response = service.uploadImage(file);

        assertThat(response).isNotNull();
        assertThat(response.getImageUrl()).isEqualTo("http://cdn.example.com/product.jpg");
    }

    /**
     * Validación: archivo vacío -> debe lanzar {@link ImageEmptyException}.
     *
     * Entrada: MultipartFile con 0 bytes.
     * Resultado esperado: ImageEmptyException.
     */
    @Test
    void uploadImage_emptyFile_throwsImageEmptyException() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "empty.jpg",
                "image/jpeg",
                new byte[0]
        );

        assertThatThrownBy(() -> service.uploadImage(file))
                .isInstanceOf(ImageEmptyException.class);
    }

    /**
     * Validación: archivo demasiado grande -> debe lanzar {@link ImageTooLargeException}.
     *
     * Escenario: se crea un arreglo de bytes con tamaño mayor a maxSize (1024).
     */
    @Test
    void uploadImage_tooLarge_throwsImageTooLargeException() {
        byte[] largeBytes = new byte[2048]; // bigger than maxSize(1024)
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "big.jpg",
                "image/jpeg",
                largeBytes
        );

        assertThatThrownBy(() -> service.uploadImage(file))
                .isInstanceOf(ImageTooLargeException.class);
    }

    /**
     * Validación: tipo de contenido no permitido -> debe lanzar {@link InvalidImageTypeException}.
     *
     * Entrada: MultipartFile con contentType "text/plain" que no está en allowedTypes.
     */
    @Test
    void uploadImage_invalidType_throwsInvalidImageTypeException() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "bad.txt",
                "text/plain",
                "not-an-image".getBytes()
        );

        assertThatThrownBy(() -> service.uploadImage(file))
                .isInstanceOf(InvalidImageTypeException.class);
    }
}
