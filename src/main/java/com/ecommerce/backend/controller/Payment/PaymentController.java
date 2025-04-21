package com.ecommerce.backend.controller.Payment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Payment.PaymentDto;
import com.ecommerce.backend.dtos.Payment.PaymentDtoConverter;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.PaymentService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	private final PaymentService paymentService;
	private final PaymentDtoConverter paymentDtoConverter;

	public PaymentController(PaymentService paymentService, PaymentDtoConverter paymentDtoConverter) {
		this.paymentService = paymentService;
		this.paymentDtoConverter = paymentDtoConverter;
	}

	@GetMapping("/get-payment")
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

	@DeleteMapping("/delete-payment")
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
	
}
