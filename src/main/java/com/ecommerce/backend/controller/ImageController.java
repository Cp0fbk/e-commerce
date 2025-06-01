package com.ecommerce.backend.controller;

import com.ecommerce.backend.dtos.Image.ImageDto;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            ImageDto request = new ImageDto(productLineId, image);
            imageService.uploadImage(request);

            ApiResponse<String> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Image uploaded successfully.",
                    image.getOriginalFilename()
            );
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            ApiResponse<String> errorResponse = new ApiResponse<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Upload failed: " + e.getMessage(),
                    null
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}
