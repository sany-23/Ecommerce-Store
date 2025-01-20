package com.sany.ecombackend.config;

import com.sany.ecombackend.entity.Role;
import com.sany.ecombackend.entity.User;
import com.sany.ecombackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Autowired
    private UserService userService;

    @Bean
    public ApplicationRunner initializer() {
        return args -> {
            if (userService.getAllUsers().isEmpty()) {
                User admin = new User();
                admin.setUsername("admin@em.com");
                admin.setPassword("admin");
                admin.setEmail("admin@em.com");
                admin.setRole(Role.ROLE_ADMIN);
                userService.saveUser(admin);
            }
        };
    }
}