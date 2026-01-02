package com.hybridaccess.auth_backend.dto.face;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for face verification.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaceVerifyRequest {
    private String userId;
    private String imageBase64;
}
