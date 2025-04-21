package com.ecommerce.backend.service;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.repository.PaymentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PaymentService {
	private final PaymentRepository paymentRepository;

	public PaymentService(PaymentRepository paymentRepository) {
		this.paymentRepository = paymentRepository;
	}
	
	public Payment getPayment(Integer orderId) {
		Payment payment =  paymentRepository.findByOrderId(orderId);
		if (payment == null) {
			throw new EntityNotFoundException("Không tìm thấy thanh toán với orderId: " + orderId);
		}
		return payment;
	}

	public void deletePaymentByOrderId(Integer orderId) {
		if (!paymentRepository.existsById(orderId)) {
				throw new EntityNotFoundException("Không tìm thấy payment với orderId: " + orderId);
		}
		paymentRepository.deleteById(orderId);
	}
}
