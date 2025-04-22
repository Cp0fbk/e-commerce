package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import com.ecommerce.backend.model.OrderIncludesProductLine;
import com.ecommerce.backend.model.OrderIncludesProductLineId;
import com.ecommerce.backend.repository.OrderIncludesProductLineRepository;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderIncludesProductLineService {
    @Autowired
    private OrderIncludesProductLineRepository orderIncludesProductLineRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductLineRepository productLineRepository;

    public void addFromCart(Integer orderId, List<CartDTO> cartProducts) {
        for (CartDTO cartDTO: cartProducts) {
            OrderIncludesProductLine orderIncludesProductLine = new OrderIncludesProductLine();
            OrderIncludesProductLineId id = new OrderIncludesProductLineId();
            id.setOrder_id(orderId);
            id.setProduct_line_id(cartDTO.getProductId().getId());
            orderIncludesProductLine.setId(id);
            orderIncludesProductLine.setPrice(cartDTO.getPrice());
            orderIncludesProductLine.setQuantity(cartDTO.getQuantity());
            orderIncludesProductLine.setOrder_id(orderRepository.findByOrderId(orderId).orElse(null));
            orderIncludesProductLine.setProduct_line_id(productLineRepository.findById(cartDTO.getProductId().getId()).orElse(null));
            orderIncludesProductLineRepository.save(orderIncludesProductLine);
        }
    }
}
