// src/main/java/com/example/ppback/dto/ProductVariantDTO.java
package com.sany.ecombackend.dto;

import lombok.Data;

@Data
public class ProductVariantDTO {
    private Long id;
    private String size;
    private String color;
    private int stock;
}