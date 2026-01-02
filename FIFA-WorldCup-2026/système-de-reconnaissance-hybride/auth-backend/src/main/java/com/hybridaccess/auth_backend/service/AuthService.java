package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.auth.LoginRequest;
import com.hybridaccess.auth_backend.dto.auth.LoginResponse;
import com.hybridaccess.auth_backend.dto.auth.RegisterRequest;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;

/**
 * Interface du service d'authentification.
 */
public interface AuthService {

    /**
     * Enregistre un nouvel utilisateur.
     *
     * @param registerRequest Les informations d'inscription
     * @return L'utilisateur créé
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si l'email existe déjà
     */
    UserReadDTO register(RegisterRequest registerRequest);

    /**
     * Authentifie un utilisateur et retourne un token JWT ou les facteurs MFA requis.
     *
     * @param loginRequest Les informations de connexion
     * @return La réponse de login (token ou MFA requis)
     * @throws com.hybridaccess.auth_backend.exception.UnauthorizedException si les credentials sont invalides
     */
    LoginResponse login(LoginRequest loginRequest);

    /**
     * Vérifie un facteur MFA (biométrie ou OTP).
     *
     * @param sessionId L'ID de session MFA
     * @param factorType Le type de facteur (FACE, OTP)
     * @param factorData Les données du facteur (OTP code, etc.)
     * @param imageBase64 Image base64 pour la vérification faciale (FACE factor)
     * @return La réponse de login avec le token si tous les facteurs sont validés
     */
    LoginResponse verifyMfaFactor(String sessionId, String factorType, String factorData, String imageBase64);
}
