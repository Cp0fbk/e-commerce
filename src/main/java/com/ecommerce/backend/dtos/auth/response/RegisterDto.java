package com.ecommerce.backend.dtos.auth.response;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
	@NotBlank
	private String username;
	@NotBlank
	private String password;
	@NotBlank
	private String phoneNumber;
	@NotBlank
	private String lname;
	@NotBlank
	private String fname;
}
