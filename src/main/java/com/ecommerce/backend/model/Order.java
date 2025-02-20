package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;

    private LocalDate order_date;

    @Column(length = 20, nullable = false)
    private String order_status;

    @Column(nullable = false)
    private Double total_amount;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee_id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer_id;

    @OneToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery_id;
}
