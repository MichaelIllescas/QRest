package com.qrest.products.infrastructure.web.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO para crear un producto.
 * - El precio puede ser 0.
 * - El estado `available` es opcional (si no viene, el backend decide el valor por defecto).
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Payload para crear un producto")
public class CreateProductRequestDTO {

    @NotBlank(message = "El nombre del producto no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Schema(description = "Nombre del producto", example = "Café Americano", required = true)
    private String name;

    @Size(max = 255, message = "La descripción no debe superar los 255 caracteres")
    @Schema(description = "Descripción del producto", example = "Café americano tradicional", required = false)
    private String description;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.00", inclusive = true, message = "El precio no puede ser negativo")
    @Digits(integer = 10, fraction = 2, message = "El precio debe tener un formato válido (hasta 2 decimales)")
    @Schema(description = "Precio del producto", example = "2.50", required = true)
    private Double price;

    @Schema(description = "Disponibilidad del producto", example = "true", required = false)
    private Boolean available;

    @NotNull(message = "La categoría es obligatoria")
    @Positive(message = "El ID de categoría debe ser un número positivo")
    @Schema(description = "ID de la categoría a la que pertenece el producto", example = "1", required = true)
    private Long categoryId;

    @Size(max = 255, message = "La URL de la imagen no debe superar los 255 caracteres")
    @Schema(description = "URL de la imagen del producto", example = "https://example.com/img.jpg", required = false)
    private String imageUrl;
}
