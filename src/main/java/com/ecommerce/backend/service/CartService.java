package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart createCart(Integer customerId) {
        Cart cart = new Cart();
        cart.setCustomer_id(customerId);
        cart.setCreated_date(LocalDate.now());
        cart.setTotal_amount(0.0);
        return cartRepository.save(cart);
    }

    public void updateCreatedDate(int id) {
        Cart existingCart = cartRepository.findById(id).orElse(null);
        if (existingCart != null) {
            existingCart.setCreated_date(LocalDate.now());
            cartRepository.save(existingCart);
        }
    }

    public ResponseEntity<?> updateFields(int id, Map<String, Object> map) {
        Cart existingCart = cartRepository.findById(id).orElse(null);
        try {
            if (existingCart != null) {
                map.forEach((key, value) -> {
                    switch (key) {
                        case "createdDate":
                            existingCart.setCreated_date((LocalDate) value);
                            break;
                        case "discountPercent":
                            existingCart.setTotal_amount((Double) value);
                            break;
                    }
                });
                cartRepository.save(existingCart);
            }
            Map<String, String> response = new HashMap<>();
            response.put("message", "Membership class updated successfully");

            return ResponseEntity.status(201).body(response);
        }  catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("One or more keys are taken");
        }
    }
}
