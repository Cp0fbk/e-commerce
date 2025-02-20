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

    @ManyToOne
    @JoinColumn(name = "id")
    private ProductLine product_line_id;
}
