package com.ecommerce.backend.controller;

import com.ecommerce.backend.dtos.categoryTypeDTO.CategoryTypeDTO;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController (CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CategoryTypeDTO>>> GetAllCategories () {
        try {
            List<CategoryTypeDTO> data = categoryService.GetAllCategories();
            ApiResponse<List<CategoryTypeDTO>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get categories successfully", data);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse<List<CategoryTypeDTO>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
