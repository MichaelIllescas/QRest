package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.UpdateCategoryUseCase;
import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
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

    private final CategoryRepositoryPort categoryRepository;


    public UpdateCategoryService(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;

    }

    @Override
    public Category updateCategory(Long id, String newName, Boolean active) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        if(!category.getName().equalsIgnoreCase(newName)) {
            if (categoryRepository.existsByName(newName)) {
                throw new DuplicateCategoryNameException(newName);
            }
        }
        category.changeName(newName);

        if(active !=null) {
           if (active) {
               category.activate();
           } else {
               category.deactivate();
           }
        }

        return categoryRepository.save(category);
    }

}
