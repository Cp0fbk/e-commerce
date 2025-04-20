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
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Column(name ="order_status" ,length = 20, nullable = false)
    private String orderStatus;

    @Column(name ="total_amount",nullable = false)
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;
}
