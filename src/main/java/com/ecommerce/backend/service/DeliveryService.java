package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Delivery;
import com.ecommerce.backend.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    public Delivery addDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }
}
