package com.qrest.categories.infrastructure.mapper;

import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.persistence.entity.CategoryJpaEntity;
import com.qrest.categories.infrastructure.web.dto.CategoryResponseDTO;

/**

 * @author QRest Team
 * @version 1.0
 */
public class CategoryMapper {

    public static CategoryJpaEntity toJpaEntity(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryJpaEntity(
                category.getId(),
                category.getName(),
                category.isActive()
        );
    }
    public static Category toDomain(CategoryJpaEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }
        return Category.reconstitute(
                jpaEntity.getId(),
                jpaEntity.getName(),
                jpaEntity.isActive()
        );
    }
    public static CategoryResponseDTO toResponseDTO(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.isActive()
        );
    }
}
