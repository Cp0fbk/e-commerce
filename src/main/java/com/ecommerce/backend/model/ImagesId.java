package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class ImagesId {
    private Integer product_line_id;
    
    @Column(length = 50)
    private String image;
}
