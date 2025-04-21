package com.ecommerce.backend.dtos.Promotion;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Promotion;

@Component
public class PromotionDtoConverter {
	public PromotionDto convert(Promotion from) {
		return new PromotionDto(
				from.getPromotionId(),
				from.getType(),
				from.getName(),
				from.getStartDate().toString(),
				from.getEndDate().toString()
		);
	}

	public List<PromotionDto> convert(List<Promotion> from) {
			return from.stream().map(this::convert).collect(Collectors.toList());
	}

	public Optional<PromotionDto> convert(Optional<Promotion> from) {
			return from.map(this::convert);
	}

}
