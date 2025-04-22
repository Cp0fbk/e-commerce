package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
}
