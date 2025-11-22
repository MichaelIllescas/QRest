package com.qrest.products.infrastructure.storage;

import com.qrest.products.application.ports.out.ProductImageStoragePort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Component
public class FilesystemProductImageStorageAdapter implements ProductImageStoragePort {

    private static final String IMAGE_DIR = "product-images";

    @Override
    public String save(MultipartFile file) {

        try {
            Path directory = Paths.get(IMAGE_DIR);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            String original = file.getOriginalFilename();
            String extension = original.substring(original.lastIndexOf("."));
            String filename = UUID.randomUUID() + extension;

            Path filePath = directory.resolve(filename);
            Files.write(filePath, file.getBytes());

            return "/images/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen", e);
        }
    }
}
