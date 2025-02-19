package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "payment")
public class Payment {
    @Id
    private Integer order_id;

    private LocalDate payment_date;

    @Column(length = 20, nullable = false)
    private String payment_status;

    @Column(length = 30)
    private String method;

    @OneToOne
    @MapsId
    @JoinColumn(name = "order_id")
    private Order order;
}
