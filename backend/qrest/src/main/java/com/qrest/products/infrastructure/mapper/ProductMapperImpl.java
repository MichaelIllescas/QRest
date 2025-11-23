package com.qrest.products.infrastructure.mapper;

import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.persistence.repository.CategoryRepositoryAdapter;
import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.persistence.entity.ProductEntity;
import com.qrest.products.infrastructure.web.dto.CreateProductRequestDTO;
import com.qrest.products.infrastructure.web.dto.ProductDTO;
import org.springframework.stereotype.Component;

/**
 * Implementación simple y explícita de ProductMapper.
 * - Todos los métodos son null-safe: si la entrada es null, devuelve null.
 * - Cuando solo se dispone del id de categoría (CreateProductRequestDTO), se crea
 *   una Category mínima con nombre "Unknown" para cumplir las validaciones del dominio.
 * - Cuando solo se dispone del nombre de categoría (ProductDTO), se usa Category.create(name).
 */
@Component
public class ProductMapperImpl implements ProductMapper {

    private final CategoryRepositoryAdapter categoryRepository;

    public ProductMapperImpl(CategoryRepositoryAdapter categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductDTO productToDTO(Product product) {
        if (product == null) return null;
        String categoryName = null;
        Long categoryId = null;
        if (product.getCategory() != null) {
            categoryName = product.getCategory().getName();
            categoryId = product.getCategory().getId();
        }
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getAvailable(),
                categoryId,
                categoryName,
                product.getImageUrl()
        );
    }

    @Override
    public Product dtoToProduct(ProductDTO dto) {
        if (dto == null) return null;
        Category category = null;
        if (dto.getCategoryName() != null) {
            // Usamos create para no necesitar id ni active
            category = Category.create(dto.getCategoryName());
        }
        return new Product(
                dto.getId(),
                dto.getName(),
                dto.getDescription(),
                dto.getPrice(),
                dto.getAvailable(),
                category,
                dto.getImageUrl()
        );
    }

    @Override
    public Product entityToProduct(ProductEntity entity) {
        if (entity == null) return null;
        Category category = fingCategoryById(entity.getCategoryId());

        return new Product(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPrice(),
                entity.getAvailable(),
                category,
                entity.getImageUrl()
        );
    }

    @Override
    public ProductEntity productToEntity(Product product) {
        if (product == null) return null;
        // ProductEntity dispone de constructor por Lombok (@AllArgsConstructor)
        return new ProductEntity(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getAvailable(),
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getImageUrl()
        );
    }

    @Override
    public Product createRequestDTOToProduct(CreateProductRequestDTO dto) {
        if (dto == null) return null;

        Category category = this.fingCategoryById(dto.getCategoryId());
        return new Product(
                null, // id al crear un producto suele ser null y lo asigna la persistencia
                dto.getName(),
                dto.getDescription(),
                dto.getPrice(),
                dto.getAvailable(),
                category,
                dto.getImageUrl()
        );
    }


    private Category fingCategoryById(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return categoryRepository.findById(categoryId).orElse(null);
    }
}
