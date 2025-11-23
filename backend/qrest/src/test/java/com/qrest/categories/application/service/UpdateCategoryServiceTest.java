package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.out.CategoryRepository;
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
    private CategoryRepository categoryRepository;

    @InjectMocks
    private UpdateCategoryService updateCategoryService;

    @Test
    void updateCategory_WhenValidData_ShouldUpdateSuccessFully() {
        // Given
        Long categoryId= 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);
        Category updateCAtegory = Category.reconstitute(categoryId, "Tragos", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.existsByName("Tragos")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        // when
        Category result = updateCategoryService.updateCategory(categoryId, "Tragos");

        // then
        assertNotNull(result);
        assertEquals("Tragos", result.getName());
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).existsByName("Tragos");
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void updateCategory_WhenCategoryNotFound_ShouldThrowException() {
        Long categoryId = 999L;

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        assertThrows(CategoryNotFoundException.class,
                ()-> updateCategoryService.updateCategory(categoryId, "NuevoNombre"));

        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository, never()).save(any());
    }

    @Test
    void updateCategory_WhenDuplicateName_ShouldThrowException() {
        Long categoryId = 1L;

        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.existsByName("Postres")).thenReturn(true);

        assertThrows(DuplicateCategoryNameException.class,
                ()-> updateCategoryService.updateCategory(categoryId, "Postres"));

        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).existsByName("Postres");
        verify(categoryRepository, never()).save(any());
    }

    @Test
    void updateCategory_WhenSameName_ShouldNotCheckDuplicate() {
        long categoryId = 1L;
        Category existingCategory = Category.reconstitute(categoryId, "Bebidas", true);

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        Category result = updateCategoryService.updateCategory(categoryId, "Bebidas");

        assertNotNull(result);
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository, never()).existsByName(anyString());
        verify(categoryRepository).save(any(Category.class));
    }
}
