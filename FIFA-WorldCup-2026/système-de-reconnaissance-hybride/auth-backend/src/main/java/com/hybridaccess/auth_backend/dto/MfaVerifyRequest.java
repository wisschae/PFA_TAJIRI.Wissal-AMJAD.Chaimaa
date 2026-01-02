package com.hybridaccess.auth_backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

/**
 * Request to verify an MFA factor (OTP or FACE)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MfaVerifyRequest {
    
    /**
     * MFA session ID (from login response or resource access attempt)
     */
    private UUID mfaSessionId;
    
    /**
     * Type of factor being verified: "OTP" or "FACE"
     */
    private String factorType;
    
    /**
     * For OTP: the 6-digit code
     */
    private String otpCode;
    
    /**
     * For FACE: base64-encoded image
     */
    private String imageBase64;
}
