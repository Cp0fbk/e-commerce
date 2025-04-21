package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    boolean existsByCustomer_id(Integer customerId);
}
