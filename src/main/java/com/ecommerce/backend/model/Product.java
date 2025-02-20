package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serial;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store_id;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device_id;

    @ManyToOne
    @JoinColumn(name = "note_id")
    private GoodsDeliveryNote note_id;
}
