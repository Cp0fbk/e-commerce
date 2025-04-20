package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "employee")
public class Employee {
    @Id
    private Integer employee_id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "employee_id")
    private Account account;

    @Column(name = "identity_card",length = 12, unique = true, nullable = false)
    private String identityCard;

    @Column(length = 40, nullable = false)
    private String lname;

    @Column(length = 15, nullable = false)
    private String fname;

    @Column(name = "phone_number",length = 10, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(name ="hire_date",nullable = false)
    private LocalDate hireDate = LocalDate.of(2000, 1, 1);;

    @Column(length = 50)
    private String email;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Employee supervisor;

    @Column(name = "supervise_date")
    private LocalDate superviseDate;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name = "is_deleted",nullable = false)
    private Boolean isDDeleted;
}
