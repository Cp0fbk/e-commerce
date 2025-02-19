package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "cart")
public class Cart {
    @Id
    private Integer customer_id;

    @Column(nullable = false)
    private Double total_amount;

    private LocalDate created_date;

    @OneToOne
    @MapsId
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
