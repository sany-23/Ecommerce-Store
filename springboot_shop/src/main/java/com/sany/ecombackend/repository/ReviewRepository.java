// src/main/java/com/example/ppback/repository/ReviewRepository.java
package com.sany.ecombackend.repository;

import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
}