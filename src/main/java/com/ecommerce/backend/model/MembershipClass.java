package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Data
@Table(name = "membership_class")
public class MembershipClass {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 30)
    private String name;

    @Column(unique = true, nullable = false)
    private Short discount_percent;

    @Column(unique = true, nullable = false)
    private Integer minimum_no_point;
}
