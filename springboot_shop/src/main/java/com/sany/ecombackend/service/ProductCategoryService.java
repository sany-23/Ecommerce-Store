package com.sany.ecombackend.service;

import com.sany.ecombackend.entity.ProductCategory;
import com.sany.ecombackend.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductCategoryService {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> getAllCategories() {
        return productCategoryRepository.findAll();
    }

    public ProductCategory getCategoryById(Long id) {
        return productCategoryRepository.findById(id).orElse(null);
    }

    public Optional<ProductCategory> getCategoryByName(String name) {
        return productCategoryRepository.findByName(name);
    }

    public ProductCategory saveCategory(ProductCategory category) {
        return productCategoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        productCategoryRepository.deleteById(id);
    }
}