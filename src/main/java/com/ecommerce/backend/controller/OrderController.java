package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Order.OrderDetailDto;
import com.ecommerce.backend.dtos.Order.OrderDetailDtoConverter;
import com.ecommerce.backend.dtos.Order.Response.GetOrderResponse;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/orders")
@Validated
public class OrderController {
	private final OrderService orderService;
	private final PaymentService paymentService;
	private final OrderDetailDtoConverter orderDetailDtoConverter;

	public OrderController(OrderService orderService, PaymentService paymentService,
												OrderDetailDtoConverter orderDetailDtoConverter) {
		this.orderService = orderService;
		this.paymentService = paymentService;
		this.orderDetailDtoConverter = orderDetailDtoConverter;
	}

	@Operation(description = "Lấy thông tin các đơn hàng của người dùng")
	@GetMapping("/get-user-orders")
	public ResponseEntity<ApiResponse<Page<GetOrderResponse>>> getOrdersByUserId(
					@RequestParam Integer accountId,
					@RequestParam(defaultValue = "0") int page) {
			try {
					int pageSize = 10;
					Pageable pageable = PageRequest.of(page, pageSize, Sort.by("orderDate").descending());
					Page<GetOrderResponse> orders = orderService.getOrdersByUserId(accountId, pageable);

					ApiResponse<Page<GetOrderResponse>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get orders successfully", orders);
					return new ResponseEntity<>(response, HttpStatus.OK);
			} catch (Exception e) {
					ApiResponse<Page<GetOrderResponse>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}
	}
	

	@Operation(description = "Lấy thông tin của một đơn hàng của người dùng")
	@GetMapping("/get-order/{orderId}")
	public ResponseEntity<ApiResponse<OrderDetailDto>> getOrderById(@PathVariable Integer orderId) {
		try {
			OrderDetailDto order = orderDetailDtoConverter.convert(orderService.getOrderById(orderId));
			ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.OK.value(), "Get order successfully", order);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}	catch(EntityNotFoundException e) {
			ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@Operation(description = "Xóa một đơn hàng của người dùng")
	@DeleteMapping("/delete-order/{orderId}")
	public ResponseEntity<ApiResponse<OrderDto>> deleteOrder(@PathVariable Integer orderId) {
		try {
			paymentService.deletePaymentByOrderId(orderId);
			orderService.deleteOrderById(orderId);
			ApiResponse<OrderDto> response = new ApiResponse<>(HttpStatus.OK.value(), "Delete order successfully", null);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			ApiResponse<OrderDto> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			ApiResponse<OrderDto> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
}
