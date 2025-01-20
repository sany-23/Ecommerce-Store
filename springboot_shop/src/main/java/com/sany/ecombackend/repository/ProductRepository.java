// src/main/java/com/example/ppback/repository/ProductRepository.java
package com.sany.ecombackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.ProductVariant;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);

    Optional<ProductVariant> findVariantById(Long variantId);
}