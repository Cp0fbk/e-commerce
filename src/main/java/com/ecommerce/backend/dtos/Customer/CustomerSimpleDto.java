package com.ecommerce.backend.dtos.Customer;

public record CustomerSimpleDto(
		Integer customerId,
		String fName,
		String lName,
		String email,
		String phoneNumber,
		String shippingAddress
) {
} 
