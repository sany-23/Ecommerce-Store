package com.sany.ecombackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sany.ecombackend.entity.Cart;
import com.sany.ecombackend.service.CartService;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:53552" }) // Add your Angular and Flutter origins
                                                                              // here
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/user/{userId}/items")
    public Cart addItemToCart(@PathVariable Long userId, @RequestBody AddItemRequest request) {
        return cartService.addItemToCart(userId, request.getProductId(), request.getQuantity());
    }

    @PutMapping("/user/{userId}/items")
    public Cart updateItemQuantity(@PathVariable Long userId, @RequestBody UpdateItemRequest request) {
        return cartService.updateItemQuantity(userId, request.getProductId(), request.getQuantity());
    }

    @DeleteMapping("/user/{userId}/items/{productId}")
    public Cart removeItemFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        return cartService.removeItemFromCart(userId, productId);
    }

    @GetMapping("/user/{userId}/total-price")
    public double getTotalPrice(@PathVariable Long userId) {
        return cartService.getTotalPrice(userId);
    }

    @GetMapping("/user/{userId}/items/{productId}/subtotal")
    public double getItemSubtotal(@PathVariable Long userId, @PathVariable Long productId) {
        return cartService.getItemSubtotal(userId, productId);
    }

    @DeleteMapping("/user/{userId}/items")
    public void clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
    }
}