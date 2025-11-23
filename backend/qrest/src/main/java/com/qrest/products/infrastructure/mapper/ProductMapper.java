package com.qrest.products.infrastructure.mapper;


import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.persistence.entity.ProductEntity;
import com.qrest.products.infrastructure.web.dto.CreateProductRequestDTO;
import com.qrest.products.infrastructure.web.dto.ProductDTO;

public interface ProductMapper {

    public ProductDTO productToDTO(Product product);

    public Product dtoToProduct(ProductDTO dto);

    public Product entityToProduct(ProductEntity entity);

    public ProductEntity productToEntity(Product product);

    public Product createRequestDTOToProduct(CreateProductRequestDTO dto);
}
