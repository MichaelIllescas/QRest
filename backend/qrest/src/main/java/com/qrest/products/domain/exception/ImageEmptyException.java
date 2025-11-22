package com.qrest.products.domain.exception;

public class ImageEmptyException extends RuntimeException {
    public ImageEmptyException() {
        super("El archivo está vacío");
    }
}
