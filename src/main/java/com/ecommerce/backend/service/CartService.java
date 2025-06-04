package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.repository.CartIncludesProductLineRepository;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.CustomerRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CartIncludesProductLineRepository cartIncludesProductLineRepository;

    public Cart createCart(Integer customerId) {
        Cart cart = new Cart();
        cart.setCustomer(customerRepository.findById(customerId).orElse(null));
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

    public void updateCartTotal(Integer customerId) {
        List<CartDTO> cartItems = cartIncludesProductLineRepository.findByCustomerId(customerId);

        double total = cartItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        Optional<Cart> cart = cartRepository.findByCustomer_id(customerId);
        if (cart.isPresent()) {
            Cart existingCart = cart.get();
            existingCart.setTotal_amount(total);
            cartRepository.save(existingCart);
        }
    }
}
