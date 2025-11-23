package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.UpdateCategoryUseCase;
import com.qrest.categories.application.ports.out.CategoryRepository;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

/**
 * @author QRest Team
 * @version 1.0
 */
@Service
@Transactional
public class UpdateCategoryService implements UpdateCategoryUseCase {

    private final CategoryRepository categoryRepository;


    public UpdateCategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;

    }

    @Override
    public Category updateCategory(Long id, String newName) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        if(!category.getName().equalsIgnoreCase(newName)) {
            if (categoryRepository.existsByName(newName)) {
                throw new DuplicateCategoryNameException(newName);
            }
        }
        category.changeName(newName);

        return categoryRepository.save(category);
    }

}
