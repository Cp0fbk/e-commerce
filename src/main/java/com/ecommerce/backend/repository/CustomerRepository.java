package com.ecommerce.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.model.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository <Customer, Integer> {
		Customer findByEmail(String email);
		Customer findById(int id);
		Customer findByPhoneNumber(String phoneNumber);
		Customer findByMembershipClass_Id(int membershipClassId);
		boolean existsByPhoneNumber(String phoneNumber);
}
