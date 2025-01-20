// src/main/java/com/example/ppback/controller/CustomerOrderController.java
package com.sany.ecombackend.controller;

import com.sany.ecombackend.entity.CustomerOrder;
import com.sany.ecombackend.entity.OrderStatus;
import com.sany.ecombackend.service.CustomerOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class CustomerOrderController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerOrderController.class);

    @Autowired
    private CustomerOrderService customerOrderService;

    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return customerOrderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public CustomerOrder getOrderById(@PathVariable Long id) {
        return customerOrderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<CustomerOrder> getOrdersByUserId(@PathVariable Long userId) {
        return customerOrderService.getOrdersByUserId(userId);
    }

    @PostMapping
    public CustomerOrder createOrder(@RequestBody CustomerOrder customerOrder) {
        return customerOrderService.saveOrder(customerOrder);
    }

    @PutMapping("/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestParam("status") OrderStatus status) {
        logger.info("Received request to update order status: orderId={}, status={}", id, status);
        customerOrderService.updateOrderStatus(id, status);
    }
}
