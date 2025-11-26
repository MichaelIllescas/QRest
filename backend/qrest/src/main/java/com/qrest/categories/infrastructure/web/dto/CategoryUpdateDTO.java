package com.qrest.categories.infrastructure.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author QRest Team
 * @version 1.0
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryUpdateDTO {

    @NotBlank(message = "El nombre no puede estar vacio")
    @Size(max = 100, message = "El nombre no puede excer los 100 caracteres")
    private String name;

    private Boolean active;
}
