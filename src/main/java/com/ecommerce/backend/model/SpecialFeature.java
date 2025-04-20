package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "special_feature")
public class SpecialFeature {
    @EmbeddedId
    private SpecialFeatureId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("deviceId")
    @JoinColumn(name = "device_id")
    private Device device;
}
