package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "order_includes_product_line")
public class OrderIncludesProductLine {
    @EmbeddedId
    private OrderIncludesProductLineId id;

    @ManyToOne
    @MapsId("product_line_id")
    @JoinColumn(name = "product_line_id")
    private ProductLine product_line_id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_id")
    private Order order_id;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;
}
