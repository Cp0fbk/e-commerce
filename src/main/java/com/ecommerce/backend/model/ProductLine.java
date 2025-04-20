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

    @Column(name = "is_used",nullable = false)
    private Boolean isUsed;

    @Column(name = "stock_status",nullable = false)
    private Boolean stockStatus;

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
    private Promotion promotion;

    @Column(name = "discount_percentage")
    private Short discountPercentage;

    @ManyToOne
    @JoinColumn(name = "category_type_id", nullable = false)
    private CategoryType categoryType;
}
