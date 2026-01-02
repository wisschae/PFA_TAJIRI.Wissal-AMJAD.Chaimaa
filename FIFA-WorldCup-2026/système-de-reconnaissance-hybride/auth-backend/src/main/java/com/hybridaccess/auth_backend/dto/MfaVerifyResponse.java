package com.hybridaccess.auth_backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

/**
 * Response from MFA verification
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MfaVerifyResponse {
    
    /**
     * Whether MFA is fully completed (all factors verified)
     */
    private boolean mfaCompleted;
    
    /**
     * Factors verified so far
     */
    private Set<String> verifiedFactors;
    
    /**
     * Factors still required
     */
    private Set<String> requiredFactors;
    
    /**
     * Final JWT token (only present when mfaCompleted = true)
     */
    private String token;
    
    /**
     * User details (only present when mfaCompleted = true)
     */
    private Object user;
    
    /**
     * Success message
     */
    private String message;
}
