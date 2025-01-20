package com.sany.ecombackend.dto;
import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private int quantity;

    // Getters and Setters
}
