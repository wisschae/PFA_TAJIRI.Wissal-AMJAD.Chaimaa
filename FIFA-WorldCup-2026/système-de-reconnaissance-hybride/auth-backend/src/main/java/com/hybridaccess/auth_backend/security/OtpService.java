package com.hybridaccess.auth_backend.security;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.stereotype.Service;

/**
 * Service pour génération et vérification OTP TOTP (Google Authenticator).
 * Utilise la bibliothèque GoogleAuth de Warren Strange.
 */
@Service
public class OtpService {

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    /**
     * Génère un secret Base32 aléatoire pour un nouvel utilisateur.
     * 
     * @return Secret encodé en Base32
     */
    public String generateBase32Secret() {
        GoogleAuthenticatorKey key = gAuth.createCredentials();
        return key.getKey();
    }

    /**
     * Vérifie un code OTP 6-chiffres.
     * Tolère automatiquement ±30 secondes (configuration par défaut).
     * 
     * @param base32Secret Le secret Base32 de l'utilisateur
     * @param code Le code 6-chiffres fourni
     * @return true si valide
     */
    public boolean verifyCode(String base32Secret, String code) {
        try {
            if (base32Secret == null || base32Secret.isBlank()) return false;
            if (code == null || !code.matches("\\d{6}")) return false;

            int codeInt = Integer.parseInt(code);
            return gAuth.authorize(base32Secret, codeInt);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     * Construit l'URI otpauth://totp/... pour QR code.
     * 
     * @param issuer Nom de l'application (ex: "HybridAccess")
     * @param email Email de l'utilisateur
     * @param base32Secret Secret Base32
     * @return URI compatible Google Authenticator
     */
    public String buildOtpAuthUri(String issuer, String email, String base32Secret) {
        return GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
            issuer,
            email,
            new GoogleAuthenticatorKey.Builder(base32Secret).build()
        );
    }
}
