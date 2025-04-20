package com.ecommerce.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Promotion;
import com.ecommerce.backend.repository.PromotionRepository;

@Service
public class PromotionService {
	private final PromotionRepository promotionRepository;

	public PromotionService(PromotionRepository promotionRepository) {
		this.promotionRepository = promotionRepository;
	}

	public List<Promotion> getAllPromotions() {
		return promotionRepository.findAll();
	}

	public List<Promotion> getPromotionOnDate() {
		return promotionRepository.findByEndDateGreaterThanEqual(LocalDate.now());
	}
}
