package com.ecommerce.backend.dtos.productlineDTO;

import lombok.Data;

@Data
public class ProductFilterDTO {
    private String keyword;
    private String brand;
    private Integer categoryTypeId;
    private Double minPrice;
    private Double maxPrice;
    private Boolean isUsed;
    private Boolean stockStatus;
    private Short minDiscountPercentage;
    private Integer promotionId;
    private int offset = 0;
    private int limit = 15;
}
