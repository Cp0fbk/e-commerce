package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dtos.Order.OrderDetailDto;
import com.ecommerce.backend.dtos.Order.OrderDetailDtoConverter;
import com.ecommerce.backend.dtos.Order.Response.GetOrderResponse;
import com.ecommerce.backend.response.ApiResponse;
import com.ecommerce.backend.service.OrderService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/orders")
public class OrderController {
	private final OrderService orderService;
	private final OrderDetailDtoConverter orderDetailDtoConverter;

	public OrderController(OrderService orderService, OrderDetailDtoConverter orderDetailDtoConverter) {
		this.orderService = orderService;
		this.orderDetailDtoConverter = orderDetailDtoConverter;
	}

	@GetMapping("/get-user-orders")
	public ResponseEntity<ApiResponse<Page<GetOrderResponse>>> getOrdersByUserId(
					@RequestParam Integer accountId,
					@RequestParam(defaultValue = "0") int page) {
			try {
					int pageSize = 10;
					Pageable pageable = PageRequest.of(page, pageSize, Sort.by("orderDate").descending());
					Page<GetOrderResponse> orders = orderService.getOrdersByUserId(accountId, pageable);

					ApiResponse<Page<GetOrderResponse>> response = new ApiResponse<>(HttpStatus.OK.value(), "Get orders successfully", orders);
					return ResponseEntity.ok(response);
			} catch (Exception e) {
					ApiResponse<Page<GetOrderResponse>> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
					return ResponseEntity.status(500).body(response);
			}
	}
	
	@GetMapping("/get-order/{orderId}")
	public ResponseEntity<ApiResponse<OrderDetailDto>> getOrderById(@PathVariable Integer orderId) {
		try {
			OrderDetailDto order = orderDetailDtoConverter.convert(orderService.getOrderById(orderId));
			if (order != null) {
				ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.OK.value(), "Get order successfully", order);
				return ResponseEntity.ok(response);
			} else {
				ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Order not found", null);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			ApiResponse<OrderDetailDto> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
}
