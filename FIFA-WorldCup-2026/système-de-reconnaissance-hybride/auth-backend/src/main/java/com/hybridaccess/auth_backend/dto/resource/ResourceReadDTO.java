package com.hybridaccess.auth_backend.dto.resource;

import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la lecture d'une ressource.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceReadDTO {

    private Long id;
    private String name;
    private String description;
    private AccessLevelReadDTO minAccessLevel;
    private String resourcePath;
    private Boolean isSensitive;
}
