package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class SpecialFeatureId {
    private Integer device_id;

    @Column(length = 75)
    private String special_feature;
}
