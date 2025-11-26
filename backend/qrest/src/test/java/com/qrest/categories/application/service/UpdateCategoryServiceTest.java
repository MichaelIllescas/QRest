package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.out.CategoryRepositoryPort;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
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
 * Tests unitarios para UpdateCategoryService.
 *
 * @author QRest Team
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
public class UpdateCategoryServiceTest {

    @Mock
    private CategoryRepositoryPort categoryRepository;

    @InjectMocks
    private UpdateCategoryService updateCategoryService;

    @Test
    void updateCategory_WhenValidData_ShouldUpdateSuccessfully() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.existsByName("Tragos")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // When
        Category result = updateCategoryService.updateCategory(categoryId, "Tragos", true);

        // Then
        assertNotNull(result);
        assertEquals("Tragos", result.getName());
        assertTrue(result.isActive());
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).existsByName("Tragos");
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WhenCategoryNotFound_ShouldThrowException() {
        // Given
        Long categoryId = 999L;

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(CategoryNotFoundException.class,
                () -> updateCategoryService.updateCategory(categoryId, "NuevoNombre", true));

        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository, never()).save(any());
    }

    @Test
    void updateCategory_WhenDuplicateName_ShouldThrowException() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.existsByName("Postres")).thenReturn(true);

        // When & Then
        assertThrows(DuplicateCategoryNameException.class,
                () -> updateCategoryService.updateCategory(categoryId, "Postres", true));

        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).existsByName("Postres");
        verify(categoryRepository, never()).save(any());
    }

    @Test
    void updateCategory_WhenSameName_ShouldNotCheckDuplicate() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // When
        Category result = updateCategoryService.updateCategory(categoryId, "Bebidas", true);

        // Then
        assertNotNull(result);
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository, never()).existsByName(anyString());
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WhenActivatingCategory_ShouldSetActiveTrue() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", false);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // When
        Category result = updateCategoryService.updateCategory(categoryId, "Bebidas", true);

        // Then
        assertNotNull(result);
        assertTrue(result.isActive());
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WhenDeactivatingCategory_ShouldSetActiveFalse() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // When
        Category result = updateCategoryService.updateCategory(categoryId, "Bebidas", false);

        // Then
        assertNotNull(result);
        assertFalse(result.isActive());
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WhenActiveIsNull_ShouldNotChangeActiveState() {
        // Given
        Long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // When
        Category result = updateCategoryService.updateCategory(categoryId, "Tragos", null);

        // Then
        assertNotNull(result);
        assertTrue(result.isActive()); // Mantiene el estado original
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).save(any(Category.class));
    }
}