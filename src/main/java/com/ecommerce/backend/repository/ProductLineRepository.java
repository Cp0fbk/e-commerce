package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CategoryType;
import com.ecommerce.backend.model.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLine, Integer> {

	List<ProductLine> findByBrand(String brand);

	List<ProductLine> findByCategory(String category);

	List<ProductLine> findByCategoryAndStockStatus(String category, Boolean stockStatus);

	List<ProductLine> findByPromotion_PromotionId(Integer promotionId);

	List<ProductLine> findByCategoryType(CategoryType categoryType);

  List<ProductLine> findByCategoryType_CategoryTypeId(Long categoryTypeId);

	List<ProductLine> findByCategoryType_Name(String name);

	List<ProductLine> findByPriceBetween(Double minPrice, Double maxPrice);

	List<ProductLine> findByIsUsedTrue();

	List<ProductLine> findByStockStatusTrue();
}
