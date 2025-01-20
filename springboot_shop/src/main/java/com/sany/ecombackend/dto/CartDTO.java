package com.sany.ecombackend.dto;

import java.util.Set;
import lombok.Data;

@Data
public class CartDTO {
    private Long id;
    private UserDTO user;
    private Set<CartItemDTO> items;

    // Getters and Setters
}
