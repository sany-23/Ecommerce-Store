// src/main/java/com/example/ppback/controller/AuthenticationController.java
package com.sany.ecombackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sany.ecombackend.dto.LoginDTO;
import com.sany.ecombackend.entity.User;
import com.sany.ecombackend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:53552" }, allowedHeaders = "*", maxAge = 3600)
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.findByUsername(loginDTO.getUsername());
        if (user != null && user.getPassword().equals(loginDTO.getPassword())) {
            loginDTO.setId(user.getId());
            loginDTO.setEmail(user.getEmail());
            loginDTO.setRole(user.getRole().name());
            return ResponseEntity.ok(loginDTO);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}