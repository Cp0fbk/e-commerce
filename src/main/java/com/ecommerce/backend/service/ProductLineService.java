package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.productlineDTO.ProductFilterDTO;
import com.ecommerce.backend.dtos.productlineDTO.ProductLineDTO;
import com.ecommerce.backend.dtos.productlineDTO.ProductLineDetailsDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.ProductLine;
import com.ecommerce.backend.repository.CartIncludesProductLineRepository;
import com.ecommerce.backend.repository.ProductLineRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductLineService {
    private final ProductLineRepository productLineRepository;
    private final CartIncludesProductLineRepository cartIncludesProductLineRepository;

//    public ProductLineService(ProductLineRepository productLineRepository) {
//        this.productLineRepository = productLineRepository;
//    }

    public List<ProductLineDTO> GetAllProducts() {
        return productLineRepository.findAll().stream()
                .map(products -> new ProductLineDTO(
                        products.getId(),
                        products.getName(),
                        products.getBrand(),
                        products.getIsUsed(),
                        products.getStockStatus(),
                        products.getPrice(),
                        products.getDescription(),
                        products.getCategory(),
                        products.getColor(),
                        products.getPromotion(),
                        products.getDiscountPercentage(),
                        products.getCategoryType())
                ).collect(Collectors.toList());
    }
    public Page<ProductLine> FilterProducts (ProductFilterDTO filterDTO) {
        PageRequest pageRequest = PageRequest.of(
                filterDTO.getOffset() / filterDTO.getLimit(),
                filterDTO.getLimit());
        return productLineRepository.filterProducts(
                filterDTO.getKeyword(),
                filterDTO.getBrand(),
                filterDTO.getCategoryTypeId(),
                filterDTO.getMinPrice(),
                filterDTO.getMaxPrice(),
                filterDTO.getIsUsed(),
                filterDTO.getStockStatus(),
                filterDTO.getMinDiscountPercentage(),
                filterDTO.getPromotionId(),
                pageRequest
        );
    }

    public ProductLineDetailsDTO getProductDetails(Integer id) {
        ProductLine productLine = productLineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        List<CartIncludesProductLine> cartItems = cartIncludesProductLineRepository
                .findByProductLineId_Id(id);

        return ProductLineDetailsDTO.from(productLine, cartItems);
    }
}
