package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "device")
public class Device {
    @Id
    private Integer id;

    @Column(length = 15)
    private String ram;

    @Column(length = 20)
    private String operator_system;

    @Column(length = 30)
    private String battery_capacity;

    @Column(length = 15)
    private String weight;

    @Column(length = 50)
    private String camera;

    @Column(length = 15)
    private String storage;

    @Column(length = 30)
    private String screen_size;

    @Column(length = 30)
    private String display_resolution;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private ProductLine productLine;
}
