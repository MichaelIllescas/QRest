package com.qrest.products.infrastructure.web.dto;

public class ProductImageUploadResponseDTO {
    private String imageUrl;

    public ProductImageUploadResponseDTO(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
