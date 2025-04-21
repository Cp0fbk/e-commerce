package com.ecommerce.backend.dtos.Payment.Request;

import lombok.Data;

@Data
public class CreatePaymentRequest {
	private Integer orderId;
	private String returnUrl;
	private String cancelUrl;
}
