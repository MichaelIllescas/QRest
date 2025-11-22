package com.qrest.products.application.service;

import com.qrest.products.application.ports.in.UploadProductImageUseCase;
import com.qrest.products.application.ports.out.ProductImageStoragePort;
import com.qrest.products.domain.exception.ImageEmptyException;
import com.qrest.products.domain.exception.ImageTooLargeException;
import com.qrest.products.domain.exception.InvalidImageTypeException;
import com.qrest.products.infrastructure.web.dto.ProductImageUploadResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadProductImageService implements UploadProductImageUseCase {

    private final ProductImageStoragePort storagePort;

    @Value("${qrest.images.max-size}")
    private long maxSize;

    @Value("${qrest.images.allowed-types}")
    private String allowedTypes;

    public UploadProductImageService(ProductImageStoragePort storagePort) {
        this.storagePort = storagePort;
    }

    @Override
    public ProductImageUploadResponseDTO uploadImage(MultipartFile file) {

        if (file.isEmpty()) {
            throw new ImageEmptyException();
        }

        if (file.getSize() > maxSize) {
            throw new ImageTooLargeException(maxSize);
        }

        String contentType = file.getContentType();
        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new InvalidImageTypeException(allowedTypes);
        }

        // Guardar archivo en filesystem
        String imageUrl = storagePort.save(file);

        return new ProductImageUploadResponseDTO(imageUrl);
    }
}
