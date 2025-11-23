package com.qrest.categories.domain.model;


import java.util.Objects;

/**
 * Modelo de Categoría del sistema.
 *
 * @author QRest Team
 * @version 1.0
 */
public class Category {
    private Long id;
    private String name;
    private boolean active;
    private Category() {

    }

    public  Category(Long id, String name, boolean active) {
        validateName(name);
        this.id = id;
        this.name = normalizeNameForPersistence(name);
        this.active = active;
    }

    public static Category create(String name) {
        return new Category(null, name, true); // activa por defecto
    }

    public static Category create(String name, boolean active) {
        return new Category(null, name, active);
    }

    public static Category reconstitute(Long id, String name, boolean active) {
        return new Category(id, name, active);
    }

    private void validateName(String name) {
        if(name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la categoria no puede estar vacio");
        }
        if (name.trim().length() > 100) {
            throw new IllegalArgumentException("El nombre de la categoria no puede superar los 100 caracteres");
        }
    }

    // Método público estático para normalizar el nombre consistentemente antes de guardar/buscar
    public static String normalizeNameForPersistence(String name) {
        if (name == null) return null;
        String trimmed = name.trim();
        if (trimmed.isEmpty()) {
            return trimmed;
        }
        return trimmed.substring(0, 1).toUpperCase() + trimmed.substring(1).toLowerCase();
    }

    public void changeName(String newName) {
        validateName(newName);
        this.name = normalizeNameForPersistence(newName);
    }
    public void activate() {
        this.active = true;
    }
    public void deactivate() {
        this.active = false;
    }
    public boolean isActive() {
        return this.active;
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() !=o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(id, category.id);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", active=" + active +
                        '}';
    }
}
