package com.qrest.products.application.ports.out;

import com.qrest.products.domain.model.Product;

import java.util.List;

public interface ProductRepositoryPort {

        public Product save(Product product);

        public Boolean existsByName(String name);

        public Boolean existsById(Long id);

         List<Product> getAllProducts();
}
