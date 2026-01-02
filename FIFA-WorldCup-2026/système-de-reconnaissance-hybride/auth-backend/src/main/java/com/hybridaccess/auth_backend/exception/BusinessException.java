package com.hybridaccess.auth_backend.exception;

/**
 * Exception lancée lors de violation de règles métier.
 */
public class BusinessException extends RuntimeException {
    
    public BusinessException(String message) {
        super(message);
    }
}
