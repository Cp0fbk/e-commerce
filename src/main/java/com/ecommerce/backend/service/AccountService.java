package com.ecommerce.backend.service;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.dtos.auth.response.RegisterDto;
import com.ecommerce.backend.model.Account;
import com.ecommerce.backend.model.Customer;
import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.AccountRepository;
import com.ecommerce.backend.repository.CustomerRepository;
import com.ecommerce.backend.repository.MembershipClassRepository;

@Service
public class AccountService {
	private final AccountRepository accountRepository;
	private final CustomerRepository customerRepository;
	private final MembershipClassRepository membershipClassRepository;
	private final PasswordEncoder passwordEncoder;

	
	public AccountService(AccountRepository accountRepository, MembershipClassRepository membershipClass,
	CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
		this.membershipClassRepository = membershipClass;
		this.accountRepository = accountRepository;
		this.customerRepository = customerRepository;
	}
	
	public Account createAccount(RegisterDto request) {
		// Check if the email or username already exists in the database
		if (accountRepository.existsByUsername(request.getUsername())) {
			throw new RuntimeException("Username already exists");
		}
		if (customerRepository.existsByPhoneNumber(request.getPhoneNumber())) {
			throw new RuntimeException("Phone number already exists");
		}

		if (request.getUsername() == null || request.getUsername().isEmpty()) {
			throw new RuntimeException("Username cannot be empty");
		}
		if (request.getPassword() == null || request.getPassword().isEmpty()) {
			throw new RuntimeException("Password cannot be empty");
		}
		if (request.getPhoneNumber() == null || request.getPhoneNumber().isEmpty()) {
			throw new RuntimeException("Phone number cannot be empty");
		}
		if (request.getLname() == null || request.getLname().isEmpty()) {
			throw new RuntimeException("Last name cannot be empty");
		}
		if (request.getFname() == null || request.getFname().isEmpty()) {
			throw new RuntimeException("First name cannot be empty");
		}

		// Create a new Account and Customer object
		Account account = new Account();
		account.setUsername(request.getUsername());
		account.setPassword(passwordEncoder.encode(request.getPassword()));
		account.setRole("customer");
		accountRepository.save(account);

		MembershipClass membershipClass = membershipClassRepository.findById(1);

		Customer customer = new Customer();
    customer.setAccount(account);
    customer.setEmail(request.getUsername());
    customer.setRegistrationDate(LocalDate.now());
    customer.setFname(request.getFname());
    customer.setLname(request.getLname());
		customer.setPhoneNumber(request.getPhoneNumber());
    customer.setTotalPoints(0);
    customer.setMembershipClass(membershipClass);
    customer.setIsDeleted(false);
		customerRepository.save(customer);

		return account;
	}
}
