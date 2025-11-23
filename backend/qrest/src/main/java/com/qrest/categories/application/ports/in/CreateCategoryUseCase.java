package com.qrest.categories.application.ports.in;

import com.qrest.categories.domain.model.Category;

/**
 * Puerto de entrada (Use Case) para crear una nueva categoría.

 * @author QRest Team
 * @version 1.0
 */
public interface CreateCategoryUseCase {

    Category createCategory(String name);
    
}
