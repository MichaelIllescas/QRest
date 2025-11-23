package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.GetAllCategoriesUseCase;
import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.model.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllCategoriesService implements GetAllCategoriesUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;

    public GetAllCategoriesService(CategoryRepositoryPort categoryRepositoryPort) {
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    @Override
    public List<Category> execute() {
        return categoryRepositoryPort.findAll();
    }
}
