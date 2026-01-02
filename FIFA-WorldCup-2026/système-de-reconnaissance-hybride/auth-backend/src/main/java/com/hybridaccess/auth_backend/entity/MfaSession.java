package com.hybridaccess.auth_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * MFA Session - Tracks MFA verification progress for a user
 * 
 * When a user attempts to access a resource requiring MFA, a session is created
 * with the required factors. As they verify each factor (OTP, FACE), it's added
 * to verifiedFactors. Once all required factors are verified, a final JWT is issued.
 */
@Entity
@Table(name = "mfa_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MfaSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "session_id", updatable = false, nullable = false)
    private UUID sessionId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * Email for easier lookup and logging
     */
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * Level of the resource requiring MFA (1-4)
     */
    @Column(name = "required_level", nullable = false)
    private Integer requiredLevel;

    /**
     * Factors required for this session (e.g., ["FACE", "OTP"])
     * Determined by the resource level being accessed
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "mfa_session_required_factors", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "factor")
    private Set<String> requiredFactors = new HashSet<>();

    /**
     * Factors already verified in this session
     * When this equals requiredFactors, MFA is complete and JWT can be issued
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "mfa_session_verified_factors", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "factor")
    private Set<String> verifiedFactors = new HashSet<>();

    /**
     * Expiration timestamp - sessions expire after 10 minutes
     */
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    /**
     * Creation timestamp
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Checks if MFA is complete (all required factors verified)
     */
    public boolean isComplete() {
        return !requiredFactors.isEmpty() && verifiedFactors.containsAll(requiredFactors);
    }

    /**
     * Checks if session is still valid (not expired)
     */
    public boolean isValid() {
        return LocalDateTime.now().isBefore(expiresAt);
    }

    /**
     * Marks a factor as verified
     */
    public void addVerifiedFactor(String factor) {
        if (requiredFactors.contains(factor)) {
            verifiedFactors.add(factor);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (expiresAt == null) {
            // Default expiration: 10 minutes
            expiresAt = createdAt.plusMinutes(10);
        }
    }
}
