package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class OrderIncludesProductLineId {
    private Integer product_line_id;

    private Integer order_id;
}
