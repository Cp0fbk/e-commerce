package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "product_line_managed_by_employee")
public class ProductLineManagedByEmployee {
    @EmbeddedId
    private ProductLineManagedByEmployeeId id;

    @ManyToOne
    @MapsId("product_line_id")
    @JoinColumn(name = "product_line_id")
    private ProductLine product_line_id;

    @ManyToOne
    @MapsId("employee_id")
    @JoinColumn(name = "employee_id")
    private Employee employee_id;
}
