package com.hybridaccess.auth_backend.dto.resource;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création d'une ressource.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceCreateDTO {

    @NotBlank(message = "Le nom de la ressource est requis")
    @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères")
    private String name;

    @Size(max = 255, message = "La description ne doit pas dépasser 255 caractères")
    private String description;

    @NotNull(message = "Le niveau d'accès minimum est requis")
    private Long minAccessLevelId;

    @Size(max = 200, message = "Le chemin ne doit pas dépasser 200 caractères")
    private String resourcePath;

    @Builder.Default
    private Boolean isSensitive = false;
}
