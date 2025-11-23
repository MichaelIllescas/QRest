package com.qrest.categories.domain.exception;

public class DuplicateCategoryNameException extends RuntimeException {
    private final String categoryName;

    public DuplicateCategoryNameException(String categoryName) {
        super("ya existe una categoria con el nombre: " + categoryName);
        this.categoryName = categoryName;
    }
    public String getCategoryName() {
        return categoryName;
    }
}
