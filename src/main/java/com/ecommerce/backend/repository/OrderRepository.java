package com.ecommerce.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.backend.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	Page<Order> findByCustomer_Account_AccountId(Integer accountId, Pageable pageable);
	Optional<Order> findByOrderId(Integer orderId);
	void deleteByOrderId(Integer orderId);
}