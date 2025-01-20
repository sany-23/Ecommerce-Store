// src/main/java/com/example/ppback/entity/ProductVariant.java
package com.sany.ecombackend.entity;

import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String size;
    private String color;
    private int stock;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}