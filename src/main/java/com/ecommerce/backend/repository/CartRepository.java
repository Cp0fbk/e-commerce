package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    boolean existsByCustomer_id(Integer customerId);
    Optional<Cart> findByCustomer_id(Integer customerId);
}
