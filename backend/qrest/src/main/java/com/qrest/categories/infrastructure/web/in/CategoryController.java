package com.qrest.categories.infrastructure.web.in;

import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.web.dto.CategoryCreateDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST para gestión de categorías.
 *
 * @author QRest Team
 * @version 1.0
 */
@RestController
@RequestMapping("api/admin/categories")
@Validated
public class CategoryController {
    private final CreateCategoryUseCase createCategoryUseCase;

    public CategoryController(CreateCategoryUseCase createCategoryUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
    }
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryCreateDTO dto) {
        Category category = createCategoryUseCase.createCategory(dto.getName());
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
