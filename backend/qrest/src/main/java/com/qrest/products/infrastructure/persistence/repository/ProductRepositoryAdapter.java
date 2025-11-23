package com.qrest.products.infrastructure.persistence.repository;

import com.qrest.products.application.ports.out.ProductRepositoryPort;
import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.mapper.ProductMapper;
import com.qrest.products.infrastructure.persistence.entity.ProductEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryAdapter implements ProductRepositoryPort {

    private final ProductRepositoryJPA productRepositoryJPA;
    private final ProductMapper productMapper;

    public ProductRepositoryAdapter(ProductRepositoryJPA productRepositoryJPA, ProductMapper productMapper) {
        this.productRepositoryJPA = productRepositoryJPA;
        this.productMapper = productMapper;
    }
    @Override
    public Product save(Product product) {
        ProductEntity productEntity = productMapper.productToEntity(product);
        ProductEntity productSaved = productRepositoryJPA.save(productEntity);
        return productMapper.entityToProduct(productSaved);
    }

    @Override
    public Boolean existsByName(String name) {
        return productRepositoryJPA.existsByName(name);
    }

    @Override
    public Boolean existsById(Long id) {
        return productRepositoryJPA.existsById(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepositoryJPA.findAll().stream().map(productMapper::entityToProduct).toList();
    }
}
