// src/main/java/com/example/ppback/exception/ProductNotFoundException.java
package com.sany.ecombackend.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String message) {
        super(message);
    }
}