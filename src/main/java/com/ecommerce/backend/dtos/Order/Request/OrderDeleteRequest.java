package com.ecommerce.backend.dtos.Order.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDeleteRequest {
	@NotBlank
	private Integer orderId;
}
