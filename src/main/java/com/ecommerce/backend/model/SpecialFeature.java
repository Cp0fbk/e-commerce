package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "special_feature")
public class SpecialFeature {
    @EmbeddedId
    private SpecialFeatureId id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Device device_id;
}
