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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employee_id;

    @Column(length = 12, unique = true, nullable = false)
    private String identity_card;

    @Column(length = 40, nullable = false)
    private String lname;

    @Column(length = 15, nullable = false)
    private String fname;

    @Column(length = 10, unique = true)
    private String phone_number;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private LocalDate hire_date;

    @Column(length = 50)
    private String email;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Employee supervisor;

    private LocalDate supervise_date;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store_id;

    @Column(nullable = false)
    private Boolean is_deleted;
}
