package com.sany.ecombackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PpbackApplication {

    public static void main(String[] args) {
        SpringApplication.run(PpbackApplication.class, args);
    }

}
