package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

/**

 * @author QRest Team
 * @version 1.0
 */
@Service
public class CreateCategoryService implements CreateCategoryUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public CreateCategoryService(CategoryRepositoryPort categoryRepositoryPort) {
        this.categoryRepositoryPort = categoryRepositoryPort;
    }


    @Override
    public Category createCategory(String name) {
        String normalized = Category.normalizeNameForPersistence(name);
        if (categoryRepositoryPort.existsByName(normalized)) {
            throw new DuplicateCategoryNameException(name);
        }

        Category category = Category.create(name);

        try {
            return categoryRepositoryPort.save(category);
        } catch (DataIntegrityViolationException ex) {
            // Si la BD lanza una violación de integridad por unique constraint
            throw new DuplicateCategoryNameException(name);
        }
    }
}
