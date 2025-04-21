package com.ecommerce.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.dtos.auth.response.RegisterDto;
import com.ecommerce.backend.model.Account;
import com.ecommerce.backend.repository.AccountRepository;

@Service
public class AccountService {
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;

	
	public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
		this.accountRepository = accountRepository;
	}
	
	public Account createAccount(RegisterDto request) {
		// Check if the email or username already exists in the database
		if (accountRepository.existsByUsername(request.getUsername())) {
			throw new RuntimeException("Username already exists");
		}

		if (request.getUsername() == null || request.getUsername().isEmpty()) {
			throw new RuntimeException("Username cannot be empty");
		}
		if (request.getPassword() == null || request.getPassword().isEmpty()) {
			throw new RuntimeException("Password cannot be empty");
		}

		Account account = new Account();
		account.setUsername(request.getUsername());
		account.setPassword(passwordEncoder.encode(request.getPassword()));
		account.setRole("customer");

		return accountRepository.save(account);
	}
}
