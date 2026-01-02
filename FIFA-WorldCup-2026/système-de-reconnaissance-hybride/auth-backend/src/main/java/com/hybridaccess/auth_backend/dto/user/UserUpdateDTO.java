package com.hybridaccess.auth_backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la mise à jour d'un utilisateur.
 * Tous les champs sont optionnels.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {

    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String fullName;

    @Email(message = "Format d'email invalide")
    @Size(max = 150, message = "L'email ne doit pas dépasser 150 caractères")
    private String email;

    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;

    private Long accessLevelId;

    private Boolean active;
}
