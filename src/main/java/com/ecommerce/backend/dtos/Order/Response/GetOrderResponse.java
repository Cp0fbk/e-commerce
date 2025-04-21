package com.ecommerce.backend.dtos.Order.Response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetOrderResponse {
	Integer orderId;
	LocalDate orderDate;
	String orderStatus;
	Double totalAmount;
}
