package com.qrest.products.domain.exception;

public class InvalidImageTypeException extends RuntimeException {
    public InvalidImageTypeException(String allowedTypes) {
        super("Tipo de imagen no permitido. Solo se permiten: " + allowedTypes);
    }
}
