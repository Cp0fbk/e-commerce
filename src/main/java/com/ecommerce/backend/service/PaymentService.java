package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.repository.PaymentRepository;
import com.ecommerce.backend.dtos.Payment.Request.CreatePaymentRequest;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.WebhookData;

@Service
public class PaymentService {

	private final PaymentRepository paymentRepository;
	private final OrderRepository orderRepository;
	private final PayOS payOS;


	public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository, PayOS payOS) {
		this.paymentRepository = paymentRepository;
		this.orderRepository = orderRepository;
		this.payOS = payOS;
	}

	public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
	
	public Payment getPayment(Integer orderId) {
		Payment payment =  paymentRepository.findByOrderId(orderId);
		if (payment == null) {
			throw new EntityNotFoundException("Không tìm thấy thanh toán với orderId: " + orderId);
		}
		return payment;
	}

	@Transactional
	public void deletePaymentByOrderId(Integer orderId) {
		if (!paymentRepository.existsById(orderId)) {
				throw new EntityNotFoundException("Không tìm thấy payment với orderId: " + orderId);
		}
		paymentRepository.deleteById(orderId);
	}

	@Transactional
	public CheckoutResponseData createPaymentLink(CreatePaymentRequest request) {
		Integer orderId = request.getOrderId();
		Order order = orderRepository.findById(orderId)
		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng với ID: " + request.getOrderId()));
			try {
				// Nếu request không đi kèm các url thì sử dụng mặc định
				String returnUrl = (request.getReturnUrl() != null && !request.getReturnUrl().isEmpty())
            ? request.getReturnUrl()
            : "http://localhost:8080/api/payment/success?paymentId=" + order.getOrderId();
				String cancelUrl = (request.getCancelUrl() != null && !request.getCancelUrl().isEmpty())
            ? request.getCancelUrl()
            : "http://localhost:8080/api/payment/cancel?paymentId=" + order.getOrderId();
				// Lưu order trước
				order.setOrderStatus("pending");
				order.setOrderDate(LocalDate.now());
				Order savedOrder = orderRepository.save(order);
				
				// Xử lí payment cũ nếu có
				Payment existingPaymentOpt = paymentRepository.findByOrderId(orderId);
				if (existingPaymentOpt != null){ 					
						if ("Completed".equalsIgnoreCase(existingPaymentOpt.getPaymentStatus())) {
								throw new IllegalStateException("Không thể tạo lại payment vì đơn hàng đã thanh toán thành công.");
						}
						// Xóa payment cũ (nếu không complete)
						paymentRepository.delete(existingPaymentOpt);
				}
			
				// Sinh mã PayOS orderCode mới
				long payosOrderCode = System.currentTimeMillis();

				// Lưu payment mới
				Payment payment = new Payment();
				payment.setOrder(savedOrder);
				payment.setPaymentStatus("pending");
				payment.setMethod("PayOS");
				payment.setPayOsOrderCode(payosOrderCode);
				paymentRepository.save(payment);
				
				// Tạo payment link với PayOS
				String description = "Thanh toán đơn hàng";
				int amount = savedOrder.getTotalAmount().intValue();
				
				ItemData item = ItemData.builder()
								.name("Đơn hàng #" + savedOrder.getOrderId())
								.price(amount)
								.quantity(1)
								.build();
				
				PaymentData paymentData = PaymentData.builder()
								.orderCode(payosOrderCode) 
								.amount(amount)
								.description(description)
								.returnUrl(returnUrl)
								.cancelUrl(cancelUrl)
								.item(item)
								.build();
				
				return payOS.createPaymentLink(paymentData);
			} catch (Exception e) {
					throw new RuntimeException("Không thể tạo payment link: " + e.getMessage(), e);
			}
	}
	
	public void handlePaymentWebhook(WebhookData webhookData) {
		try {
				// Lấy order code và status từ webhook data
				Integer orderId = Integer.valueOf(webhookData.getOrderCode().toString());
				String status = webhookData.getDesc();
				
				// Cập nhật trạng thái payment
				Payment payment = paymentRepository.findById(orderId)
								.orElseThrow(() -> new RuntimeException("Không tìm thấy payment với id " + orderId));
				
				if ("PAID".equals(status)) {
						payment.setPaymentStatus("completed");
						payment.setPaymentDate(LocalDate.now());
						
						// Cập nhật trạng thái order
						Order order = payment.getOrder();
						order.setOrderStatus("processing");
						orderRepository.save(order);
				} else if ("CANCELLED".equals(status)) {
						payment.setPaymentStatus("pending");
				}
				paymentRepository.save(payment);
		} catch (Exception e) {
				throw new RuntimeException("Lỗi xử lý webhook: " + e.getMessage(), e);
		}
	}

	// Xử lý cập nhật trạng thái thanh toán thành công
	public Map<String, Object> handlePaymentSuccess(Integer orderId) {
			Map<String, Object> response = new HashMap<>();
			try {
				Payment payment = paymentRepository.findByOrderId(orderId);
				if (payment == null) {
					throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy payment với id" + orderId);
				}

				payment.setPaymentStatus("completed");
				payment.setPaymentDate(LocalDate.now());
				paymentRepository.save(payment);
				
				response.put("status", "success");
				response.put("message", "Thanh toán thành công");
				response.put("paymentId", orderId);
			} catch (Exception e) {
				response.put("status", "error");
				response.put("message", "Lỗi cập nhật paymentStatus: " + e.getMessage());
			}
			return response;
	}

	// Xử lý cập nhật trạng thái thanh toán thành hủy
	public Map<String, Object> handlePaymentCancel(Integer orderId) {
			Map<String, Object> response = new HashMap<>();
			try {
				Payment payment = paymentRepository.findByOrderId(orderId);
				if (payment == null) {
					throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy payment với id" + orderId);
				}

				payment.setPaymentStatus("pending");
				paymentRepository.save(payment);

				response.put("status", "cancelled");
				response.put("message", "Thanh toán đã bị hủy");
				response.put("paymentId", orderId);
			} catch (Exception e) {
				response.put("status", "error");
				response.put("message", "Lỗi cập nhật paymentStatus: " + e.getMessage());
			}
			return response;
	}
}
