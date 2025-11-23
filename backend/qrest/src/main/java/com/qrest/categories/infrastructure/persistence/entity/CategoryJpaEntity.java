package com.qrest.categories.infrastructure.persistence.entity;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;

/**

 * @author QRest Team
 * @version 1.0
 */

@Entity
@Table(name = "categoria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CategoryJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long id;

    @Column(name = "nombre", nullable = false, length = 100, unique = true)
    private String name;

    @Column(name = "activa", nullable = false)
    private boolean active;
}
