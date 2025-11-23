package com.qrest.products.application.ports.in;

import com.qrest.products.domain.model.Product;

public interface CreateProductUseCase {

    public Product execute(Product product);
}
