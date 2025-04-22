package com.ecommerce.backend.dtos.Payment.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePaymentRequest {
	@NotBlank(message = "Mã đơn hàng không được để trống")
	private Integer orderId;
	
	private String returnUrl;
	private String cancelUrl;
}
