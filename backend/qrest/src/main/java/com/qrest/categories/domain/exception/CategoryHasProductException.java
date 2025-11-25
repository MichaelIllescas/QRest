package com.qrest.categories.domain.exception;

public class CategoryHasProductException extends RuntimeException {
    public CategoryHasProductException(Long categpryId) {
        super("No se puede eliminar la categoria con ID:" + categpryId + "Porque tiene productos asociados");
    }
}
