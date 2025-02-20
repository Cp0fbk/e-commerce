package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Data
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer customer_id;

    @Column(unique = true, nullable = false, length = 10)
    private String phone_number;

    @Column(unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private LocalDate registration_date;

    @Column(length = 100)
    private String shipping_address;

    @Column(nullable = false, length = 40)
    private String lname;

    @Column(nullable = false, length = 15)
    private String fname;

    private Integer total_points;

    @ManyToOne
    @JoinColumn(name = "membership_class_id", nullable = false)
    private MembershipClass membership_class_id;

    @Column(nullable = false)
    private Boolean is_deleted;
}
