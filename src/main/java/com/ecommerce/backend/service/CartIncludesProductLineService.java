package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import com.ecommerce.backend.repository.CartIncludesProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Page<CartDTO> getProducts(Integer customerId, int page) {
        Pageable pageable = PageRequest.of(page, 10);
        return cartIncludesProductLineRepository.findByCustomerId(customerId, pageable);
    }

    @Transactional
    public void deleteCartByCustomerId(Integer customerId) {
        cartIncludesProductLineRepository.deleteByCustomerId_Id(customerId);
    }
}
