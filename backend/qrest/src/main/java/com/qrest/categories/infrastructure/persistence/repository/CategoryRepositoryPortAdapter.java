package com.qrest.categories.infrastructure.persistence.repository;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.mapper.CategoryMapper;
import com.qrest.categories.infrastructure.persistence.entity.CategoryJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**

 * @author QRest Team
 * @version 1.0
 */

@Component
public class CategoryRepositoryPortAdapter implements CategoryRepositoryPort {

    private final CategoryJpaRepository jpaRepository;


    public CategoryRepositoryPortAdapter(CategoryJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Category save(Category category) {
        CategoryJpaEntity jpaEntity = CategoryMapper.toJpaEntity(category);
        CategoryJpaEntity saved = jpaRepository.save(jpaEntity);
        return CategoryMapper.toDomain(saved);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return jpaRepository.findById(id).map(CategoryMapper::toDomain);
    }

    @Override
    public boolean existsByName(String name) {
        return jpaRepository.findByName(name).isPresent();
    }

    @Override
    public Optional<Category> findByName(String name) {
        return jpaRepository.findByName(name).map(CategoryMapper::toDomain);
    }

    @Override
    public List<Category> findAll() {
        return jpaRepository.findAll().stream()
                .map(CategoryMapper::toDomain)
                .toList();
    }
}
