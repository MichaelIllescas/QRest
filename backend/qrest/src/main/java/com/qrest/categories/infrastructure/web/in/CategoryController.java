package com.qrest.categories.infrastructure.web.in;

import com.qrest.categories.application.ports.in.CreateCategoryUseCase;
import com.qrest.categories.application.ports.in.DeleteCategoryUseCase;
import com.qrest.categories.application.ports.in.UpdateCategoryUseCase;
import com.qrest.categories.application.ports.in.GetAllCategoriesUseCase;
import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.mapper.CategoryMapper;
import com.qrest.categories.infrastructure.web.dto.CategoryCreateDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryResponseDTO;
import com.qrest.categories.infrastructure.web.dto.CategoryUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.qrest.shared.exception.ApiError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Controlador REST para gestión de categorías.
 * <p>
 * Se documenta con anotaciones OpenAPI para describir la operación de creación
 * y las respuestas posibles, incluyendo errores que puede arrojar (validación,
 * nombre duplicado, error interno).
 *
 * @author QRest Team
 * @version 1.0
 */
@RestController
@RequestMapping("api/admin/categories")
@Validated
@Tag(name = "Categorías", description = "Operaciones para la gestión de categorías")
public class CategoryController {
    private final CreateCategoryUseCase createCategoryUseCase;
    private final GetAllCategoriesUseCase getAllCategoriesUseCase;
    private CategoryMapper categoryMapper;
    private final UpdateCategoryUseCase updateCategoryUseCase;
    private final DeleteCategoryUseCase deleteCategoryUseCase;


    public CategoryController(CreateCategoryUseCase createCategoryUseCase, GetAllCategoriesUseCase getAllCategoriesUseCase, UpdateCategoryUseCase updateCategoryUseCase, DeleteCategoryUseCase deleteCategoryUseCase
    ) {
        this.createCategoryUseCase = createCategoryUseCase;
        this.getAllCategoriesUseCase = getAllCategoriesUseCase;
        this.updateCategoryUseCase = updateCategoryUseCase;

        this.deleteCategoryUseCase = deleteCategoryUseCase;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear categoría", description = "Crea una nueva categoría con el nombre indicado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoría creada correctamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryResponseDTO.class))),

            @ApiResponse(responseCode = "400", description = "Solicitud inválida (validación de datos)",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class))),

            @ApiResponse(responseCode = "409", description = "Nombre de categoría duplicado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class))),

            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)))
    })
    public CategoryResponseDTO createCategory(@Valid @RequestBody CategoryCreateDTO dto) {
        Category category = createCategoryUseCase.createCategory(dto.getName());
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName(), dto.isActive());
        return response;
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listar categorías", description = "Obtiene una lista de todas las categorías.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de categorías obtenida correctamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategoryResponseDTO.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)))
    })
    public List<CategoryResponseDTO> listCategories() {
        List<CategoryResponseDTO> categoriesRespose = getAllCategoriesUseCase.execute().stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(toList());
        return categoriesRespose;
    }


    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryUpdateDTO request
    ) {
        Category category = updateCategoryUseCase.updateCategory(id, request.getName());
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName(), category.isActive());
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar categoría", description = "Desactiva una categoría existente (soft delete).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Categoría eliminada correctamente"),

            @ApiResponse(responseCode = "404", description = "Categoría no encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class))),

            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)))
    })
    public void deleteCategory(@PathVariable Long id) {
        deleteCategoryUseCase.deleteCategory(id);
    }
}
