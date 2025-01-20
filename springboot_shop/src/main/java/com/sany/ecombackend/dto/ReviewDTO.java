// src/main/java/com/example/ppback/dto/ReviewDTO.java
package com.sany.ecombackend.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private String comment;
    private int rating;
    private Long productId;
    private Long userId;
}