package com.ecommerce.backend.dtos.Employee;

public record EmployeeSimpleDto (
		Integer employeeId,
		String fName,
		String lName,
		String email,
		String phoneNumber
) {
	
}
