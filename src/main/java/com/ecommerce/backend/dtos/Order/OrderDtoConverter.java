package com.ecommerce.backend.dtos.Order;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Order;

@Component
public class OrderDtoConverter {
	public OrderDto convert(Order from) {
		return new OrderDto(
			from.getOrderId(),
			from.getOrderDate(),
			from.getOrderStatus(),
			from.getTotalAmount(),
			from.getEmployee() != null ? from.getEmployee().getAccount().getAccountId() : null,
			from.getCustomer() != null ? from.getCustomer().getAccount().getAccountId() : null,
			from.getDelivery() != null ? from.getDelivery().getDeliveryId() : null
		);
	}

	public List<OrderDto> convert(List<Order> from) {
		return from.stream()
			.map(this::convert)
			.collect(Collectors.toList());
	}
	public Optional<OrderDto> convert(Optional<Order> from) {
		return from.map(this::convert);
	}
}
