package com.qrest.categories.infrastructure.web.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.application.ports.in.DeleteCategoryUseCase;
import com.qrest.categories.application.ports.in.UpdateCategoryUseCase;
import com.qrest.categories.domain.exception.CategoryHasProductException;
import com.qrest.categories.domain.exception.CategoryNotFoundException;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.web.CategoryExceptionHandler;
import com.qrest.categories.infrastructure.web.dto.CategoryCreateDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryUpdateDTO;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * Test de integración para CategoryController.
 *
 * @author QRest Team
 * @version 1.0
 */
@Import(CategoryExceptionHandler.class)
@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CreateCategoryUseCase createCategoryUseCase;

    @MockBean
    private UpdateCategoryUseCase updateCategoryUseCase;

    @MockBean
    private DeleteCategoryUseCase deleteCategoryUseCase;

    @MockBean
    private com.qrest.categories.application.ports.in.GetAllCategoriesUseCase getAllCategoriesUseCase;

    @Test
    void createCategory_WhenValidRequest_ShouldReturn201() throws Exception {
        // Given
        CategoryCreateDTO request = new CategoryCreateDTO();
        request.setName("Pastas");

        Category createdCategory = Category.reconstitute(1L, "Pastas", true);
        when(createCategoryUseCase.createCategory(anyString())).thenReturn(createdCategory);

        // When & Then
        mockMvc.perform(post("/api/admin/categories/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    void createCategory_WhenDuplicateName_ShouldReturn409() throws Exception {
        // Given
        CategoryCreateDTO request = new CategoryCreateDTO();
        request.setName("Pastas");

        when(createCategoryUseCase.createCategory(anyString()))
                .thenThrow(new DuplicateCategoryNameException("Pastas"));

        // When & Then
        mockMvc.perform(post("/api/admin/categories/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    void updateCategory_WhenValidRequest_ShouldReturn200() throws Exception {
        // Given
        Long categoryId = 1L;
        CategoryUpdateDTO request = new CategoryUpdateDTO("Tragos", true);
        Category updatedCategory = Category.reconstitute(categoryId, "Tragos", true);

        when(updateCategoryUseCase.updateCategory(eq(categoryId), eq("Tragos"), eq(true)))
                .thenReturn(updatedCategory);

        // When & Then
        mockMvc.perform(put("/api/admin/categories/{id}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(categoryId))
                .andExpect(jsonPath("$.name").value("Tragos"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    void updateCategory_WhenDeactivating_ShouldReturn200() throws Exception {
        // Given
        Long categoryId = 1L;
        CategoryUpdateDTO request = new CategoryUpdateDTO("Bebidas", false);
        Category updatedCategory = Category.reconstitute(categoryId, "Bebidas", false);

        when(updateCategoryUseCase.updateCategory(eq(categoryId), eq("Bebidas"), eq(false)))
                .thenReturn(updatedCategory);

        // When & Then
        mockMvc.perform(put("/api/admin/categories/{id}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active").value(false));
    }

    @Test
    void updateCategory_WhenCategoryNotFound_ShouldReturn404() throws Exception {
        // Given
        Long categoryId = 999L;
        CategoryUpdateDTO request = new CategoryUpdateDTO("Tragos", true);

        when(updateCategoryUseCase.updateCategory(eq(categoryId), anyString(), any()))
                .thenThrow(new CategoryNotFoundException(categoryId));

        // When & Then
        mockMvc.perform(put("/api/admin/categories/{id}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteCategory_WhenCategoryExists_ShouldReturn204() throws Exception {
        // Given
        Long categoryId = 1L;
        doNothing().when(deleteCategoryUseCase).deleteCategory(categoryId);

        // When & Then
        mockMvc.perform(delete("/api/admin/categories/delete/{id}", categoryId))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteCategory_WhenCategoryNotFound_ShouldReturn404() throws Exception {
        // Given
        Long categoryId = 999L;
        doThrow(new CategoryNotFoundException(categoryId))
                .when(deleteCategoryUseCase).deleteCategory(categoryId);

        // When & Then
        mockMvc.perform(delete("/api/admin/categories/delete/{id}", categoryId))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteCategory_WhenHasProducts_ShouldReturn409() throws Exception {
        // Given
        Long categoryId = 1L;
        doThrow(new CategoryHasProductException(categoryId))
                .when(deleteCategoryUseCase).deleteCategory(categoryId);

        // When & Then
        mockMvc.perform(delete("/api/admin/categories/delete/{id}", categoryId))
                .andExpect(status().isConflict());
    }
}