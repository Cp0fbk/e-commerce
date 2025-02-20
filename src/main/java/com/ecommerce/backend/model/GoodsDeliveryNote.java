package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "goods_delivery_note")
public class GoodsDeliveryNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "order_id", unique = true, nullable = false)
    private Order order_id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee_id;
}
