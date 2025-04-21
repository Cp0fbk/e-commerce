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
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_status",length = 20, nullable = false)
    private String paymentStatus = "pending";

    @Column(length = 30)
    private String method;

    @OneToOne
    @MapsId
    @JoinColumn(name = "order_id")
    private Order order;
}
