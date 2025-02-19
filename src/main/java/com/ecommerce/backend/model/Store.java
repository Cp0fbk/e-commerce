package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer store_id;

    @Column(nullable = false)
    private Integer number_of_employees;

    private Double area;

    private String store_name;

    @Column(unique = true, nullable = false)
    private String address;
}
