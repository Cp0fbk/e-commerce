package com.ecommerce.backend.service;

import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.CartIncludesProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.Map;

@Service
public class CartIncludesProductLineService {
    @Autowired
    CartIncludesProductLineRepository cartIncludesProductLineRepository;

    public void createCartIncludesProductLine(CartIncludesProductLine cartIncludesProductLine) {
        cartIncludesProductLineRepository.save(cartIncludesProductLine);
    }

    public void deleteCartIncludesProductLine(CartIncludesProductLineId id) {
        CartIncludesProductLine cartIncludesProductLine = cartIncludesProductLineRepository.findById(id).orElse(null);
        if (cartIncludesProductLine != null) {
            cartIncludesProductLineRepository.delete(cartIncludesProductLine);
        }
    }

    public ResponseEntity<?> updateFields(CartIncludesProductLineId id, Map<String, Object> map) {
        CartIncludesProductLine existingCartIncludesProductLine = cartIncludesProductLineRepository.findById(id).orElse(null);
        try {
            if (existingCartIncludesProductLine != null) {
                map.forEach((key, value) -> {
                    switch (key) {
                        case "quantity":
                            existingCartIncludesProductLine.setQuantity((Integer) value);
                            break;
                    }
                });
                cartIncludesProductLineRepository.save(existingCartIncludesProductLine);
            }
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cart updated successfully");

            return ResponseEntity.status(201).body(response);
        }  catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("One or more keys are taken");
        }
    }
}
