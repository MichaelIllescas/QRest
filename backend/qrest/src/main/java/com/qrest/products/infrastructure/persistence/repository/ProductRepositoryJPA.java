package com.qrest.products.infrastructure.persistence.repository;

import com.qrest.products.infrastructure.persistence.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepositoryJPA extends JpaRepository <ProductEntity, Long> {
    Boolean existsByName(String name);
}
