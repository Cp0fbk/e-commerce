package com.ecommerce.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Promotion.PromotionDto;
import com.ecommerce.backend.dtos.Promotion.PromotionDtoConverter;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.PromotionService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/promotions")
@Validated
public class PromotionController {
	private final PromotionService promotionService;
	private final PromotionDtoConverter promotionDtoConverter;

	public PromotionController(PromotionService promotionService, PromotionDtoConverter promotionDtoConverter) {
		this.promotionService = promotionService;
		this.promotionDtoConverter = promotionDtoConverter;
	}

	@Operation(summary = "Lấy tất cả các chương trình khuyến mãi")
	@GetMapping("/all")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<ApiResponse<List<PromotionDto>>> getAllPromotions() {
		try {
			List<PromotionDto> promotions = promotionDtoConverter.convert(promotionService.getAllPromotions());
			ApiResponse<List<PromotionDto>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get promotions successfully", promotions);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			ApiResponse<List<PromotionDto>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Operation(summary = "Lấy tất cả các chương trình khuyến mãi đang diễn ra")
	@GetMapping("/onDate")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<ApiResponse<List<PromotionDto>>> getPromotionOnDate() {
		try {
			List<PromotionDto> promotions = promotionDtoConverter.convert(promotionService.getPromotionOnDate());
			ApiResponse<List<PromotionDto>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get promotions on date successfully", promotions);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			ApiResponse<List<PromotionDto>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
