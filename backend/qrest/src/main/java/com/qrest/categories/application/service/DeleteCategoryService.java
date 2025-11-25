package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.in.DeleteCategoryUseCase;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.CategoryHasProductException;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.model.Category;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

/**
 * Servicio que implementa el caso de uso de eliminar categoría.
 *
 * @author QRest Team
 * @version 1.0
 */
@Service
@Transactional
public class DeleteCategoryService implements DeleteCategoryUseCase {

    private final CategoryRepositoryPort categoryRepositoryPort;


    public DeleteCategoryService(CategoryRepositoryPort categoryRepositoryPort) {
        this.categoryRepositoryPort = categoryRepositoryPort;
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepositoryPort.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        if(categoryRepositoryPort.hasProducts(id)) {
            throw new CategoryHasProductException(id);
        }

          categoryRepositoryPort.delete(id);

    }
}
