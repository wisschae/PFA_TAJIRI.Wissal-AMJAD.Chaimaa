package com.hybridaccess.auth_backend.exception;

/**
 * Exception lancée lors d'opérations non autorisées.
 */
public class UnauthorizedException extends RuntimeException {
    
    public UnauthorizedException(String message) {
        super(message);
    }
}
