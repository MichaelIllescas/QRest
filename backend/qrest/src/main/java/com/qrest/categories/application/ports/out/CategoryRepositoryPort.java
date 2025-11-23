package com.qrest.categories.application.ports.out;

import com.qrest.categories.domain.model.Category;

import java.util.List;
import java.util.Optional;

/**
 * Puerto de salida (Repository) para persistencia de categorías.
 * @author QRest Team
 * @version 1.0
 */
public interface CategoryRepositoryPort {

        Category save(Category category);

        Optional<Category> findById(Long id);

        boolean existsByName(String name);

        Optional<Category> findByName(String name);

        List<Category> findAll();
}
