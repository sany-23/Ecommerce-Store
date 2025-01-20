// src/main/java/com/example/ppback/controller/OrderTrackingController.java
package com.sany.ecombackend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sany.ecombackend.dto.CustomerOrderDTO;
import com.sany.ecombackend.entity.CustomerOrder;
import com.sany.ecombackend.exception.OrderNotFoundException;
import com.sany.ecombackend.service.OrderTrackingService;

@RestController
@RequestMapping("/api/orders")
public class OrderTrackingController {

    @Autowired
    private OrderTrackingService orderTrackingService;

    @GetMapping("/{orderId}")
    public CustomerOrderDTO getOrderById(@PathVariable Long orderId) {
        Optional<CustomerOrder> order = orderTrackingService.getOrderById(orderId);
        if (order.isPresent()) {
            return convertToDTO(order.get());
        } else {
            throw new OrderNotFoundException("Order not found with id: " + orderId);
        }
    }

    @PutMapping("/{orderId}/status")
    public CustomerOrderDTO updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        CustomerOrder updatedOrder = orderTrackingService.updateOrderStatus(orderId, status);
        return convertToDTO(updatedOrder);
    }

    private CustomerOrderDTO convertToDTO(CustomerOrder order) {
        CustomerOrderDTO customerOrderDTO = new CustomerOrderDTO();
        customerOrderDTO.setId(order.getId());
        customerOrderDTO.setStatus(order.getStatus().toString());
        customerOrderDTO.setPaymentStatus(order.getPaymentStatus());
        customerOrderDTO.setTrackingNumber(order.getTrackingNumber());
        // Set other fields accordingly
        return customerOrderDTO;
    }
}