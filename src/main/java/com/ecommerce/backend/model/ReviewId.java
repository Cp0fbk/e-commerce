package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class ReviewId {
    
    private Integer product_line_id;

    private Integer customer_id;

    @Column(name = "`index`")
    private Integer index;

}
