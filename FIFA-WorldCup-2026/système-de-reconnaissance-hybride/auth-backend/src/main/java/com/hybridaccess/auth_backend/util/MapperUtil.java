package com.hybridaccess.auth_backend.util;

import com.hybridaccess.auth_backend.dto.accessevent.AccessEventReadDTO;
import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelCreateDTO;
import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;
import com.hybridaccess.auth_backend.dto.resource.ResourceCreateDTO;
import com.hybridaccess.auth_backend.dto.resource.ResourceReadDTO;
import com.hybridaccess.auth_backend.dto.user.UserCreateDTO;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.entity.AccessEvent;
import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.Resource;
import com.hybridaccess.auth_backend.entity.User;

/**
 * Utilitaire pour mapper les entités JPA vers les DTOs et vice-versa.
 */
public class MapperUtil {

    // ==================== USER MAPPERS ====================

    /**
     * Convertit User entity → UserReadDTO.
     */
    public static UserReadDTO toUserReadDTO(User user) {
        if (user == null) return null;

        return UserReadDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .accessLevel(toAccessLevelReadDTO(user.getAccessLevel()))
                .active(user.getActive())
                .createdAt(user.getCreatedAt())
                .lastLogin(user.getLastLogin())
                .failedLoginAttempts(user.getFailedLoginAttempts())
                .build();
    }

    /**
     * Met à jour une entité User à partir d'un UserCreateDTO.
     * Ne met PAS à jour l'AccessLevel (doit être géré séparément).
     */
    public static void updateUserFromCreateDTO(User user, UserCreateDTO dto) {
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        // Le password sera hashé dans le service
    }

    // ==================== ACCESS LEVEL MAPPERS ====================

    /**
     * Convertit AccessLevel entity → AccessLevelReadDTO.
     */
    public static AccessLevelReadDTO toAccessLevelReadDTO(AccessLevel accessLevel) {
        if (accessLevel == null) return null;

        return AccessLevelReadDTO.builder()
                .id(accessLevel.getId())
                .name(accessLevel.getName())
                .description(accessLevel.getDescription())
                .passwordRequired(accessLevel.getPasswordRequired())
                .biometricRequired(accessLevel.getBiometricRequired())
                .otpRequired(accessLevel.getOtpRequired())
                .priorityLevel(accessLevel.getPriorityLevel())
                .build();
    }

    /**
     * Crée une entité AccessLevel à partir d'un AccessLevelCreateDTO.
     */
    public static AccessLevel toAccessLevelEntity(AccessLevelCreateDTO dto) {
        return AccessLevel.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .passwordRequired(dto.getPasswordRequired())
                .biometricRequired(dto.getBiometricRequired())
                .otpRequired(dto.getOtpRequired())
                .priorityLevel(dto.getPriorityLevel())
                .build();
    }

    // ==================== RESOURCE MAPPERS ====================

    /**
     * Convertit Resource entity → ResourceReadDTO.
     */
    public static ResourceReadDTO toResourceReadDTO(Resource resource) {
        if (resource == null) return null;

        return ResourceReadDTO.builder()
                .id(resource.getId())
                .name(resource.getName())
                .description(resource.getDescription())
                .minAccessLevel(toAccessLevelReadDTO(resource.getMinAccessLevel()))
                .resourcePath(resource.getResourcePath())
                .isSensitive(resource.getIsSensitive())
                .build();
    }

    /**
     * Crée une entité Resource à partir d'un ResourceCreateDTO.
     * L'AccessLevel doit être récupéré par le service.
     */
    public static Resource toResourceEntity(ResourceCreateDTO dto, AccessLevel minAccessLevel) {
        return Resource.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .minAccessLevel(minAccessLevel)
                .resourcePath(dto.getResourcePath())
                .isSensitive(dto.getIsSensitive())
                .build();
    }

    // ==================== ACCESS EVENT MAPPERS ====================

    /**
     * Convertit AccessEvent entity → AccessEventReadDTO.
     */
    public static AccessEventReadDTO toAccessEventReadDTO(AccessEvent event) {
        if (event == null) return null;

        return AccessEventReadDTO.builder()
                .id(event.getId())
                .userId(event.getUser().getId())
                .userEmail(event.getUser().getEmail())
                .resourceId(event.getResource() != null ? event.getResource().getId() : null)
                .resourceName(event.getResource() != null ? event.getResource().getName() : null)
                .accessTime(event.getAccessTime())
                .status(event.getStatus())
                .methodUsed(event.getMethodUsed())
                .riskScore(event.getRiskScore())
                .ipAddress(event.getIpAddress())
                .failureReason(event.getFailureReason())
                .build();
    }
}
