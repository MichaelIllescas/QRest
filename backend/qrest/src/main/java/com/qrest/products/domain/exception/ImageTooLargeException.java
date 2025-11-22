package com.qrest.products.domain.exception;

public class ImageTooLargeException extends RuntimeException {
    public ImageTooLargeException(long maxSize) {
        super("El tamaño máximo permitido es de " + maxSize + " bytes");
    }
}
