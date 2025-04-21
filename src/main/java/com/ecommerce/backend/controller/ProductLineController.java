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
@RequestMapping("/api/products")
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
    @PostMapping("/filter")
    public ResponseEntity<ApiResponse<Page<ProductLine>>> filterProducts(
            @RequestBody ProductFilterDTO filterDTO) {

        try {
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
    public ResponseEntity<ApiResponse<ProductLineDetailsDTO>> getProductById(@PathVariable Integer id) {
        try {
            ProductLineDetailsDTO productDetails = productLineService.getProductDetails(id);
            ApiResponse<ProductLineDetailsDTO> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Product fetched successfully",
                    productDetails
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<ProductLineDetailsDTO> response = new ApiResponse<>(
                    HttpStatus.NOT_FOUND.value(),
                    "Failed to fetch product: " + e.getMessage(),
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
