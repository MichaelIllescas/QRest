package com.qrest.products.application.ports.out;

import org.springframework.web.multipart.MultipartFile;

public interface ProductImageStoragePort {
    String save( MultipartFile file);
}
