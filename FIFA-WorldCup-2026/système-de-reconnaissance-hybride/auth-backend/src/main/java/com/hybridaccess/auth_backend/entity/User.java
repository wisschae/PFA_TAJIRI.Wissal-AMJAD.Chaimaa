package com.hybridaccess.auth_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entité représentant un utilisateur du système.
 * 
 * Contient les informations d'identité, d'authentification et le niveau d'accès.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password; // Hashé avec BCrypt

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "access_level_id", nullable = false)
    private AccessLevel accessLevel;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "failed_login_attempts")
    @Builder.Default
    private Integer failedLoginAttempts = 0;

    // OTP / TOTP (Google Authenticator)
    @Column(name = "otp_secret", length = 64)
    private String otpSecret; // Base32 encoded secret

    @Column(name = "otp_enabled")
    @Builder.Default
    private Boolean otpEnabled = false;

    /**
     * Callback exécuté avant chaque mise à jour.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
