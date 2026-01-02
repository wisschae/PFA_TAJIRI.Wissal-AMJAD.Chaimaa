package com.hybridaccess.auth_backend.dto.accesslevel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création d'un niveau d'accès.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessLevelCreateDTO {

    @NotBlank(message = "Le nom du niveau d'accès est requis")
    @Size(max = 50, message = "Le nom ne doit pas dépasser 50 caractères")
    private String name;

    @Size(max = 255, message = "La description ne doit pas dépasser 255 caractères")
    private String description;

    @NotNull(message = "Indiquer si le mot de passe est requis")
    @Builder.Default
    private Boolean passwordRequired = true;

    @NotNull(message = "Indiquer si la biométrie est requise")
    @Builder.Default
    private Boolean biometricRequired = false;

    @NotNull(message = "Indiquer si l'OTP est requis")
    @Builder.Default
    private Boolean otpRequired = false;

    @NotNull(message = "Le niveau de priorité est requis")
    private Integer priorityLevel;
}
