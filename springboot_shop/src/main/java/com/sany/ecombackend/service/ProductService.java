package com.sany.ecombackend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.sany.ecombackend.dto.ProductDTO;
import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.ProductCategory;
import com.sany.ecombackend.entity.ProductVariant;
import com.sany.ecombackend.exception.ProductNotFoundException;
import com.sany.ecombackend.repository.ProductCategoryRepository;
import com.sany.ecombackend.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product saveProduct(Product product, Long categoryId) {
        ProductCategory category = productCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ProductNotFoundException("Category not found with id: " + categoryId));
        product.setCategory(category);
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public Page<Product> getPaginatedProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size));
    }

    public Page<Product> getPaginatedAndSortedProducts(int page, int size, String sortBy) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingOrDescriptionContaining(keyword, keyword);
    }

    public void updateStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    public void updateVariantStock(Long variantId, int stock) {
        ProductVariant variant = productRepository.findVariantById(variantId)
                .orElseThrow(() -> new ProductNotFoundException("Variant not found with id: " + variantId));
        variant.setStock(stock);
        productRepository.save(variant.getProduct());
    }

    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImageUrl(productDTO.getImageUrl());
        product.setStock(productDTO.getStock());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());

        ProductCategory category = productCategoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ProductNotFoundException(
                        "Category not found with id: " + productDTO.getCategoryId()));
        product.setCategory(category);

        return productRepository.save(product);
    }

    public List<Product> searchProducts(String keyword, Long categoryId) {
        if (categoryId == null) {
            return productRepository.findByNameContainingOrDescriptionContaining(keyword, keyword);
        } else {
            // Either define a custom repo method to handle both OR filter results in memory:
            List<Product> filtered = productRepository.findByNameContainingOrDescriptionContaining(keyword, keyword);
            return filtered.stream()
                    .filter(p -> p.getCategory().getId().equals(categoryId))
                    .collect(Collectors.toList());
        }
    }
}