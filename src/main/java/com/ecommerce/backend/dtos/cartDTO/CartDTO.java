package com.ecommerce.backend.dtos.cartDTO;

import com.ecommerce.backend.model.ProductLine;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private ProductLine productId;
    private Integer quantity;
    private Double price;
}
