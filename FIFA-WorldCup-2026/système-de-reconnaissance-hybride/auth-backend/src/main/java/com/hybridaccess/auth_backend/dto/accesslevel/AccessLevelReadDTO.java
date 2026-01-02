package com.hybridaccess.auth_backend.dto.accesslevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la lecture d'un niveau d'accès.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessLevelReadDTO {

    private Long id;
    private String name;
    private String description;
    private Boolean passwordRequired;
    private Boolean biometricRequired;
    private Boolean otpRequired;
    private Integer priorityLevel;
}
