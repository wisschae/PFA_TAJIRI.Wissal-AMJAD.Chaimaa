package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.entity.AccessEvent;
import com.hybridaccess.auth_backend.entity.Resource;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.AccessEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

/**
 * Service pour journaliser tous les événements d'accès.
 * Crée automatiquement des AccessEvent dans la base de données.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AccessLoggingService {

    private final AccessEventRepository accessEventRepository;

    /**
     * Journalise une tentative de login réussie.
     */
    public void logLoginSuccess(User user, String methodUsed, int riskScore) {
        AccessEvent event = AccessEvent.builder()
                .user(user)
                .resource(null) // Pas de ressource pour un simple login
                .accessTime(LocalDateTime.now())
                .status(AccessEvent.AccessStatus.GRANTED)
                .methodUsed(methodUsed)
                .riskScore(riskScore)
                .ipAddress(getClientIpAddress())
                .userAgent(getUserAgent())
                .build();

        accessEventRepository.save(event);
        log.info("Login success logged for user: {}", user.getEmail());
    }

    /**
     * Journalise une tentative de login échouée.
     */
    public void logLoginFailure(User user, String reason, int riskScore) {
        AccessEvent event = AccessEvent.builder()
                .user(user)
                .resource(null)
                .accessTime(LocalDateTime.now())
                .status(AccessEvent.AccessStatus.DENIED)
                .methodUsed("PASSWORD")
                .riskScore(riskScore)
                .ipAddress(getClientIpAddress())
                .userAgent(getUserAgent())
                .failureReason(reason)
                .build();

        accessEventRepository.save(event);
        log.info("Login failure logged for user: {}", user.getEmail());
    }

    /**
     * Journalise une requête MFA en attente.
     */
    public void logMfaRequired(User user, String requiredFactors, int riskScore) {
        AccessEvent event = AccessEvent.builder()
                .user(user)
                .resource(null)
                .accessTime(LocalDateTime.now())
                .status(AccessEvent.AccessStatus.MFA_REQUIRED)
                .methodUsed("PASSWORD+MFA_PENDING")
                .riskScore(riskScore)
                .ipAddress(getClientIpAddress())
                .userAgent(getUserAgent())
                .failureReason("MFA required: " + requiredFactors)
                .build();

        accessEventRepository.save(event);
        log.info("MFA required logged for user: {} - factors: {}", user.getEmail(), requiredFactors);
    }

    /**
     * Journalise un accès à une ressource.
     */
    public void logResourceAccess(User user, Resource resource, boolean granted, String methodUsed, int riskScore) {
        AccessEvent event = AccessEvent.builder()
                .user(user)
                .resource(resource)
                .accessTime(LocalDateTime.now())
                .status(granted ? AccessEvent.AccessStatus.GRANTED : AccessEvent.AccessStatus.DENIED)
                .methodUsed(methodUsed)
                .riskScore(riskScore)
                .ipAddress(getClientIpAddress())
                .userAgent(getUserAgent())
                .failureReason(granted ? null : "Insufficient access level")
                .build();

        accessEventRepository.save(event);
        log.info("Resource access logged - user: {}, resource: {}, granted: {}",
                user.getEmail(), resource.getName(), granted);
    }

    /**
     * Récupère l'adresse IP du client.
     */
    private String getClientIpAddress() {
        try {
            HttpServletRequest request = getCurrentRequest();
            if (request == null) return "UNKNOWN";

            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0].trim();
            }

            String remoteAddr = request.getRemoteAddr();
            return remoteAddr != null ? remoteAddr : "UNKNOWN";
        } catch (Exception e) {
            log.warn("Could not extract client IP: {}", e.getMessage());
            return "UNKNOWN";
        }
    }

    /**
     * Récupère le User-Agent du client.
     */
    private String getUserAgent() {
        try {
            HttpServletRequest request = getCurrentRequest();
            if (request == null) return "UNKNOWN";

            String userAgent = request.getHeader("User-Agent");
            return userAgent != null ? userAgent : "UNKNOWN";
        } catch (Exception e) {
            log.warn("Could not extract User-Agent: {}", e.getMessage());
            return "UNKNOWN";
        }
    }

    /**
     * Récupère la requête HTTP courante.
     */
    private HttpServletRequest getCurrentRequest() {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attributes != null ? attributes.getRequest() : null;
    }
}
