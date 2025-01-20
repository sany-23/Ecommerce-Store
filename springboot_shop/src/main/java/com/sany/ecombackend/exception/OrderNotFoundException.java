// src/main/java/com/example/ppback/exception/OrderNotFoundException.java
package com.sany.ecombackend.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String message) {
        super(message);
    }
}