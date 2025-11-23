package com.qrest.products.application.ports.in;

import com.qrest.products.domain.model.Product;

import java.util.List;

public interface GetAllProductsUsecase {
    List<Product> execute();
}
