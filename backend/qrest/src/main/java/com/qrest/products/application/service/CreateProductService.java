package com.qrest.products.application.service;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.model.Category;
import com.qrest.products.application.ports.in.CreateProductUseCase;
import com.qrest.products.application.ports.out.ProductRepositoryPort;
import com.qrest.products.domain.exception.DuplicateProductException;
import com.qrest.products.domain.model.Product;
import org.springframework.stereotype.Service;

@Service
public class CreateProductService implements CreateProductUseCase {

    private final ProductRepositoryPort productRepositoryPort;
    private final CategoryRepositoryPort categoryRepositoryPort;
    public CreateProductService(ProductRepositoryPort productRepositoryPort, CategoryRepositoryPort categoryRepositoryPort) {
        this.productRepositoryPort = productRepositoryPort;
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    @Override
    public Product execute(Product product) {
     if (productRepositoryPort.existsByName(product.getName()))  {
            throw new DuplicateProductException("Ya existe un producto con el mismo nombre.");
        }
     if(categoryRepositoryPort.findById(product.getCategory().getId()).isEmpty()){
            throw new CategoryNotFoundException("La categoría asociada al producto no existe.");
     }

     return productRepositoryPort.save(product);
    }
}
