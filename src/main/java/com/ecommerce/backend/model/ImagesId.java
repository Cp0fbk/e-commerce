package com.ecommerce.backend.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImagesId implements Serializable{
    @Column(name = "product_line_id")
    private Integer productLineId;
    
    @Column(length = 50)
    private String image;
}
