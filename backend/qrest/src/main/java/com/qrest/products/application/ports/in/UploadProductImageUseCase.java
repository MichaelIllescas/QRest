package com.qrest.products.application.ports.in;

import com.qrest.products.infrastructure.web.dto.ProductImageUploadResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UploadProductImageUseCase {
    ProductImageUploadResponseDTO uploadImage( MultipartFile file);
}
