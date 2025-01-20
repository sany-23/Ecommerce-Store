package com.sany.ecombackend.controller;

import lombok.Data;

@Data
public class UpdateItemRequest {
    private Long productId;
    private int quantity;

    // Getters and Setters
}