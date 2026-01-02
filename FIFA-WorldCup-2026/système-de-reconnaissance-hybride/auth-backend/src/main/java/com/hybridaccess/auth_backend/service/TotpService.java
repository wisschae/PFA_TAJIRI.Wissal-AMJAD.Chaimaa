package com.hybridaccess.auth_backend.service;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Service pour gérer l'authentification TOTP (Time-based One-Time Password)
 * Compatible avec Google Authenticator, Authy, etc.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TotpService {

    private final GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();

    @Value("${app.name:HybridAccessSystem}")
    private String appName;

    /**
     * Génère un nouveau secret TOTP pour un utilisateur
     * 
     * @return Secret encodé en Base32
     */
    public String generateSecret() {
        GoogleAuthenticatorKey credentials = googleAuthenticator.createCredentials();
        String secret = credentials.getKey();
        log.info("Generated new TOTP secret");
        return secret;
    }

    /**
     * Génère l'URI pour le QR Code compatible avec Google Authenticator
     * 
     * @param userEmail Email de l'utilisateur
     * @param secret Secret TOTP
     * @return URI du QR Code (otpauth://totp/...)
     */
    public String generateQrCodeUri(String userEmail, String secret) {
        String uri = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
                appName,
                userEmail,
                new GoogleAuthenticatorKey.Builder(secret).build()
        );
        log.debug("Generated QR code URI for user: {}", userEmail);
        return uri;
    }

    /**
     * Valide un code OTP
     * 
     * @param secret Secret TOTP de l'utilisateur
     * @param code Code à 6 chiffres saisi par l'utilisateur
     * @return true si le code est valide
     */
    public boolean validateCode(String secret, String code) {
        try {
            int codeInt = Integer.parseInt(code);
            boolean isValid = googleAuthenticator.authorize(secret, codeInt);
            
            if (isValid) {
                log.info("OTP code validated successfully");
            } else {
                log.warn("Invalid OTP code provided");
            }
            
            return isValid;
        } catch (NumberFormatException e) {
            log.error("Invalid OTP code format: {}", code);
            return false;
        }
    }

    /**
     * Valide un code OTP en utilisant une fenêtre de temps plus large
     * Utile pour gérer le décalage horaire
     * 
     * @param secret Secret TOTP
     * @param code Code à valider
     * @return true si valide
     */
    public boolean validateCodeWithTolerance(String secret, String code) {
        try {
            int codeInt = Integer.parseInt(code);
            
            // Essaye le code actuel ± 1 fenêtre (30s avant/après)
            for (int i = -1; i <= 1; i++) {
                if (googleAuthenticator.authorize(secret, codeInt, System.currentTimeMillis() + (i * 30000L))) {
                    log.info("OTP code validated with tolerance (offset: {})", i);
                    return true;
                }
            }
            
            log.warn("Invalid OTP code (even with tolerance)");
            return false;
        } catch (NumberFormatException e) {
            log.error("Invalid OTP code format: {}", code);
            return false;
        }
    }
}
