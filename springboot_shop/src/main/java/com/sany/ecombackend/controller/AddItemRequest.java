package com.sany.ecombackend.controller;

import lombok.Data;

@Data
public class AddItemRequest {
    private Long productId;
    private int quantity;

    // Getters and Setters
}
