package com.ecommerce.backend.controller;

import com.ecommerce.backend.component.JwtUtil;
import com.ecommerce.backend.helper.GetAccountIdHelper;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.repository.CartIncludesProductLineRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customer/cart")
public class CartController {
//    @Autowired
//    CartRepository cartRepository;
    @Autowired
    private GetAccountIdHelper getAccountIdHelper;
    @Autowired
    private CartIncludesProductLineRepository cartIncludesProductLineRepository;
    @Autowired
    private JwtUtil jwtUtil;
//    @Autowired
//    private CartService cartService;

    @GetMapping("")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<CartIncludesProductLine>> getCart(HttpServletRequest request, HttpServletResponse response, @RequestHeader("Authorization") String authHeader) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        return ResponseEntity.ok(cartIncludesProductLineRepository.findByCustomer_id(customerId));
    }
}
