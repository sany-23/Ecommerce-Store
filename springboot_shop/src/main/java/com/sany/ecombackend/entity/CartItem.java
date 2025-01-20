// src/main/java/com/sany/ecombackend/entity/CartItem.java
package com.sany.ecombackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    // New fields
    private double discountPercentage; // e.g., 0.10 for 10%
    private double discountAmount; // e.g., 5.00 means $5.00 discount

    // Existing discount field if still needed
    private double discount;
}