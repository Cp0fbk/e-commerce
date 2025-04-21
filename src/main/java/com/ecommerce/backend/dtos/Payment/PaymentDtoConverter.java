package com.ecommerce.backend.dtos.Payment;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Payment;

@Component
public class PaymentDtoConverter {
	public PaymentDto convert (Payment from){
		return new PaymentDto(
			from.getOrderId(),
			from.getPaymentDate().toString(),
			from.getPaymentStatus(),
			from.getMethod()
		);
	}

	public List<PaymentDto> convert (List<Payment> from){
		return from.stream().map(this::convert).toList();
	}

	public Optional<PaymentDto> convert (Optional<Payment> from){
		return from.map(this::convert);
	}
}
