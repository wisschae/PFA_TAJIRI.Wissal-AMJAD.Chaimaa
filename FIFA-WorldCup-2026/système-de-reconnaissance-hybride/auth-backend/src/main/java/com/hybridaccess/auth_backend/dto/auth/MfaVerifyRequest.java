package com.hybridaccess.auth_backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for MFA verification.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MfaVerifyRequest {
    private String sessionId;
    private String factorType;  // "FACE", "OTP", etc.
    private String factorValue; // OTP code, etc.
    private String imageBase64; // For FACE factor - base64-encoded image
}
