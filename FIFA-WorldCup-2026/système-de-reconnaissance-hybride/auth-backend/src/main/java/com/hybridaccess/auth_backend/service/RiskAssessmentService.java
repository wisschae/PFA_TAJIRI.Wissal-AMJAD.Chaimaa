package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.entity.Resource;
import com.hybridaccess.auth_backend.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Service d'évaluation des risques pour déterminer si des facteurs MFA supplémentaires sont requis.
 */
@Service
@Slf4j
public class RiskAssessmentService {

    @Value("${risk.threshold.low:30}")
    private int lowRiskThreshold;

    @Value("${risk.threshold.medium:60}")
    private int mediumRiskThreshold;

    @Value("${risk.threshold.high:80}")
    private int highRiskThreshold;

    @Value("${risk.factors.unusual-hour-weight:20}")
    private int unusualHourWeight;

    @Value("${risk.factors.failed-attempts-weight:30}")
    private int failedAttemptsWeight;

    @Value("${risk.factors.sensitive-resource-weight:25}")
    private int sensitiveResourceWeight;

    /**
     * Calcule le score de risque pour une tentative d'accès.
     * Score de 0 (aucun risque) à 100 (risque maximum).
     *
     * @param user L'utilisateur tentant d'accéder
     * @param resource La ressource cible (null si simple login)
     * @return Score de risque entre 0 et 100
     */
    public int calculateRiskScore(User user, Resource resource) {
        int riskScore = 0;

        // Facteur 1: Heure inhabituelle (ex: entre 22h et 6h)
        if (isUnusualHour()) {
            riskScore += unusualHourWeight;
            log.debug("Unusual hour detected, adding {} points", unusualHourWeight);
        }

        // Facteur 2: Tentatives de connexion échouées récentes
        if (user.getFailedLoginAttempts() != null && user.getFailedLoginAttempts() > 0) {
            int failedAttemptPoints = Math.min(user.getFailedLoginAttempts() * 10, failedAttemptsWeight);
            riskScore += failedAttemptPoints;
            log.debug("Failed login attempts: {}, adding {} points", user.getFailedLoginAttempts(), failedAttemptPoints);
        }

        // Facteur 3: Ressource sensible
        if (resource != null && resource.getIsSensitive()) {
            riskScore += sensitiveResourceWeight;
            log.debug("Sensitive resource access, adding {} points", sensitiveResourceWeight);
        }

        // Facteur 4: Première connexion (pas de lastLogin)
        if (user.getLastLogin() == null) {
            riskScore += 15;
            log.debug("First login detected, adding 15 points");
        }

        // Facteur 5: Compte récemment créé (moins de 24h)
        if (user.getCreatedAt() != null && user.getCreatedAt().isAfter(LocalDateTime.now().minusHours(24))) {
            riskScore += 10;
            log.debug("Recently created account, adding 10 points");
        }

        // Limiter le score à 100
        riskScore = Math.min(riskScore, 100);

        log.info("Risk score calculated for user {}: {}", user.getEmail(), riskScore);
        return riskScore;
    }

    /**
     * Vérifie si l'heure actuelle est considérée comme inhabituelle.
     * Inhabituel = entre 22h00 et 06h00.
     */
    private boolean isUnusualHour() {
        LocalTime now = LocalTime.now();
        LocalTime eveningStart = LocalTime.of(22, 0);
        LocalTime morningEnd = LocalTime.of(6, 0);

        return now.isAfter(eveningStart) || now.isBefore(morningEnd);
    }

    /**
     * Détermine le niveau de risque textuel basé sur le score.
     */
    public String getRiskLevel(int riskScore) {
        if (riskScore < lowRiskThreshold) {
            return "LOW";
        } else if (riskScore < mediumRiskThreshold) {
            return "MEDIUM";
        } else if (riskScore < highRiskThreshold) {
            return "HIGH";
        } else {
            return "CRITICAL";
        }
    }
}
