package com.ecommerce.backend.dtos.Promotion;

public record PromotionDto(
		Integer promotionId,
		String type,
		String name,
		String startDate,
		String endDate
) {
}