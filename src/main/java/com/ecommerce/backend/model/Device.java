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

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private ProductLine productLine;

    @Column(length = 15)
    private String ram;

    @Column(name = "operator_system",length = 20)
    private String operatorSystem;

    @Column(name = "battery_capacity",length = 30)
    private String batteryCapacity;

    @Column(length = 15)
    private String weight;

    @Column(length = 50)
    private String camera;

    @Column(length = 15)
    private String storage;

    @Column(name = "screen_size",length = 30)
    private String screenSize;

    @Column(name = "display_resolution",length = 30)
    private String displayResolution;
}
