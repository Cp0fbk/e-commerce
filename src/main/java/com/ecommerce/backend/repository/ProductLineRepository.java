package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CategoryType;
import com.ecommerce.backend.model.ProductLine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
	@Query("SELECT p FROM ProductLine p WHERE " +
			"(:keyword IS NULL OR p.name LIKE %:keyword% OR p.description LIKE %:keyword%) " +
			"AND (:brand IS NULL OR p.brand = :brand) " +
			"AND (:categoryTypeId IS NULL OR p.categoryType.categoryTypeId = :categoryTypeId) " +
			"AND (:minPrice IS NULL OR p.price >= :minPrice) " +
			"AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
			"AND (:isUsed IS NULL OR p.isUsed = :isUsed) " +
			"AND (:stockStatus IS NULL OR p.stockStatus = :stockStatus) " +
			"AND (:minDiscountPercentage IS NULL OR p.discountPercentage >= :minDiscountPercentage) " +
			"AND (:promotionId IS NULL OR p.promotion.promotionId = :promotionId)")
	Page<ProductLine> filterProducts(
			@Param("keyword") String keyword,
			@Param("brand") String brand,
			@Param("categoryTypeId") Integer categoryTypeId,
			@Param("minPrice") Double minPrice,
			@Param("maxPrice") Double maxPrice,
			@Param("isUsed") Boolean isUsed,
			@Param("stockStatus") Boolean stockStatus,
			@Param("minDiscountPercentage") Short minDiscountPercentage,
			@Param("promotionId") Integer promotionId,
			Pageable pageable);

	List<ProductLine> findByBrandAndPriceBetween(String brand, Double minPrice, Double maxPrice);

	@Query("SELECT p FROM ProductLine p WHERE p.discountPercentage > 0")
	List<ProductLine> findDiscountedProducts();

	List<ProductLine> findByCategoryType_NameAndBrand(String categoryName, String brand);


	@Query("SELECT p FROM ProductLine p JOIN p.promotion pr WHERE pr.type = :promotionType")
	List<ProductLine> findByPromotionType(@Param("promotionType") String promotionType);
}
