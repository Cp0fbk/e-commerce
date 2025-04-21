package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Integer deliveryId;

    @Column(name = "shipping_provider",length = 30)
    private String shippingProvider;

    @Column(name = "delivery_status",length = 20, nullable = false)
    private String deliveryStatus;

    @Column(name = "actual_delivery_date")
    private LocalDate actualDeliveryDate;

    @Column(name = "estimated_delivery_date")
    private LocalDate estimatedDeliveryDate;

    @Column(name = "shipping_address",length = 100)
    private String shippingAddress;

    @Column(length = 40, nullable = false)
    private String lname;

    @Column(length = 15, nullable = false)
    private String fname;

    // private boolean checkShippingProvince() {

    // }
}
