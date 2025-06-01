package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.Image.ImageDto;
import com.ecommerce.backend.model.Images;
import com.ecommerce.backend.model.ImagesId;
import com.ecommerce.backend.model.ProductLine;
import com.ecommerce.backend.repository.ImagesRepository;
import com.ecommerce.backend.repository.ProductLineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImagesRepository imagesRepository;
    private final ProductLineRepository productLineRepository;

    private static final String UPLOAD_DIR = "uploads/";

    public void uploadImage(ImageDto request) {
        MultipartFile file = request.getImage();
        Integer productLineId = request.getProductLineId();

        try {
            // 1. Save file to local disk
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(filePath.getParent()); // create "uploads/" folder if not exist
            Files.write(filePath, file.getBytes(), StandardOpenOption.CREATE);

            // 2. Get ProductLine entity
            ProductLine productLine = productLineRepository.findById(productLineId)
                    .orElseThrow(() -> new RuntimeException("ProductLine not found with ID: " + productLineId));

            // 3. Create composite ID
            ImagesId imagesId = new ImagesId(productLineId, fileName);

            // 4. Create and save Images entity
            Images imageEntity = new Images();
            imageEntity.setId(imagesId);
            imageEntity.setProductLine(productLine);

            imagesRepository.save(imageEntity);

        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage(), e);
        }
    }
}
