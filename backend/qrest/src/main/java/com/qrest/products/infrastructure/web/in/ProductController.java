package com.qrest.products.infrastructure.web.in;

import com.qrest.products.application.ports.in.CreateProductUseCase;
import com.qrest.products.application.ports.in.GetAllProductsUsecase;
import com.qrest.products.domain.model.Product;
import com.qrest.products.infrastructure.mapper.ProductMapper;
import com.qrest.products.infrastructure.web.dto.CreateProductRequestDTO;
import com.qrest.products.infrastructure.web.dto.ProductDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@Tag(name = "Productos", description = "Operaciones CRUD sobre productos (admin)")
public class ProductController {

    private final CreateProductUseCase createProductUseCase;
    private final ProductMapper productMapper;
    private final GetAllProductsUsecase getAllProductsUsecase;

    public ProductController(CreateProductUseCase createProductUseCase,GetAllProductsUsecase getAllProductsUsecase, ProductMapper productMapper) {
        this.createProductUseCase = createProductUseCase;
        this.productMapper = productMapper;
        this.getAllProductsUsecase = getAllProductsUsecase;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear producto", description = "Crea un nuevo producto y devuelve su representación")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Producto creado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida / errores de validación",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.qrest.shared.exception.ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.qrest.shared.exception.ApiError.class)))
    })
    public ProductDTO create (@Valid @RequestBody CreateProductRequestDTO requestDTO){
        Product productRequestMapped= productMapper.createRequestDTOToProduct(requestDTO);
        Product createdProduct= createProductUseCase.execute(productRequestMapped);
        return productMapper.productToDTO(createdProduct);
    }
    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Listar productos", description = "Devuelve una lista de todos los productos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de productos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.qrest.shared.exception.ApiError.class)))
    })
    public Iterable<ProductDTO> listAll () {
        List<Product> products = getAllProductsUsecase.execute();
        return products.stream().map(productMapper::productToDTO).toList();
    }
}
