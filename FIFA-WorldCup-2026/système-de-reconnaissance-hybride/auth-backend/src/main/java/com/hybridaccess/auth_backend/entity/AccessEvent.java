package com.hybridaccess.auth_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entité représentant un événement d'accès (tentative de login ou d'accès ressource).
 * 
 * Utilisée pour :
 * - Journalisation de toutes les tentatives d'accès
 * - Analyse des patterns suspects
 * - Audit de sécurité
 * - Évaluation des risques
 */
@Entity
@Table(name = "access_events")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id")
    private Resource resource; // Null si c'est juste un login

    @Column(name = "access_time", nullable = false)
    @Builder.Default
    private LocalDateTime accessTime = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AccessStatus status; // GRANTED, DENIED, MFA_REQUIRED

    @Column(name = "method_used", length = 100)
    private String methodUsed; // Ex: "PASSWORD", "PASSWORD+FACE", "PASSWORD+FACE+OTP"

    @Column(name = "risk_score")
    private Integer riskScore; // Score de risque calculé (0-100)

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "user_agent", length = 255)
    private String userAgent;

    @Column(name = "failure_reason", length = 255)
    private String failureReason; // Raison du refus si status = DENIED

    /**
     * Enum représentant le statut d'une tentative d'accès.
     */
    public enum AccessStatus {
        GRANTED,           // Accès autorisé
        DENIED,            // Accès refusé
        MFA_REQUIRED,      // Facteur supplémentaire requis
        PENDING            // En attente de validation MFA
    }
}
