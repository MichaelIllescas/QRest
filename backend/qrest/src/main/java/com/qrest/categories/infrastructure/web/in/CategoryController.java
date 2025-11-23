package com.qrest.categories.infrastructure.web.in;

import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.application.ports.in.UpdateCategoryUseCase;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.web.dto.CategoryCreateDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryResponseDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para gestión de categorías.
 *
 * @author QRest Team
 * @version 1.0
 */
@RestController
@RequestMapping("api/admin/categories")
public class CategoryController {
    private final CreateCategoryUseCase createCategoryUseCase;
    private final UpdateCategoryUseCase updateCategoryUseCase;

    public CategoryController(CreateCategoryUseCase createCategoryUseCase, UpdateCategoryUseCase updateCategoryUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;

        this.updateCategoryUseCase = updateCategoryUseCase;
    }
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryCreateDTO dto) {
        Category category = createCategoryUseCase.createCategory(dto.getName());
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryUpdateDTO request
            ) {
        Category category = updateCategoryUseCase.updateCategory(id, request.getName());
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName());
        return ResponseEntity.ok(response);
    }
}
