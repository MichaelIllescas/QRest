package com.qrest.products.infrastructure.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

//se usa de response
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Representación pública de un producto")
public class ProductDTO {
    @Schema(description = "ID del producto", example = "1")
    private Long id;

    @Schema(description = "Nombre del producto", example = "Café Americano")
    private String name;

    @Schema(description = "Descripción del producto", example = "Café americano tradicional")
    private String description;

    @Schema(description = "Precio del producto", example = "2.50")
    private Double price;

    @Schema(description = "Disponibilidad del producto", example = "true")
    private Boolean available;

    @Schema(description = "ID de la categoría", example = "1")
    private Long categoryId;

    @Schema(description = "Nombre de la categoría", example = "Bebidas")
    private String categoryName;

    @Schema(description = "URL de la imagen del producto", example = "https://example.com/img.jpg")
    private String imageUrl;
}
