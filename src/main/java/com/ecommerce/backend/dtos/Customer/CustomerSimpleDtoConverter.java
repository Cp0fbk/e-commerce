package com.ecommerce.backend.dtos.Customer;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Customer;

@Component
public class CustomerSimpleDtoConverter {
	public CustomerSimpleDto convertToDto(Customer customer) {
		return new CustomerSimpleDto(
				customer.getAccount().getAccountId(),
				customer.getFname(),
				customer.getLname(),
				customer.getEmail(),
				customer.getPhoneNumber(),
				customer.getShippingAddress()
		);
	}

	public List<CustomerSimpleDto> convertToDto(List<Customer> customers) {
		return customers.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}
	public Optional<CustomerSimpleDto> convertToDto(Optional<Customer> customer) {
		return customer.map(this::convertToDto);
	}
}
