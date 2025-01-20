// src/main/java/com/example/ppback/service/OrderTrackingService.java
package com.sany.ecombackend.service;

import com.sany.ecombackend.entity.CustomerOrder;
import com.sany.ecombackend.entity.OrderStatus;
import com.sany.ecombackend.exception.OrderNotFoundException;
import com.sany.ecombackend.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderTrackingService {

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    public Optional<CustomerOrder> getOrderById(Long orderId) {
        return customerOrderRepository.findById(orderId);
    }

    public CustomerOrder updateOrderStatus(Long orderId, String status) {
        Optional<CustomerOrder> orderOpt = customerOrderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            CustomerOrder order = orderOpt.get();
            order.setStatus(OrderStatus.valueOf(status));
            return customerOrderRepository.save(order);
        } else {
            throw new OrderNotFoundException("Order not found with id: " + orderId);
        }
    }
}