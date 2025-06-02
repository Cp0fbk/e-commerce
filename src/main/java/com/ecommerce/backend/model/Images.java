package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "images")
public class Images {
    @EmbeddedId
    private ImagesId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productLineId")
    @JoinColumn(name = "product_line_id")
    private ProductLine productLine;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}
