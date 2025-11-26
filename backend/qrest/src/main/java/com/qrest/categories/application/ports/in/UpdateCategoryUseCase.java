package com.qrest.categories.application.ports.in;


import com.qrest.categories.domain.model.Category;

public interface UpdateCategoryUseCase {

    Category updateCategory(Long id, String newName, Boolean active);
}
