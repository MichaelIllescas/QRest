package com.qrest.products.domain.exception;

public class ProductIntegrityException extends RuntimeException {
    public ProductIntegrityException(String message) {
        super(message);
    }
}
