// src/main/java/com/example/ppback/controller/ProductCategoryController.java
package com.sany.ecombackend.controller;

import com.sany.ecombackend.entity.ProductCategory;
import com.sany.ecombackend.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class ProductCategoryController {
    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return productCategoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ProductCategory getCategoryById(@PathVariable Long id) {
        return productCategoryService.getCategoryById(id);
    }

    @PostMapping
    public ProductCategory createCategory(@RequestBody ProductCategory category) {
        return productCategoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        productCategoryService.deleteCategory(id);
    }
}