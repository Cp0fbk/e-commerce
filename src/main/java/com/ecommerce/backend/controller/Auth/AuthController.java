package com.ecommerce.backend.controller.Auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Account.AccountDto;
import com.ecommerce.backend.dtos.Account.AccountDtoConverter;
import com.ecommerce.backend.dtos.auth.response.RegisterDto;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.AccountService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
	private final AuthenticationManager authenticationManager;
	private final AccountService accountService;
	private final AccountDtoConverter accountDtoConverter;

	public AuthController(AuthenticationManager authenticationManager,
			AccountService accountService, AccountDtoConverter accountDtoConverter) {
		this.authenticationManager = authenticationManager;
		this.accountService = accountService;
		this.accountDtoConverter = accountDtoConverter;
	}

	@Operation(description = "Đăng ký tài khoản")
	@PostMapping("/register")
	@Validated
	public ResponseEntity<ApiResponse<AccountDto>> register(@RequestBody @Valid RegisterDto request) {
		try {
			AccountDto account = accountDtoConverter.convert(accountService.createAccount(request));

			ApiResponse<AccountDto> response = new ApiResponse<>(HttpStatus.OK.value(), "User created successfully",
                    account);
      return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			ApiResponse<AccountDto> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		} 
	}

	@GetMapping("/logout")
	public ResponseEntity<ApiResponse<String>> logout() {
		ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK.value(), "Logout successful", null);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
