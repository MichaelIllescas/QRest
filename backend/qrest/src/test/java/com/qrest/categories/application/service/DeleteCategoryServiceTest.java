package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.CategoryHasProductException;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.model.Category;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Tests unitarios para DeleteCategoryService.
 *
 * @author QRest Team
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
class DeleteCategoryServiceTest {

    @Mock
    private CategoryRepositoryPort categoryRepositoryPort;

    @InjectMocks
    private DeleteCategoryService deleteCategoryService;

    @Test
    void deleteCategory_WhenCategoryExists_ShouldDeactivate() {
        // Given
        Long categoryId = 1L;
        Category category = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepositoryPort.findById(categoryId)).thenReturn(Optional.of(category));
        when(categoryRepositoryPort.hasProducts(categoryId)).thenReturn(false);
        when(categoryRepositoryPort.save(any(Category.class))).thenReturn(category);

        // When
        deleteCategoryService.deleteCategory(categoryId);

        // Then
        assertFalse(category.isActive());
        verify(categoryRepositoryPort).findById(categoryId);
        verify(categoryRepositoryPort).hasProducts(categoryId);
        verify(categoryRepositoryPort).save(category);
    }

    @Test
    void deleteCategory_WhenCategoryNotFound_ShouldThrowException() {
        // Given
        Long categoryId = 999L;
        when(categoryRepositoryPort.findById(categoryId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(CategoryNotFoundException.class,
                () -> deleteCategoryService.deleteCategory(categoryId));

        verify(categoryRepositoryPort).findById(categoryId);
        verify(categoryRepositoryPort, never()).hasProducts(anyLong());
        verify(categoryRepositoryPort, never()).save(any());
    }

    @Test
    void deleteCategory_WhenHasProducts_ShouldThrowException() {
        // Given
        Long categoryId = 1L;
        Category category = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepositoryPort.findById(categoryId)).thenReturn(Optional.of(category));
        when(categoryRepositoryPort.hasProducts(categoryId)).thenReturn(true);

        // When & Then
        assertThrows(CategoryHasProductException.class,
                () -> deleteCategoryService.deleteCategory(categoryId));

        verify(categoryRepositoryPort).findById(categoryId);
        verify(categoryRepositoryPort).hasProducts(categoryId);
        verify(categoryRepositoryPort, never()).save(any());
    }
}