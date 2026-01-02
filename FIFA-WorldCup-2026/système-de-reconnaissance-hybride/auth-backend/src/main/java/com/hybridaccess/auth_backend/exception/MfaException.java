package com.hybridaccess.auth_backend.exception;

/**
 * Exception levée lors d'un échec de vérification MFA.
 * 
 * Cette exception est utilisée pour indiquer qu'un facteur MFA (FACE, OTP, etc.)
 * n'a pas pu être vérifié avec succès, SANS invalider la session de l'utilisateur.
 * 
 * Contrairement à UnauthorizedException (401), cette exception retourne un code 400
 * pour permettre à l'utilisateur de rester sur la page MFA et réessayer.
 */
public class MfaException extends RuntimeException {
    
    public MfaException(String message) {
        super(message);
    }
    
    public MfaException(String message, Throwable cause) {
        super(message, cause);
    }
}
