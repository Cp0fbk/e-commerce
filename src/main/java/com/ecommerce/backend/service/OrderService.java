package com.ecommerce.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.dtos.Order.Response.GetOrderResponse;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
            this.orderRepository = orderRepository;
    }

    public Page<GetOrderResponse> getOrdersByUserId(Integer accountId, Pageable page) {
        return orderRepository.findByCustomer_Account_AccountId(accountId, page)
                        .map(order -> new GetOrderResponse(
                                        order.getOrderId(),
                                        order.getOrderDate(),
                                        order.getOrderStatus(),
                                        order.getTotalAmount()
                        ));
    }

    public Order getOrderById(Integer orderId) {
            return orderRepository.findByOrderId(orderId).
                orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Transactional
    public void deleteOrderById(Integer orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new EntityNotFoundException("Không tìm thấy order với orderId: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}

