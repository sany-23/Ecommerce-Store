// src/main/java/com/example/ppback/service/CustomerOrderService.java
package com.sany.ecombackend.service;

import com.sany.ecombackend.entity.CustomerOrder;
import com.sany.ecombackend.entity.OrderItem;
import com.sany.ecombackend.entity.OrderStatus;
import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.User;
import com.sany.ecombackend.repository.CustomerOrderRepository;
import com.sany.ecombackend.repository.ProductRepository;
import com.sany.ecombackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomerOrderService {
    private static final Logger logger = LoggerFactory.getLogger(CustomerOrderService.class);

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CustomerOrder> getAllOrders() {
        return customerOrderRepository.findAll();
    }

    public CustomerOrder getOrderById(Long id) {
        return customerOrderRepository.findById(id).orElse(null);
    }

    public List<CustomerOrder> getOrdersByUserId(Long userId) {
        return customerOrderRepository.findByUserId(userId);
    }

    public CustomerOrder saveOrder(CustomerOrder customerOrder) {
        if (customerOrder.getUser() == null || customerOrder.getUser().getId() == null) {
            throw new RuntimeException("User information is missing in the order");
        }

        Optional<User> userOptional = userRepository.findById(customerOrder.getUser().getId());
        if (userOptional.isPresent()) {
            customerOrder.setUser(userOptional.get());
        } else {
            throw new RuntimeException("User not found");
        }

        Set<OrderItem> orderItems = new HashSet<>();
        for (OrderItem item : customerOrder.getItems()) {
            Optional<Product> productOptional = productRepository.findById(item.getProduct().getId());
            if (productOptional.isPresent()) {
                item.setProduct(productOptional.get());
                item.setCustomerOrder(customerOrder);
                orderItems.add(item);
            } else {
                throw new RuntimeException("Product not found");
            }
        }
        customerOrder.setItems(orderItems);
        customerOrder.setStatus(OrderStatus.AWAITING_DELIVERY);
        customerOrder.setTrackingNumber("123");

        return customerOrderRepository.save(customerOrder);
    }

    public void updateOrderStatus(Long id, OrderStatus status) {
        logger.info("Updating order status: orderId={}, status={}", id, status);
        CustomerOrder order = customerOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        customerOrderRepository.save(order);
    }
}