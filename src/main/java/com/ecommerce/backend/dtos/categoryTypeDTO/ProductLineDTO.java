package com.ecommerce.backend.dtos.categoryTypeDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductLineDTO {
    private Integer id;
    private String name;
    private String brand;
    private Double price;
    private Boolean isUsed;
    private Boolean stockStatus;
    private String color;
}


