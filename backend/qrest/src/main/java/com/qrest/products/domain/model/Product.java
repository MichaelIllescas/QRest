package com.qrest.products.domain.model;

import com.qrest.categories.domain.model.Category;
import com.qrest.products.domain.exception.ProductIntegrityException;

public class Product {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean available;
    private Category category;
    private String imageUrl;

    private void validarNombre(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ProductIntegrityException("El nombre del producto no puede estar vacío.");
        }
        if (name.length() > 100) {
            throw new ProductIntegrityException("El nombre del producto no puede exceder 100 caracteres.");
        }
    }
    private void validarDescripcion(String description) {
        if (description != null && description.length() > 500) {
            throw new ProductIntegrityException("La descripción del producto no puede exceder 500 caracteres.");
        }
    }
    private void validarPrecio(Double price) {
        if (price == null || price < 0) {
            throw new ProductIntegrityException("El precio del producto no puede ser negativo.");
        }
    }
    private void validarCategoria(Category category) {
        if (category == null) {
            throw new ProductIntegrityException("La categoría del producto no puede ser nula.");
        }
    }

    public Product(Long id, String name, String description, Double price, Boolean available, Category category, String imageUrl) {
        validarNombre(name);
        validarDescripcion(description);
        validarPrecio(price);
        validarCategoria(category);

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
        this.category = category;
        this.imageUrl = imageUrl;
    }
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public Double getPrice() {
        return price;
    }
    public Boolean getAvailable() {
        return available;
    }
    public Category getCategory() {
        return category;
    }
    public String getImageUrl() {
        return imageUrl;
    }

    public void changeAvailability(Boolean  available) {
        this.available = available;
    }

    public void changeCategory(Category category) {
        validarCategoria(category);
        this.category = category;
    }
    public void changePrice(Double price) {
        validarPrecio(price);
        this.price = price;
    }
    public void changeDescription(String description) {
        validarDescripcion(description);
        this.description = description;
    }
    public void changeName(String name) {
        validarNombre(name);
        this.name = name;
    }
}
