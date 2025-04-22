package com.ecommerce.backend.dtos.Payment;

public record PaymentDto (
	Integer orderId,
	String paymentDate, 
	String paymentStatus, 
	String method
){
	
}
