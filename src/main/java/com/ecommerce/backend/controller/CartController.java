package com.ecommerce.backend.controller;

import com.ecommerce.backend.component.JwtUtil;
import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.service.CartIncludesProductLineService;
import com.ecommerce.backend.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartIncludesProductLineRepository cartIncludesProductLineRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private CartIncludesProductLineService cartIncludesProductLineService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductLineRepository productLineRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<CartDTO>> getCart(HttpServletRequest request, HttpServletResponse response, @RequestHeader("Authorization") String authHeader) {
        // TEMP
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        return ResponseEntity.ok(cartIncludesProductLineRepository.findByCustomerId(customerId));
    }

    @PostMapping("")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> addProductIntoCart(HttpServletRequest request, @RequestHeader("Authorization") String authHeader, @RequestBody Map<String, String> info) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        // Check if the cart record of customer exists in cart table
        if (!cartRepository.existsByCustomer_id(customerId)) {
            cartService.createCart(customerId);
        }
        // Check if there is any product line in customer's cart
        else if (!cartIncludesProductLineRepository.existsByCustomerId_Id(customerId)) {
            cartService.updateCreatedDate(customerId);
        }
        // Add record into cart_includes_product_line table
        try {
            CartIncludesProductLine cartIncludesProductLine = new CartIncludesProductLine();
            CartIncludesProductLineId id = new CartIncludesProductLineId();
            id.setCustomer_id(customerId);
            id.setProduct_line_id(Integer.parseInt(info.get("productLineId")));
            cartIncludesProductLine.setId(id);
            cartIncludesProductLine.setPrice(Double.parseDouble(info.get("price")));
            cartIncludesProductLine.setQuantity(Integer.parseInt(info.get("quantity")));
            cartIncludesProductLine.setCustomerId(customerRepository.findById(customerId).orElse(null));
            cartIncludesProductLine.setProductLineId(productLineRepository.findById(id.getProduct_line_id()).orElse(null));
            cartIncludesProductLineService.createCartIncludesProductLine(cartIncludesProductLine);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product added successfully");

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error while adding product into cart");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> removeProductFromCart(HttpServletRequest request, @RequestHeader("Authorization") String authHeader, @PathVariable("id") Integer productLineId) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        try {
            CartIncludesProductLineId id = new CartIncludesProductLineId();
            id.setCustomer_id(customerId);
            id.setProduct_line_id(productLineId);
            cartIncludesProductLineService.deleteCartIncludesProductLine(id);

            return ResponseEntity.ok("Product " + productLineId + " has been deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error deleting product: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> updateQuantity(@PathVariable("id") int productLineId, @RequestBody Map<String, Object> map, HttpServletRequest request, @RequestHeader("Authorization") String authHeader) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        CartIncludesProductLineId id = new CartIncludesProductLineId();
        id.setCustomer_id(customerId);
        id.setProduct_line_id(productLineId);
        return cartIncludesProductLineService.updateFields(id, map);
    }
}
