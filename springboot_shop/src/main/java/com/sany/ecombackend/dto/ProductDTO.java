package com.sany.ecombackend.dto;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name should not exceed 100 characters")
    private String name;

    @NotBlank(message = "Description is mandatory")
    @Size(max = 500, message = "Description should not exceed 500 characters")
    private String description;

    @Min(value = 0, message = "Price should be positive")
    private double price;

    @NotBlank(message = "Image URL is mandatory")
    private String imageUrl;

    @NotNull(message = "Category ID is mandatory")
    private Long categoryId;

    @Min(value = 0, message = "Stock should be positive")
    private int stock;

    @Min(value = 0, message = "Rating should be positive")
    private int rating;

    @Min(value = 0, message = "Reviews should be positive")
    private int reviews;

    private List<ProductVariantDTO> variants;
}