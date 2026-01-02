package com.hybridaccess.auth_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request pour vérifier un code OTP lors du setup
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyOtpSetupRequest {
    
    @NotBlank(message = "Secret is required")
    private String secret;
    
    @NotBlank(message = "Code is required")
    @Size(min = 6, max = 6, message = "Code must be exactly 6 digits")
    private String code;
}
