package com.qrest.categories.domain.exception;

import com.qrest.categories.domain.model.Category;

/**
 * Excepción de dominio lanzada cuando no se encuentra una categoría.

 * @author QRest Team
 * @version 1.0
 */
public class CategoryNotFoundException extends RuntimeException {
    private final Long categoryId;

    public CategoryNotFoundException(Long categoryId) {
        super("Categoria con ID " + categoryId + "no encontrada");
        this.categoryId = categoryId;
    }
    public CategoryNotFoundException(String message) {
        super(message);
        this.categoryId = null;
    }
    public Long getCategoryId() {
        return categoryId;
    }
}
