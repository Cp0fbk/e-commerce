package com.ecommerce.backend.dtos.Order;

import java.time.LocalDate;

import com.ecommerce.backend.dtos.Customer.CustomerSimpleDto;
import com.ecommerce.backend.dtos.Employee.EmployeeSimpleDto;
import com.ecommerce.backend.model.Delivery;


public record OrderDetailDto (	
	Integer orderId,
	LocalDate orderDate,
	String orderStatus,
	Double totalAmount,
	EmployeeSimpleDto employee,
	CustomerSimpleDto customer,
	Delivery delivery) {

}
