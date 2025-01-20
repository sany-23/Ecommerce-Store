// src/main/java/com/example/ppback/dto/CustomerOrderDTO.java
package com.sany.ecombackend.dto;

import java.util.Set;
import lombok.Data;

@Data
public class CustomerOrderDTO {
    private Long id;
    private UserDTO user;
    private Set<OrderItemDTO> items;
    private String status;
    private String paymentStatus;
    private String trackingNumber; // Add tracking number if needed
    private String contactNumber; // Add contact number
    private String deliveryAddress; // Add delivery address
}