package com.qrest.products.application.ports.out;

import com.qrest.products.domain.model.Product;

public interface ProductRepositoryPort {

        public Product save(Product product);

        public Boolean existsByName(String name);

        public Boolean existsById(Long id);
}
