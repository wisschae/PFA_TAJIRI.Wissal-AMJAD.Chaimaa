package com.hybridaccess.auth_backend.dto.otp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Requête pour activer OTP avec validation du code.
 */
public record OtpEnableRequest(
        @NotBlank(message = "Le code OTP est requis")
        @Pattern(regexp = "\\d{6}", message = "Le code OTP doit être composé de 6 chiffres")
        String code
) {
}
