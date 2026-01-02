package com.hybridaccess.auth_backend.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entité représentant un niveau d'accès dans le système.
 * 
 * Chaque niveau définit quels facteurs d'authentification sont requis :
 * - LEVEL_1 : Mot de passe seulement
 * - LEVEL_2 : Mot de passe + Biométrie
 * - LEVEL_3 : Mot de passe + Biométrie + OTP
 * - ADMIN : Tous les facteurs avec restrictions supplémentaires
 */
@Entity
@Table(name = "access_levels")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name; // LEVEL_1, LEVEL_2, LEVEL_3, ADMIN

    @Column(length = 255)
    private String description;

    @Column(name = "password_required", nullable = false)
    @Builder.Default
    private Boolean passwordRequired = true;

    @Column(name = "biometric_required", nullable = false)
    @Builder.Default
    private Boolean biometricRequired = false;

    @Column(name = "otp_required", nullable = false)
    @Builder.Default
    private Boolean otpRequired = false;

    @Column(name = "priority_level", nullable = false)
    private Integer priorityLevel; // 1 = plus bas, 4 = admin

    /**
     * Vérifie si ce niveau d'accès est supérieur ou égal à un autre.
     * 
     * @param other Le niveau à comparer
     * @return true si ce niveau >= other
     */
    public boolean isGreaterOrEqual(AccessLevel other) {
        return this.priorityLevel >= other.priorityLevel;
    }
}
