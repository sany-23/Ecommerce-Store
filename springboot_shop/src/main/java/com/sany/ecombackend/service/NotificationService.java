// src/main/java/com/example/ppback/service/NotificationService.java
package com.sany.ecombackend.service;

import com.sany.ecombackend.entity.CustomerOrder;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    public void sendOrderStatusUpdate(CustomerOrder order) {
        // Logic to send notification (e.g., email, SMS) to the user
        System.out.println("Order status updated: " + order.getStatus());
    }
}