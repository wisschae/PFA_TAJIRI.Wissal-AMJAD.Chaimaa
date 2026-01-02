package com.hybridaccess.auth_backend.dto.face;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for face verification.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaceVerifyResponse {
    private boolean match;
    private Double confidence;
    private Boolean autoEnrolled;  // New field - indicates if user was auto-enrolled
    private String message;
}
