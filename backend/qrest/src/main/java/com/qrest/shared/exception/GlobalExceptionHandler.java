package com.qrest.shared.exception;

import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.products.domain.exception.ImageEmptyException;
import com.qrest.products.domain.exception.ImageTooLargeException;
import com.qrest.products.domain.exception.InvalidImageTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import org.springframework.web.bind.MethodArgumentNotValidException;

import com.qrest.categories.domain.exception.DuplicateCategoryNameException;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ApiError> buildResponse(
            HttpStatus status,
            String message,
            WebRequest request
    ) {
        ApiError error = new ApiError(
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(status).body(error);
    }


    //  404 — Not Found
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(NotFoundException ex, WebRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    //  400 — Bad Request
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequestException ex, WebRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    //  400 — Method argument not valid (validation errors)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, WebRequest request) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, message, request);
    }

    //  401 — Unauthorized
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiError> handleUnauthorized(UnauthorizedException ex, WebRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), request);
    }

    //  500 — Any unexpected Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneral(Exception ex, WebRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), request);
    }

    //400
    @ExceptionHandler(ImageEmptyException.class)
    public ResponseEntity<ApiError> handleImageEmpty(ImageEmptyException ex, WebRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    //413
    @ExceptionHandler(ImageTooLargeException.class)
    public ResponseEntity<ApiError> handleImageTooLarge(ImageTooLargeException ex, WebRequest request) {
        return buildResponse(HttpStatus.PAYLOAD_TOO_LARGE, ex.getMessage(), request);
    }

    //415
    @ExceptionHandler(InvalidImageTypeException.class)
    public ResponseEntity<ApiError> handleInvalidImageType(InvalidImageTypeException ex, WebRequest request) {
        return buildResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, ex.getMessage(), request);
    }

    // 409 — Conflict (nombre duplicado de categoría)
    @ExceptionHandler(DuplicateCategoryNameException.class)
    public ResponseEntity<ApiError> handleDuplicateCategoryName(DuplicateCategoryNameException ex, WebRequest request) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request);
    }

    // 404 — Not Found (categoría no encontrada)
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiError> handleCategoryNotFound(CategoryNotFoundException ex, WebRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }
}
