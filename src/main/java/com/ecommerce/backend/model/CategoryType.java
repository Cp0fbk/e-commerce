package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "category_type")
public class CategoryType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_type_id")
    private Integer categoryTypeId;

    @Column(unique = true, nullable = false, length = 30)
    private String name;
}
