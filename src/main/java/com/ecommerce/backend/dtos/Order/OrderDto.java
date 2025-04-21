package com.ecommerce.backend.dtos.Order;

import java.time.LocalDate;

public record OrderDto (
	Integer orderId,
	LocalDate orderDate,
	String orderStatus,
	Double totalAmount,
	Integer employeeId,
	Integer customerId,
	Integer deliveryId) {

}
