package com.qrest.products.application.service;

import com.qrest.products.application.ports.in.GetAllProductsUsecase;
import com.qrest.products.application.ports.out.ProductRepositoryPort;
import com.qrest.products.domain.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListProductsService implements GetAllProductsUsecase {

    private final ProductRepositoryPort productRepositoryPort;

    public ListProductsService(ProductRepositoryPort productRepositoryPort) {
        this.productRepositoryPort = productRepositoryPort;
    }
    @Override
    public List<Product> execute() {
        return productRepositoryPort.getAllProducts();
    }
}
