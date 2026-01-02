package com.hybridaccess.auth_backend.dto.user;

import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour la lecture des informations utilisateur.
 * Ne contient jamais le mot de passe.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReadDTO {

    private Long id;
    private String fullName;
    private String email;
    private AccessLevelReadDTO accessLevel;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Integer failedLoginAttempts;
}
