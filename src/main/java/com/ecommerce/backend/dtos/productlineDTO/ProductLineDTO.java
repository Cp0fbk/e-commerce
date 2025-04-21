package com.ecommerce.backend.dtos.productlineDTO;

import com.ecommerce.backend.model.CategoryType;
import com.ecommerce.backend.model.Promotion;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductLineDTO {
    private Integer id;
    private String name;
    private String brand;
    private Boolean isUsed;
    private Boolean stockStatus;
    private Double price;
    private String description;
    private String category;
    private String color;
    private Promotion promotion;
    private Short discountPercentage;
    private CategoryType categoryType;
}
