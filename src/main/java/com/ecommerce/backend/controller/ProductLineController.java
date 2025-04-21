package com.ecommerce.backend.controller;

import com.ecommerce.backend.dtos.productlineDTO.ProductFilterDTO;
import com.ecommerce.backend.dtos.productlineDTO.ProductLineDTO;
import com.ecommerce.backend.dtos.productlineDTO.ProductLineDetailsDTO;
import com.ecommerce.backend.model.ProductLine;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.ProductLineService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductLineController {
    private final ProductLineService productLineService;
    public ProductLineController (ProductLineService productLineService) {
        this.productLineService = productLineService;
    }
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ProductLineDTO>>> GetAllProducts () {
        try{
            List<ProductLineDTO> data = productLineService.GetAllProducts();
            ApiResponse<List<ProductLineDTO>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get all products successfully", data);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse<List<ProductLineDTO>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<Page<ProductLine>>> filterProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer categoryTypeId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean isUsed,
            @RequestParam(required = false) Boolean stockStatus,
            @RequestParam(required = false) Short minDiscountPercentage,
            @RequestParam(required = false) Integer promotionId,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "15") int limit) {

        try {
            ProductFilterDTO filterDTO = new ProductFilterDTO();
            filterDTO.setKeyword(keyword);
            filterDTO.setBrand(brand);
            filterDTO.setCategoryTypeId(categoryTypeId);
            filterDTO.setMinPrice(minPrice);
            filterDTO.setMaxPrice(maxPrice);
            filterDTO.setIsUsed(isUsed);
            filterDTO.setStockStatus(stockStatus);
            filterDTO.setMinDiscountPercentage(minDiscountPercentage);
            filterDTO.setPromotionId(promotionId);
            filterDTO.setOffset(offset);
            filterDTO.setLimit(limit);

            Page<ProductLine> filteredProducts = productLineService.FilterProducts(filterDTO);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            HttpStatus.OK.value(),
                            "Products filtered successfully",
                            filteredProducts
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Failed to filter products: " + e.getMessage(),
                            null
                    ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductLineDetailsDTO> getProductById(@PathVariable Integer id) {
        ProductLineDetailsDTO productDetails = productLineService.getProductDetails(id);
        return ResponseEntity.ok(productDetails);
    }
}
