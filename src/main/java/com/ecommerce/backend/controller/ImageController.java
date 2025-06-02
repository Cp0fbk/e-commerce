package com.ecommerce.backend.controller;

import com.ecommerce.backend.dtos.Image.ImageDto;
import com.ecommerce.backend.dtos.Image.ImageResponseDto;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadImage(
            @RequestParam("productLineId") Integer productLineId,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            ImageDto dto = new ImageDto(productLineId, image);
            String imageUrl = imageService.uploadImage(dto);
            ApiResponse<String> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Image uploaded successfully",
                    imageUrl
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse<String> errorResponse = new ApiResponse<>(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    null
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/product-line/{id}")
    public ResponseEntity<ApiResponse<List<ImageResponseDto>>> getImagesByProductLine(@PathVariable("id") Integer id) {
        try {
            List<ImageResponseDto> images = imageService.getImagesByProductLine(id);
            ApiResponse<List<ImageResponseDto>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Fetched images successfully",
                    images
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse<List<ImageResponseDto>> response = new ApiResponse<>(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
