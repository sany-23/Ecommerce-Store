// src/main/java/com/example/ppback/controller/RegistrationController.java
package com.sany.ecombackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sany.ecombackend.dto.RegistrationDTO;
import com.sany.ecombackend.dto.UserDTO;
import com.sany.ecombackend.entity.Cart;
import com.sany.ecombackend.entity.Role;
import com.sany.ecombackend.entity.User;
import com.sany.ecombackend.service.CartService;
import com.sany.ecombackend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationDTO registrationDTO) {
        if (userService.findByUsername(registrationDTO.getUsername()) != null) {
            return ResponseEntity.status(400).body(null);
        }

        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(registrationDTO.getPassword());
        user.setRole(Role.ROLE_CUSTOMER); // Assign default role

        User savedUser = userService.registerUser(user);

        // Create a cart for the new user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartService.saveCart(cart);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(savedUser.getId());
        userDTO.setUsername(savedUser.getUsername());
        userDTO.setEmail(savedUser.getEmail());

        return ResponseEntity.ok(userDTO);
    }
}