package com.qrest.products.infrastructure.web.in;

import com.qrest.products.application.ports.in.UploadProductImageUseCase;
import com.qrest.products.infrastructure.web.dto.ProductImageUploadResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/product-images")
@Tag(name = "Imagenes de Productos", description = "Endpoints para subir imágenes de productos")
public class ImageProductUploadController {

    private final UploadProductImageUseCase uploadProductImageUseCase;

    public ImageProductUploadController(UploadProductImageUseCase uploadProductImageUseCase) {
        this.uploadProductImageUseCase = uploadProductImageUseCase;
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Subir imagen",
            description = "Sube un archivo JPG o PNG y devuelve la URL pública.",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Imagen subida correctamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ProductImageUploadResponseDTO.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Archivo inválido o petición incorrecta. Razones posibles:\n" +
                                    "- La imagen está vacía\n" +
                                    "- El archivo no es JPG ni PNG\n" +
                                    "- El archivo supera el tamaño máximo permitido",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(ref = "ApiError")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "415",
                            description = "Tipo de archivo no soportado",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(ref = "ApiError")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500",
                            description = "Error interno del servidor",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(ref = "ApiError")
                            )
                    )
            }
    )
    public ProductImageUploadResponseDTO uploadProductImage(
            @RequestPart("file")
            @Parameter(
                    description = "Archivo de imagen (JPG o PNG). Campo obligatorio.",
                    required = true,
                    content = @Content(
                            mediaType = "multipart/form-data",
                            schema = @Schema(type = "string", format = "binary")
                    )
            )
            MultipartFile file
    ) {
        return uploadProductImageUseCase.uploadImage(file);
    }
}
