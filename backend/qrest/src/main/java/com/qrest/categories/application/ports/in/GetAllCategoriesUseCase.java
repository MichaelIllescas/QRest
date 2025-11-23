package com.qrest.categories.application.ports.in;

import com.qrest.categories.domain.model.Category;

import java.util.List;

public interface GetAllCategoriesUseCase {

        List<Category>execute();

}
