package com.ecommerce.backend.dtos.Employee;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Employee;

@Component
public class EmployeeSimpleDtoConverter {
	
	public EmployeeSimpleDto convert(Employee fromfrom) {
		return new EmployeeSimpleDto(
				fromfrom.getAccount().getAccountId(),
				fromfrom.getFname(),
				fromfrom.getLname(),
				fromfrom.getEmail(),
				fromfrom.getPhoneNumber()
		);
	}
	
	public List<EmployeeSimpleDto> convert(List<Employee> from) {
		return from.stream()
				.map(this::convert)
				.collect(Collectors.toList());
	}

	public Optional<EmployeeSimpleDto> convert(Optional<Employee> from) {
		return from.map(this::convert);
	}
}
