package com.ecommerce.backend.dtos.productlineDTO;

import com.ecommerce.backend.dtos.cartDTO.CartItemDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.ProductLine;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductLineDetailsDTO {
    private Integer id;
    private String name;
    private String brand;
    private Boolean isUsed;
    private Boolean stockStatus;
    private Double price;
    private String description;
    private String category;
    private String color;
    private Short discountPercentage;

    private List<CartItemDTO> cartItems;

    public static ProductLineDetailsDTO from(ProductLine p, List<CartIncludesProductLine> cartItems) {
        List<CartItemDTO> cartItemDTOs = cartItems.stream()
                .map(c -> new CartItemDTO(c.getCustomerId().getId(), c.getQuantity(), c.getPrice()))
                .collect(Collectors.toList());

        return new ProductLineDetailsDTO(
                p.getId(), p.getName(), p.getBrand(), p.getIsUsed(), p.getStockStatus(),
                p.getPrice(), p.getDescription(), p.getCategory(), p.getColor(),
                p.getDiscountPercentage(), cartItemDTOs
        );
    }
}

