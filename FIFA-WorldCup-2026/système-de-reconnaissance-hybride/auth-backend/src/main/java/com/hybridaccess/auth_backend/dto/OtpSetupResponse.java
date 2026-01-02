package com.hybridaccess.auth_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response pour la configuration initiale de l'OTP
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpSetupResponse {
    private String secret;      // Secret Base32
    private String qrCodeUri;   // URI pour générer le QR code
    private String email;       // Email de l'utilisateur
}
