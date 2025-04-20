package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "account")
@Setter
@Getter
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "username", unique = true, nullable = false, length = 20)
    private String username;

    @Column(name = "password", nullable = false, length = 30)
    private String password;

    @Column(name = "role", nullable = false, length = 8)
    private String role;
}
