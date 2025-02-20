package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class ProductLineManagedByEmployeeId {
    private Integer product_line_id;

    private Integer employee_id;
}
