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
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "customer_id")
    private Account account;

    @Column(name = "phone_number", unique = true, nullable = false, length = 10)
    private String phoneNumber;

    @Column(unique = true, length = 50)
    private String email;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @Column(name= "shipping_address", length = 100)
    private String shippingAddress;

    @Column(nullable = false, length = 40)
    private String lName;

    @Column(nullable = false, length = 15)
    private String fName;

    @Column(name="total_points")
    private Integer totalPoints = 0;

    @ManyToOne
    @JoinColumn(name = "membership_class_id", nullable = false)
    private MembershipClass membershipClass;

    @Column(nullable = false)
    private Boolean isDeleted;
}
