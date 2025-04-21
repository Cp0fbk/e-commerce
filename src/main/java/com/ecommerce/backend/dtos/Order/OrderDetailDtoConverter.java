package com.ecommerce.backend.dtos.Order;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.dtos.Customer.CustomerSimpleDtoConverter;
import com.ecommerce.backend.dtos.Employee.EmployeeSimpleDtoConverter;
import com.ecommerce.backend.model.Order;

@Component
public class OrderDetailDtoConverter {
	private final EmployeeSimpleDtoConverter employeeSimpleDtoConverter;
	private final CustomerSimpleDtoConverter customerSimpleDtoConverter;

	public OrderDetailDtoConverter(EmployeeSimpleDtoConverter employeeSimpleDtoConverter,
		CustomerSimpleDtoConverter customerSimpleDtoConverter) {
		this.employeeSimpleDtoConverter = employeeSimpleDtoConverter;
		this.customerSimpleDtoConverter = customerSimpleDtoConverter;
	}

	public OrderDetailDto convert(Order from) {
		return new OrderDetailDto(
			from.getOrderId(),
			from.getOrderDate(),
			from.getOrderStatus(),
			from.getTotalAmount(),
			employeeSimpleDtoConverter.convert(from.getEmployee()),
			customerSimpleDtoConverter.convertToDto(from.getCustomer()),
			from.getDelivery()
		);
	}
	public List<OrderDetailDto> convert(List<Order> from) {
		return from.stream()
			.map(this::convert)
			.collect(Collectors.toList());
	}
	public Optional<OrderDetailDto> convert(Optional<Order> from) {
		return from.map(this::convert);
	}
}
