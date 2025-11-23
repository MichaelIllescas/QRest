package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.application.ports.out.CategoryRepository;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import org.springframework.stereotype.Service;

/**

 * @author QRest Team
 * @version 1.0
 */
@Service
public class CreateCategoryService implements CreateCategoryUseCase {

    private final CategoryRepository categoryRepository;

    public CreateCategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Category createCategory(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new DuplicateCategoryNameException(name);
        }

        Category category = Category.create(name);

        return categoryRepository.save(category);
    }
}
