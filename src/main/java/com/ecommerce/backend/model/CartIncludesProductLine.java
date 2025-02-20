package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "cart_includes_product_line")
public class CartIncludesProductLine {
    @EmbeddedId
    private CartIncludesProductLineId id;

    @ManyToOne
    @MapsId("product_line_id")
    @JoinColumn(name = "product_line_id")
    private ProductLine product_line_id;

    @ManyToOne
    @MapsId("customer_id")
    @JoinColumn(name = "customer_id")
    private Customer customer_id;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;
}
