package com.ecommerce.backend.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialFeatureId implements Serializable{
    @Column(name = "device_id")
    private Integer deviceId;

    @Column(name = "special_feature", length = 75)
    private String specialFeature;
}