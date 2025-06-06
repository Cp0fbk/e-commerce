package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "accessory")
public class Accessory {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private ProductLine productLine;

    @Column(name = "battery_capacity",length = 30)
    private String batteryCapacity;
}
