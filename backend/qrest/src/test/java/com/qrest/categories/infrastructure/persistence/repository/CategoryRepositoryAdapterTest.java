package com.qrest.categories.infrastructure.persistence.repository;

import com.qrest.categories.domain.model.Category;
import com.qrest.categories.infrastructure.persistence.entity.CategoryJpaEntity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Test unitario para CategoryRepositoryAdapter.
 *
 * @author QRest Team
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
class CategoryRepositoryAdapterTest {

    @Mock
    private CategoryJpaRepository jpaRepository;

    @InjectMocks
    private CategoryRepositoryAdapter categoryRepository;

    @Test
    void save_ShouldPersistCategory() {
        Category category = Category.create("Bebidas");
        CategoryJpaEntity jpaEntity = new CategoryJpaEntity(1L, "Bebidas", true);

        when(jpaRepository.save(any(CategoryJpaEntity.class))).thenReturn(jpaEntity);

        Category saved = categoryRepository.save(category);

        assertNotNull(saved.getId());
        assertEquals("Bebidas", saved.getName());
        assertTrue(saved.isActive());
        verify(jpaRepository).save(any(CategoryJpaEntity.class));
    }

    @Test
    void findById_WhenExists_ShouldReturnCategory() {
        CategoryJpaEntity jpaEntity = new CategoryJpaEntity(1L, "Postres", true);
        when(jpaRepository.findById(1L)).thenReturn(Optional.of(jpaEntity));

        Optional<Category> result = categoryRepository.findById(1L);

        assertTrue(result.isPresent());
        assertEquals("Postres", result.get().getName());
    }

    @Test
    void findById_WhenNotExists_ShouldReturnEmpty() {
        when(jpaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Category> result = categoryRepository.findById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void existsByName_WhenExists_ShouldReturnTrue() {
        CategoryJpaEntity jpaEntity = new CategoryJpaEntity(1L, "Ensaladas", true);
        when(jpaRepository.findByName("Ensaladas")).thenReturn(Optional.of(jpaEntity));

        boolean exists = categoryRepository.existsByName("Ensaladas");

        assertTrue(exists);
    }

    @Test
    void existsByName_WhenNotExists_ShouldReturnFalse() {
        when(jpaRepository.findByName("NoExiste")).thenReturn(Optional.empty());

        boolean exists = categoryRepository.existsByName("NoExiste");

        assertFalse(exists);
    }

    @Test
    void findByName_WhenExists_ShouldReturnCategory() {
        CategoryJpaEntity jpaEntity = new CategoryJpaEntity(1L, "Carnes", true);
        when(jpaRepository.findByName("Carnes")).thenReturn(Optional.of(jpaEntity));

        Optional<Category> result = categoryRepository.findByName("Carnes");

        assertTrue(result.isPresent());
        assertEquals("Carnes", result.get().getName());
    }
}