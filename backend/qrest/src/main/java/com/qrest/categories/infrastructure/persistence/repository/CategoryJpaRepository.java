package com.qrest.categories.infrastructure.persistence.repository;

import com.qrest.categories.infrastructure.persistence.entity.CategoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**

 * @author QRest Team
 * @version 1.0
 */
@Repository
public interface CategoryJpaRepository extends JpaRepository<CategoryJpaEntity, Long> {

    boolean existsByName(String name);

    Optional<CategoryJpaEntity> findByName(String name);
}
