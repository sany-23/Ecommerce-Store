// src/main/java/com/example/ppback/dto/LoginDTO.java
package com.sany.ecombackend.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
    private Long id;
    private String email;
    private String role;
}