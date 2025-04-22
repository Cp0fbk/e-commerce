package com.ecommerce.backend.controller;

import com.ecommerce.backend.component.JwtUtil;
import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.*;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    @Autowired
    private OrderIncludesProductLineService orderIncludesProductLineService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Page<CartDTO>> getCart(HttpServletRequest request, HttpServletResponse response, @RequestHeader("Authorization") String authHeader, @RequestParam(value = "page", defaultValue = "0") int page) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        Page<CartDTO> cartProducts = cartIncludesProductLineService.getProducts(customerId, page);
        return ResponseEntity.ok(cartProducts);
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

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> checkout(HttpServletRequest request, @RequestHeader("Authorization") String authHeader, @RequestBody Map<String, String> info) {
        Integer customerId = jwtUtil.extractAccountId(authHeader.replace("Bearer ", ""));
        Customer customer = customerRepository.findById(customerId).orElse(null);
        Cart cart = cartRepository.findByCustomer_id(customerId).orElse(null);
        try {
            Delivery delivery = new Delivery();
            delivery.setShippingAddress(info.get("shippingAddress"));
            delivery.setLname(info.get("lname"));
            delivery.setFname(info.get("fname"));
            delivery.setPhoneNumber(info.get("phoneNumber"));
            delivery = deliveryService.addDelivery(delivery);

            Order order = new Order();
            order.setOrderDate(LocalDate.now());
            order.setOrderStatus("pending");
            order.setTotalAmount(cart.getTotal_amount());
            order.setCustomer(customer);
            order.setDelivery(delivery);
            order = orderService.createOrder(order);

            List<CartDTO> cartItems = cartIncludesProductLineRepository.findByCustomerId(customerId);
            orderIncludesProductLineService.addFromCart(order.getOrderId(), cartItems);

            Payment payment = new Payment();
            payment.setMethod(info.get("paymentMethod"));
            payment.setPayment_status("pending");
            payment.setOrder(order);
            paymentService.addPayment(payment);

            cartRepository.delete(cart);
            cartIncludesProductLineService.deleteCartByCustomerId(customerId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Cart checked out successfully");

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error while checkout");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(400).body(errorResponse);
        }
    }
}
