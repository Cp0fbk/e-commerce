package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findByEmail(String email);
    Employee findById(int id);
    Employee findByPhoneNumber(String phoneNumber);
}
