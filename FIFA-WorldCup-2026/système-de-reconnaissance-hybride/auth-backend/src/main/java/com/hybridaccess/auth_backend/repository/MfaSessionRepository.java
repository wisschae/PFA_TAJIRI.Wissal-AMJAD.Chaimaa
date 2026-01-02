package com.hybridaccess.auth_backend.repository;

import com.hybridaccess.auth_backend.entity.MfaSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for MFA Session management
 */
@Repository
public interface MfaSessionRepository extends JpaRepository<MfaSession, UUID> {

    /**
     * Find active session by user ID
     */
    Optional<MfaSession> findByUserIdAndExpiresAtAfter(Long userId, LocalDateTime now);

    /**
     * Find all expired sessions (for cleanup)
     */
    List<MfaSession> findByExpiresAtBefore(LocalDateTime now);

    /**
     * Delete all sessions for a user
     */
    void deleteByUserId(Long userId);
}
