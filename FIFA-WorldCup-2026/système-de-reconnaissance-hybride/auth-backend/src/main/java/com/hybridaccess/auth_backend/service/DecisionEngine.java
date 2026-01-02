package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Moteur de décision pour déterminer les facteurs d'authentification requis
 * BASÉ SUR LE NIVEAU DE LA RESSOURCE (resource-based MFA).
 * 
 * Règles MFA par niveau de ressource:
 * - L1 (PUBLIC): Password only (no additional MFA)
 * - L2 (CONFIDENTIEL): Password + FACE
 * - L3 (SECRET): Password + OTP
 * - L4 (TOP_SECRET): Password + OTP + FACE
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DecisionEngine {

    @Value("${risk.threshold.medium:60}")
    private int mediumRiskThreshold;

    @Value("${risk.threshold.high:80}")
    private int highRiskThreshold;

    /**
     * Détermine les facteurs MFA requis en fonction du NIVEAU DE LA RESSOURCE.
     * 
     * Cette méthode remplace l'ancienne logique user-based.
     * MFA est maintenant déclenchée quand l'utilisateur tente d'accéder à une ressource,
     * pas au moment du login.
     *
     * @param requiredLevel Le niveau de priorité de la ressource (1-4)
     * @return Set des facteurs MFA requis (FACE, OTP, ou les deux)
     */
    public Set<String> getRequiredFactorsForLevel(int requiredLevel) {
        Set<String> factors = new HashSet<>();
        
        switch (requiredLevel) {
            case 4: // TOP_SECRET - requires both FACE and OTP
                factors.add("FACE");
                factors.add("OTP");
                log.debug("L4 (TOP_SECRET) resource - requiring FACE + OTP");
                break;
                
            case 3: // SECRET - requires OTP
                factors.add("OTP");
                log.debug("L3 (SECRET) resource - requiring OTP");
                break;
                
            case 2: // CONFIDENTIEL - requires FACE
                factors.add("FACE");
                log.debug("L2 (CONFIDENTIEL) resource - requiring FACE");
                break;
                
            case 1: // PUBLIC - no additional MFA
            default:
                log.debug("L1 (PUBLIC) resource - no MFA required");
                // factors reste vide
                break;
        }
        
        return factors;
    }

    /**
     * DEPRECATED: Ancienne méthode user-based.
     * Conservée temporairement pour compatibilité avec le code existant.
     * À remplacer par getRequiredFactorsForLevel() partout.
     * 
     * @deprecated Utiliser getRequiredFactorsForLevel(resourceLevel) à la place
     */
    @Deprecated
    public List<String> determineRequiredFactors(User user, int riskScore) {
        List<String> requiredFactors = new ArrayList<>();
        AccessLevel level = user.getAccessLevel();

        log.warn("DEPRECATED: determineRequiredFactors(user, riskScore) called. Use getRequiredFactorsForLevel(resourceLevel) instead.");
        log.debug("Determining required factors for user {} (level: {}, risk: {})",
                user.getEmail(), level.getName(), riskScore);

        // Pour compatibilité temporaire, on utilise le niveau de l'utilisateur
        // Mais en production, on devrait utiliser le niveau de la ressource demandée
        Set<String> factors = getRequiredFactorsForLevel(level.getPriorityLevel());
        requiredFactors.addAll(factors);

        // Logique de risque conservée pour transition
        if (riskScore >= highRiskThreshold) {
            log.info("High risk detected ({}), requiring FACE + OTP", riskScore);
            if (!requiredFactors.contains("FACE")) requiredFactors.add("FACE");
            if (!requiredFactors.contains("OTP")) requiredFactors.add("OTP");
        } else if (riskScore >= mediumRiskThreshold) {
            log.info("Medium risk detected ({}), requiring FACE", riskScore);
            if (!requiredFactors.contains("FACE")) requiredFactors.add("FACE");
        }

        log.info("Required factors for user {}: {}", user.getEmail(), requiredFactors);
        return requiredFactors;
    }

    /**
     * Détermine si l'utilisateur peut accéder à une ressource donnée.
     * Vérifie:
     * 1. user.priorityLevel >= resource.priorityLevel (contrôle d'accès basique)
     * 2. MFA factors satisfaits (vérifié séparément)
     *
     * @param user L'utilisateur
     * @param resourceMinLevel Le niveau minimum requis pour la ressource
     * @return true si l'utilisateur peut accéder
     */
    public boolean canAccessResource(User user, AccessLevel resourceMinLevel) {
        boolean canAccess = user.getAccessLevel().isGreaterOrEqual(resourceMinLevel);
        
        log.debug("Access check for user {} to resource requiring {}: {}",
                user.getEmail(), resourceMinLevel.getName(), canAccess ? "GRANTED" : "DENIED");
        
        return canAccess;
    }
}
