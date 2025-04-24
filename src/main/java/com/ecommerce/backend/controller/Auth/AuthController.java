package com.ecommerce.backend.controller.Auth;

import com.ecommerce.backend.component.JwtUtil;
import com.ecommerce.backend.dtos.auth.response.LoginDto;
import com.ecommerce.backend.model.Account;
import com.ecommerce.backend.repository.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
	private final AuthenticationManager authenticationManager;
	private final AccountService accountService;
	private final AccountDtoConverter accountDtoConverter;
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthController(AuthenticationManager authenticationManager,
			AccountService accountService, AccountDtoConverter accountDtoConverter,
						  AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.accountService = accountService;
		this.accountDtoConverter = accountDtoConverter;
		this.accountRepository = accountRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Autowired
	private JwtUtil jwtUtil;

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

	@PostMapping("/login")
	public ResponseEntity<?> login(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, String> info) throws Exception {
		try {
			String username = info.get("username");
			String password = info.get("password");

			if (username == null || password == null) {
				throw new Exception("Cannot find username or password");
			}

			Account account = accountRepository.findByUsername(username).orElse(null);
			if (account == null) {
				throw new Exception("User not found");
			}

			if (passwordEncoder.matches(password, account.getPassword())) {
				String token = jwtUtil.generateToken(new LoginDto(username, password), account.getAccountId());

				return new ResponseEntity<>(
						new Responses(token),
						HttpStatus.OK);
			}
			throw new Exception("Wrong username or password");
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		}
	}

	@GetMapping("/logout")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'EMPLOYEE')")
	public ResponseEntity<ApiResponse<String>> logout() {
		ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK.value(), "Logout successful", null);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Data
	@AllArgsConstructor
	private class Responses {
		private String token;
	}
}
