package com.hybridaccess.auth_backend.dto.face;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for face enrollment.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaceEnrollResponse {
    private boolean success;
    private String message;
    private String embeddingId;
}
