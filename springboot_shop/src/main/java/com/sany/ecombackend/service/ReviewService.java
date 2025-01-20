// src/main/java/com/example/ppback/service/ReviewService.java
package com.sany.ecombackend.service;

import com.sany.ecombackend.dto.ReviewDTO;
import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.Review;
import com.sany.ecombackend.entity.User;
import com.sany.ecombackend.exception.ProductNotFoundException;
import com.sany.ecombackend.exception.UserNotFoundException;
import com.sany.ecombackend.repository.ProductRepository;
import com.sany.ecombackend.repository.ReviewRepository;
import com.sany.ecombackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Review addReview(Long productId, ReviewDTO reviewDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + reviewDTO.getUserId()));

        Review review = new Review();
        review.setComment(reviewDTO.getComment());
        review.setRating(reviewDTO.getRating());
        review.setProduct(product);
        review.setUser(user);

        return reviewRepository.save(review);
    }

    public List<Review> getReviews(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        return reviewRepository.findByProduct(product);
    }
}