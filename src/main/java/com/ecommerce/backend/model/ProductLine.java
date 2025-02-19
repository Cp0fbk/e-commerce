package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "product_line")
public class ProductLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String brand;

    @Column(nullable = false)
    private Boolean is_used;

    @Column(nullable = false)
    private Boolean stock_status;

    @Column(nullable = false)
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 15)
    private String category;

    @Column(length = 15)
    private String color;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion_id;

    private Short discount_percentage;

    @ManyToOne
    @JoinColumn(name = "category_type_id", nullable = false)
    private CategoryType category_type_id;
}
