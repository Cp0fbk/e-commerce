package com.ecommerce.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.backend.dtos.Image.ImageDto;
import com.ecommerce.backend.dtos.Image.ImageResponseDto;
import com.ecommerce.backend.model.Images;
import com.ecommerce.backend.model.ImagesId;
import com.ecommerce.backend.model.ProductLine;
import com.ecommerce.backend.repository.ImagesRepository;
import com.ecommerce.backend.repository.ProductLineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final Cloudinary cloudinary;
    private final ImagesRepository imagesRepository;
    private final ProductLineRepository productLineRepository;

    public String uploadImage(ImageDto request) {
        try {
            // 1. Upload image to Cloudinary
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    request.getImage().getBytes(),
                    ObjectUtils.asMap("folder", "ecommerce/images")
            );

            String imageUrl = (String) uploadResult.get("secure_url");
            String fileName = request.getImage().getOriginalFilename();
            Integer productLineId = request.getProductLineId();

            // 2. Get product line entity
            ProductLine productLine = productLineRepository.findById(productLineId)
                    .orElseThrow(() -> new RuntimeException("Product line not found"));

            // 3. Build composite key
            ImagesId imagesId = new ImagesId(productLineId, fileName);

            // 4. Save to database
            Images image = new Images();
            image.setId(imagesId);
            image.setProductLine(productLine);
            image.setImageUrl(imageUrl);

            imagesRepository.save(image);

            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage(), e);
        }
    }

    public List<ImageResponseDto> getImagesByProductLine(Integer productLineId) {
        return imagesRepository.findByIdProductLineId(productLineId)
                .stream()
                .map(img -> new ImageResponseDto(img.getId().getImage(), img.getImageUrl()))
                .collect(Collectors.toList());
    }
}
