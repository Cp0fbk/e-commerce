package com.ecommerce.backend.dtos.Account;

public record AccountDto (
		Integer accountId,
		String username,
		String password,
		String role) {
}
