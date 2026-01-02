package com.hybridaccess.auth_backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO pour la réponse de login.
 * Contient le JWT et/ou les facteurs MFA requis.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token; // JWT si authentification complète

    private Boolean mfaRequired; // true si des facteurs supplémentaires sont requis

    private List<String> requiredFactors; // Ex: ["FACE", "OTP"]

    private String sessionId; // ID de session pour continuer le processus MFA

    private Integer riskScore; // Score de risque calculé

    private String message; // Message pour l'utilisateur
}
