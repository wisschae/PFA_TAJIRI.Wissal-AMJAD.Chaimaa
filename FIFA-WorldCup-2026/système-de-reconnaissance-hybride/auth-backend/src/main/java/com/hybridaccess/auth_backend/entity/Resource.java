package com.hybridaccess.auth_backend.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entité représentant une ressource protégée du système.
 * 
 * Chaque ressource a un niveau d'accès minimum requis.
 * Les utilisateurs doivent avoir un niveau >= minAccessLevel pour y accéder.
 */
@Entity
@Table(name = "resources")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name; // Ex: "admin_panel", "financial_reports", "user_data"

    @Column(length = 255)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "min_access_level_id", nullable = false)
    private AccessLevel minAccessLevel;

    @Column(name = "resource_path", length = 200)
    private String resourcePath; // Ex: "/admin", "/api/v1/reports"

    @Column(name = "is_sensitive", nullable = false)
    @Builder.Default
    private Boolean isSensitive = false; // True si accès requiert MFA renforcé
}
