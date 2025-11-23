package com.qrest.shared.exception;



import lombok.Getter;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Getter
@Setter
@Schema(description = "Estructura estándar de error devuelta por la API")
public class ApiError {

    @Schema(description = "Marca de tiempo del error (server local)", example = "2025-11-23T12:34:56")
    private LocalDateTime timestamp;

    @Schema(description = "Código HTTP", example = "400")
    private int status;

    @Schema(description = "Descripción corta del error", example = "Bad Request")
    private String error;

    @Schema(description = "Mensaje detallado", example = "El nombre del producto no puede estar vacío")
    private String message;

    @Schema(description = "Ruta solicitada donde ocurrió el error", example = "/api/admin/products/create")
    private String path;

    public ApiError(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

}
