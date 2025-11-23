package com.qrest.categories.infrastructure.web.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.domain.exception.DuplicateCategoryNameException;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.web.CategoryExceptionHandler;
import com.qrest.categories.infrastructure.web.dto.CategoryCreateDTO;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    private com.qrest.categories.application.ports.in.GetAllCategoriesUseCase getAllCategoriesUseCase;

    @Test
    void createcategory_WhenValidRequest_ShouldReturn201() throws Exception {

        CategoryCreateDTO request = new CategoryCreateDTO();
        request.setName("Pastas");

        Category createdCategory = Category.reconstitute(1L, "Pastas", true);
        when(createCategoryUseCase.createCategory(anyString())).thenReturn(createdCategory);

        mockMvc.perform(post("/api/admin/categories/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

    }

    @Test
    void setCreateCategory_WhenDuplicateName_ShouldReturn409() throws Exception {
        CategoryCreateDTO request = new CategoryCreateDTO();
        request.setName("Pastas");

        when(createCategoryUseCase.createCategory(anyString()))
                .thenThrow(new DuplicateCategoryNameException("Pastas"));

        mockMvc.perform(post("/api/admin/categories/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }
}
