package com.sany.ecombackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sany.ecombackend.dto.ProductDTO;
import com.sany.ecombackend.entity.Product;
import com.sany.ecombackend.entity.ProductCategory;
import com.sany.ecombackend.service.ProductCategoryService;
import com.sany.ecombackend.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @PostMapping
    public Product createProduct(@Validated @RequestBody ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImageUrl(productDTO.getImageUrl());
        product.setStock(productDTO.getStock());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        return productService.saveProduct(product, productDTO.getCategoryId());
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/paginated")
    public Page<Product> getPaginatedProducts(@RequestParam int page, @RequestParam int size) {
        return productService.getPaginatedProducts(page, size);
    }

    @GetMapping("/paginated-sorted")
    public Page<Product> getPaginatedAndSortedProducts(@RequestParam int page, @RequestParam int size,
            @RequestParam String sortBy) {
        return productService.getPaginatedAndSortedProducts(page, size, sortBy);
    }

//    @GetMapping("/search")
//    public List<Product> searchProducts(@RequestParam String keyword) {
//        return productService.searchProducts(keyword);
//    }

    @PutMapping("/{id}/stock")
    public void updateStock(@PathVariable Long id, @RequestParam int stock) {
        productService.updateStock(id, stock);
    }

    @PutMapping("/variants/{variantId}/stock")
    public void updateVariantStock(@PathVariable Long variantId, @RequestParam int stock) {
        productService.updateVariantStock(variantId, stock);
    }

    @GetMapping("/categories")
    public List<ProductCategory> getAllCategories() {
        return productCategoryService.getAllCategories();
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @Validated @RequestBody ProductDTO productDTO) {
        return productService.updateProduct(id, productDTO);
    }

    @PutMapping("/{productId}/stock")
    public ResponseEntity<Void> updateStock(@PathVariable Long productId, @RequestBody Map<String, Integer> request) {
        int quantity = request.get("quantity");
        productService.updateStock(productId, quantity);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId
    ) {
        return productService.searchProducts(
                keyword == null ? "" : keyword, categoryId
        );
    }
}