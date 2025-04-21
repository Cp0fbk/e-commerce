package com.ecommerce.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.backend.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	Payment findByOrderId(Integer orderId);
	void deleteByOrderId(Integer orderId);
} 
