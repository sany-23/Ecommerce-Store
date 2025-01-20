// src/main/java/com/sany/ecombackend/controller/PromotionalCodeController.java
package com.sany.ecombackend.controller;

import com.sany.ecombackend.entity.PromotionalCode;
import com.sany.ecombackend.repository.PromotionalCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/promo-codes")
public class PromotionalCodeController {

    @Autowired
    private PromotionalCodeRepository promoCodeRepository;

    // Existing validatePromoCode endpoint
    @GetMapping("/{code}")
    public ResponseEntity<Double> validatePromoCode(@PathVariable String code) {
        PromotionalCode promo = promoCodeRepository.findByCodeAndActiveTrue(code)
                .orElse(null);
        if (promo == null) {
            return ResponseEntity.ok(0.0);
        }
        return ResponseEntity.ok(promo.getDiscount());
    }

    // New endpoint: Add promo code
    @PostMapping
    public ResponseEntity<PromotionalCode> createPromoCode(@RequestBody PromotionalCode promo) {
        PromotionalCode savedCode = promoCodeRepository.save(promo);
        return ResponseEntity.ok(savedCode);
    }

    // New endpoint: Remove promo code by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromoCode(@PathVariable Long id) {
        promoCodeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}