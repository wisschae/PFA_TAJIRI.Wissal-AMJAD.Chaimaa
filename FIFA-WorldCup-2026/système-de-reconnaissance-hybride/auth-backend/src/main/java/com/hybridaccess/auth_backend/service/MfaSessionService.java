package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.entity.MfaSession;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.MfaSessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

/**
 * Service for managing MFA sessions
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MfaSessionService {

    private final MfaSessionRepository mfaSessionRepository;
    private final DecisionEngine decisionEngine;

    /**
     * Creates a new MFA session for a user accessing a resource
     * 
     * @param user The user requesting access
     * @param resourceLevel The priority level of the resource (1-4)
     * @return The created MFA session
     */
    @Transactional
    public MfaSession createSession(User user, int resourceLevel) {
        // Determine required factors based on resource level
        Set<String> requiredFactors = decisionEngine.getRequiredFactorsForLevel(resourceLevel);

        MfaSession session = new MfaSession();
        session.setUserId(user.getId());
        session.setEmail(user.getEmail());
        session.setRequiredLevel(resourceLevel);
        session.setRequiredFactors(requiredFactors);
        session.setExpiresAt(LocalDateTime.now().plusMinutes(10));

        MfaSession saved = mfaSessionRepository.save(session);
        
        log.info("✅ Created MFA session {} for user {} accessing L{} resource. Required factors: {}",
                saved.getSessionId(), user.getEmail(), resourceLevel, requiredFactors);

        return saved;
    }

    /**
     * Finds an MFA session by ID
     */
    public MfaSession findById(UUID sessionId) {
        return mfaSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("MFA session not found or expired: " + sessionId));
    }

    /**
     * Marks a factor as verified in the session
     * 
     * @param sessionId The session ID
     * @param factor The factor to mark as verified (e.g., "OTP", "FACE")
     * @return The updated session
     */
    @Transactional
    public MfaSession verifyFactor(UUID sessionId, String factor) {
        MfaSession session = findById(sessionId);

        if (!session.isValid()) {
            throw new RuntimeException("MFA session expired");
        }

        session.addVerifiedFactor(factor);
        MfaSession updated = mfaSessionRepository.save(session);

        log.info("✅ Factor {} verified for session {}. Verified: {}, Required: {}",
                factor, sessionId, updated.getVerifiedFactors(), updated.getRequiredFactors());

        return updated;
    }

    /**
     * Checks if all required factors are verified
     */
    public boolean isSessionComplete(UUID sessionId) {
        MfaSession session = findById(sessionId);
        return session.isComplete();
    }

    /**
     * Deletes an MFA session after JWT is issued
     */
    @Transactional
    public void deleteSession(UUID sessionId) {
        mfaSessionRepository.deleteById(sessionId);
        log.info("🗑️ Deleted MFA session {}", sessionId);
    }

    /**
     * Cleanup expired sessions (can be scheduled)
     */
    @Transactional
    public void cleanupExpiredSessions() {
        var expired = mfaSessionRepository.findByExpiresAtBefore(LocalDateTime.now());
        if (!expired.isEmpty()) {
            mfaSessionRepository.deleteAll(expired);
            log.info("🗑️ Cleaned up {} expired MFA sessions", expired.size());
        }
    }
}
