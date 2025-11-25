package com.qrest.categories.application.ports.in;

/**
 * Puerto de entrada para eliminar una categoría.
 *
 * @author QRest Team
 * @version 1.0
 */
public interface DeleteCategoryUseCase {
    void deleteCategory(Long id);
}
