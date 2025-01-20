// src/main/java/com/example/ppback/entity/PromotionalCode.java
package com.sany.ecombackend.entity;

import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PromotionalCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private double discount; // Discount percentage (e.g., 0.1 for 10%)
    private boolean active;
}
