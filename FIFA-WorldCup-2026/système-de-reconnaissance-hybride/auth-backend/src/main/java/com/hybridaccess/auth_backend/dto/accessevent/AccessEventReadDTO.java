package com.hybridaccess.auth_backend.dto.accessevent;

import com.hybridaccess.auth_backend.entity.AccessEvent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour la lecture d'un événement d'accès.
 * En lecture seule - les événements ne sont jamais modifiés.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessEventReadDTO {

    private Long id;
    private Long userId;
    private String userEmail;
    private Long resourceId;
    private String resourceName;
    private LocalDateTime accessTime;
    private AccessEvent.AccessStatus status;
    private String methodUsed;
    private Integer riskScore;
    private String ipAddress;
    private String failureReason;
}
