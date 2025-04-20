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
    private Integer delivery_id;

    @Column(length = 30)
    private String shipping_provider;

    @Column(length = 20, nullable = false)
    private String delivery_status;

    private LocalDate actual_delivery_date;

    private LocalDate estimated_delivery_date;

    @Column(length = 100)
    private String shipping_address;

    @Column(length = 40, nullable = false)
    private String lname;

    @Column(length = 15, nullable = false)
    private String fname;

    // private boolean checkShippingProvince() {

    // }
}
