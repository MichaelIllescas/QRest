package com.qrest.categories.application.service;

import com.qrest.categories.application.ports.out.CategoryRepository;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Test unitario para CreateCategoryService.
 *
 * @author QRest Team
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
public class CreateCategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CreateCategoryService createCategoryService;

    @Test
    void createCategory_WhenNameIsValid_ShouldCreateSuccessFully() {
        String categoryName = "Pastas";
        Category expectedCategory = Category.reconstitute(1L, "Pastas", true);
        when(categoryRepository.existsByName(categoryName)).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(expectedCategory);

        Category result = createCategoryService.createCategory(categoryName);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Pastas", result.getName());
        assertTrue(result.isActive());

        verify(categoryRepository, times(1)).existsByName(categoryName);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }
    @Test
    void setCreateCategory_WhenNameAlreadyExists_ShouldThrowDuplicateCategoryNameException() {
        String categoryName = "pastas";
        when(categoryRepository.existsByName(categoryName)).thenReturn(true);

        assertThrows(DuplicateCategoryNameException.class, () -> {
            createCategoryService.createCategory(categoryName);
        });

        verify(categoryRepository, times(1)).existsByName(categoryName);
        verify(categoryRepository, never()).save(any(Category.class));
    }

    @Test
    void createCategory_shouldNormalizeName() {
        String categoryName = " pAsTas ";
        Category expectedCategory = Category.reconstitute(1L, "Pastas", true);

        when(categoryRepository.existsByName(categoryName)).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(expectedCategory);

        Category result = createCategoryService.createCategory(categoryName);

        assertEquals("Pastas", result.getName());
    }
}
