package com.ecommerce.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Payment.PaymentDto;
import com.ecommerce.backend.dtos.Payment.PaymentDtoConverter;
import com.ecommerce.backend.dtos.Payment.Request.CreatePaymentRequest;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.PaymentService;
import com.fasterxml.jackson.databind.node.ObjectNode;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.Webhook;
import vn.payos.type.WebhookData;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/payment")
@Tag(name = "Payment")
@Validated
public class PaymentController {
	private final PaymentService paymentService;
	private final PaymentDtoConverter paymentDtoConverter;
	private final PayOS payOS;
	private final ObjectMapper objectMapper;

	public PaymentController(PaymentService paymentService,
													PaymentDtoConverter paymentDtoConverter,PayOS payOS,
													ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
		this.paymentService = paymentService;
		this.paymentDtoConverter = paymentDtoConverter;
		this.payOS = payOS;
		
	}

	@Operation(description = "Lấy thông tin thanh toán cho đơn hàng")
	@GetMapping("/get-payment")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<ApiResponse<PaymentDto>> getPayment(@RequestParam Integer orderId) {
		try {
			PaymentDto paymentDto = paymentDtoConverter.convert(paymentService.getPayment(orderId));
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.OK.value(), "Paymet retrieved",
				paymentDto);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(),
				null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve payment",
				null);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(description = "Xóa thông tin thanh toán cho đơn hàng")
	@DeleteMapping("/delete-payment")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<ApiResponse<PaymentDto>> deletePayment(@RequestParam Integer orderId) {
		try {
			paymentService.deletePaymentByOrderId(orderId);
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.OK.value(), "Payment deleted successfully", null);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			ApiResponse<PaymentDto> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to delete payment",
				null);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Hidden
	@PostMapping(path = "/payos-webhook")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ObjectNode paymentWebhookHandler(@RequestBody ObjectNode body) {
			ObjectMapper objectMapper = new ObjectMapper();
			ObjectNode response = objectMapper.createObjectNode();
			try {
					// Xác thực và đọc dữ liệu webhook
					Webhook webhookBody = objectMapper.treeToValue(body, Webhook.class);
					WebhookData data = payOS.verifyPaymentWebhookData(webhookBody);
					
					// Xử lý dữ liệu thanh toán
					paymentService.handlePaymentWebhook(data);
					
					response.put("error", 0);
					response.put("message", "Webhook xử lý thành công");
					response.set("data", null);
					return response;
			} catch (Exception e) {
					e.printStackTrace();
					response.put("error", -1);
					response.put("message", e.getMessage());
					response.set("data", null);
					return response;
			}
	}

	// Kiểm tra trạng thái thanh toán của đơn hàng trên PayOS
	@Operation(description = "Kiểm tra trạng thái thanh toán cho đơn hàng trên PayOS")
	@GetMapping("/check/{orderId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ObjectNode checkPaymentStatus(@PathVariable Integer orderId) {
			ObjectMapper objectMapper = new ObjectMapper();
			ObjectNode response = objectMapper.createObjectNode();
			Payment payment = paymentService.getPayment(orderId);
			try {
					// Kiểm tra thông tin payment qua PayOS API
					Long payosOrderCode = payment.getPayOsOrderCode();
					var paymentInfo = payOS.getPaymentLinkInformation(payosOrderCode);
					
					response.put("error", 0);
					response.put("message", "success");
					response.set("data", objectMapper.valueToTree(paymentInfo));
					return response;
			} catch (Exception e) {
					e.printStackTrace();
					response.put("error", -1);
					response.put("message", e.getMessage());
					response.set("data", null);
					return response;
			}
	}

	// Tạo payment link cho đơn hàng
	@Operation(description = "Tạo payment link cho đơn hàng. Fe cần truyền returnUrl và cancelUrl để xử lý callback khi người dùng thanh toán thành công hoặc hủy thanh toán")
	@PostMapping("/create")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ObjectNode createPaymentForOrder(@RequestBody @Valid CreatePaymentRequest request) {
			
			ObjectNode response = objectMapper.createObjectNode();
			try {
					// Tạo payment link
					CheckoutResponseData paymentData = paymentService.createPaymentLink(request);
					
					response.put("error", 0);
					response.put("message", "Tạo payment link thành công");
					response.set("data", objectMapper.valueToTree(paymentData));
					return response;
			} catch (Exception e) {
					e.printStackTrace();
					response.put("error", -1);
					response.put("message", e.getMessage());
					response.set("data", null);
					return response;
			}
	}

	// Fe cần gọi api này khi người dùng thanh toán thành công
	// Api đồng thời đuợc gọi từ PayOS khi thanh toán thành công nếu Fe không truyền returnUrl
	@Operation(description = "Fe cần gọi api này khi người dùng thanh toán thành công")
	@GetMapping("/success")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<Map<String, Object>> handleSuccess(
					@RequestParam(required = false) Integer paymentId) {
		Map<String, Object> response = new HashMap<>();
		try {
				response = paymentService.handlePaymentSuccess(paymentId);
				return ResponseEntity.ok(response);
		} catch (Exception e) {
				response.put("status", "error");
				response.put("message", "Lỗi cập nhật paymentStatus: " + e.getMessage());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
   
	// Fe cần gọi api này khi người dùng thanh toán bị hủy
	// Api đồng thời đuợc gọi từ PayOS khi thanh toán bị hủy nếu Fe không truyền cancelUrl
	@Operation(description = "Fe cần gọi api này khi người dùng thanh toán bị hủy")
	@GetMapping("/cancel")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<Map<String, Object>> handleCancel(
					@RequestParam(required = false) Integer paymentId) {
		Map<String, Object> response = new HashMap<>();
		try {
				response = paymentService.handlePaymentCancel(paymentId);
				return ResponseEntity.ok(response);
		} catch (Exception e) {
				response.put("status", "error");
				response.put("message", "Lỗi cập nhật paymentStatus: " + e.getMessage());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
}
