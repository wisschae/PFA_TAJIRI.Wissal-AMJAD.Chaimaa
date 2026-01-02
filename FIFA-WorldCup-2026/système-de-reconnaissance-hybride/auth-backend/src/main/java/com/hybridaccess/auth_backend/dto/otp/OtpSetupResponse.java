package com.hybridaccess.auth_backend.dto.otp;

/**
 * Réponse du setup OTP contenant le secret et l'URI QR.
 */
public record OtpSetupResponse(String secret, String otpauthUri) {
}
