package com.ecommerce.backend.dtos.cartDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Integer customerId;
    private Integer quantity;
    private Double price;
}

