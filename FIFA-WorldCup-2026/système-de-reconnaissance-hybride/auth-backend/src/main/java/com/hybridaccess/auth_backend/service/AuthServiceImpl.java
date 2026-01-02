package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.auth.LoginRequest;
import com.hybridaccess.auth_backend.dto.auth.LoginResponse;
import com.hybridaccess.auth_backend.dto.auth.RegisterRequest;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.exception.BusinessException;
import com.hybridaccess.auth_backend.exception.UnauthorizedException;
import com.hybridaccess.auth_backend.repository.AccessLevelRepository;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.security.JwtTokenProvider;
import com.hybridaccess.auth_backend.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Implémentation du service d'authentification.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AccessLevelRepository accessLevelRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RiskAssessmentService riskAssessmentService;
    private final DecisionEngine decisionEngine;
    private final com.hybridaccess.auth_backend.security.OtpService otpService;

    @Override
    public UserReadDTO register(RegisterRequest registerRequest) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BusinessException("Un utilisateur avec cet email existe déjà : " + registerRequest.getEmail());
        }

        // Par défaut, les nouveaux utilisateurs ont PUBLIC
        AccessLevel defaultLevel = accessLevelRepository.findByName("PUBLIC")
                .orElseThrow(() -> new BusinessException("Niveau d'accès par défaut PUBLIC non trouvé"));

        // Créer l'utilisateur avec mot de passe hashé
        User user = User.builder()
                .fullName(registerRequest.getFullName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .accessLevel(defaultLevel)
                .active(true)
                .createdAt(LocalDateTime.now())
                .failedLoginAttempts(0)
                .build();

        User savedUser = userRepository.save(user);
        log.info("New user registered: {}", savedUser.getEmail());

        return MapperUtil.toUserReadDTO(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Authentification de base (email + password)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Récupérer l'utilisateur
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UnauthorizedException("Utilisateur non trouvé"));

            // Réinitialiser les tentatives échouées
            user.setFailedLoginAttempts(0);
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);

            // Évaluer le risque
            int riskScore = riskAssessmentService.calculateRiskScore(user, null);

            // Décider si MFA est requis
            List<String> requiredFactors = decisionEngine.determineRequiredFactors(user, riskScore);

            if (requiredFactors.isEmpty()) {
                // Pas de MFA requis, générer le token directement
                String token = jwtTokenProvider.generateToken(authentication, userRepository);

                log.info("User {} logged in successfully without MFA", user.getEmail());

                return LoginResponse.builder()
                        .token(token)
                        .mfaRequired(false)
                        .riskScore(riskScore)
                        .message("Authentification réussie")
                        .build();
            } else {
                // MFA requis
                String sessionId = UUID.randomUUID().toString();

                log.info("User {} requires MFA: {}", user.getEmail(), requiredFactors);

                return LoginResponse.builder()
                        .mfaRequired(true)
                        .requiredFactors(requiredFactors)
                        .sessionId(sessionId)
                        .riskScore(riskScore)
                        .message("Facteurs d'authentification supplémentaires requis")
                        .build();
            }

        } catch (AuthenticationException e) {
            // Incrémenter les tentatives échouées
            userRepository.findByEmail(loginRequest.getEmail()).ifPresent(user -> {
                user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
                userRepository.save(user);
            });

            log.warn("Failed login attempt for user: {}", loginRequest.getEmail());
            throw new UnauthorizedException("Email ou mot de passe incorrect");
        }
    }

    @Override
    public LoginResponse verifyMfaFactor(String sessionId, String factorType, String factorData, String imageBase64) {
        log.info("MFA verification requested for session {} with factor {}", sessionId, factorType);
        
        // TODO: For full implementation, retrieve user from session storage
        // For now, we'll implement FACE verification logic
        
        if ("FACE".equalsIgnoreCase(factorType)) {
            // Face verification logic
            if (imageBase64 == null || imageBase64.isEmpty()) {
                log.error("No image provided for FACE factor verification");
                throw new UnauthorizedException("Image required for face verification");
            }
            
            // Extract user ID from session (for now, use factorData as userId)
            String userId = factorData;  // In real impl, get from session storage
            
            try {
                // Call face-service to verify the face
                var faceServiceClient = new com.hybridaccess.auth_backend.client.FaceServiceClient(
                    new org.springframework.web.client.RestTemplate(),
                    "http://localhost:8001"
                );
                
                var verifyResponse = faceServiceClient.verifyFace(userId, imageBase64);
                
                // Check if user was auto-enrolled (first-time enrollment)
                if (Boolean.TRUE.equals(verifyResponse.getAutoEnrolled())) {
                    log.info("🎯 First face enrolled automatically for user: {}", userId);
                }
                
                if (!verifyResponse.isMatch()) {
                    log.warn("Face verification failed for user {}: {}", userId, verifyResponse.getMessage());
                    // Throw MfaException (400) instead of UnauthorizedException (401)
                    // This keeps user on /mfa page instead of redirecting to /login
                    throw new com.hybridaccess.auth_backend.exception.MfaException(
                        "Face verification failed: " + verifyResponse.getMessage()
                    );
                }
                
                log.info("✓ Face verification successful for user {} with confidence {}", 
                        userId, verifyResponse.getConfidence());
                
                // Face verified - generate JWT token DIRECTLY
                User user = userRepository.findByEmail(userId)
                        .orElseThrow(() -> new UnauthorizedException("User not found"));
                
                log.info("📝 Generating JWT for user: {}", user.getEmail());
                
                // Generate JWT token with user claims (Phase E)
            String token = jwtTokenProvider.generateTokenFromUsername(user.getEmail(), user);
                
                log.info("✅ JWT token generated successfully, length: {}", token != null ? token.length() : 0);
                
                // Set message based on whether user was auto-enrolled
                String message = Boolean.TRUE.equals(verifyResponse.getAutoEnrolled()) 
                    ? "Votre visage a été enregistré et vérifié avec succès"
                    : "Votre identité a été confirmée";
                
                log.info("🎯 Returning LoginResponse with token and message: {}", message);
                
                return LoginResponse.builder()
                        .token(token)
                        .mfaRequired(false)
                        .message(message)
                        .build();
                
            } catch (com.hybridaccess.auth_backend.exception.MfaException e) {
                // Laisser passer MfaException pour qu'elle soit attrapée par @ExceptionHandler
                throw e;
            } catch (Exception e) {
                log.error("Error during face verification: {}", e.getMessage());
                throw new UnauthorizedException("Face verification failed: " + e.getMessage());
            }
        }
        
        // ✅ OTP verification
        if ("OTP".equalsIgnoreCase(factorType)) {
            log.info("OTP verification requested for session {}", sessionId);
            
            // Extract user email from factorData (passed from login)
            String userId = factorData;  // In real impl, retrieve from session storage
            
            // Load user
            User user = userRepository.findByEmail(userId)
                    .orElseThrow(() -> new UnauthorizedException("User not found"));
            
            // Check if OTP is enabled for this user
            if (!user.getOtpEnabled() || user.getOtpSecret() == null || user.getOtpSecret().isBlank()) {
                log.warn("OTP verification requested but not enabled for user {}", userId);
                throw new com.hybridaccess.auth_backend.exception.MfaException(
                    "OTP non activé pour cet utilisateur"
                );
            }
            
            // Extract OTP code from imageBase64 field (reused for simplicity)
            // In frontend, send code as imageBase64 or add new field
            String otpCode = imageBase64;  // Or parse from factorData
            
            if (otpCode == null || otpCode.isBlank()) {
                throw new com.hybridaccess.auth_backend.exception.MfaException(
                    "Code OTP requis"
                );
            }
            
            // Verify OTP code
            boolean isValid = otpService.verifyCode(user.getOtpSecret(), otpCode.trim());
            
            if (!isValid) {
                log.warn("Invalid OTP code provided for user {}", userId);
                throw new com.hybridaccess.auth_backend.exception.MfaException(
                    "Code OTP invalide ou expiré"
                );
            }
            
            log.info("✓ OTP verification successful for user {}", userId);
            
            // Generate JWT token
            String token = jwtTokenProvider.generateTokenFromUsername(user.getEmail(), user);
            
            log.info("✅ JWT token generated successfully for OTP auth");
            
            return LoginResponse.builder()
                    .token(token)
                    .mfaRequired(false)
                    .message("Authentification OTP réussie")
                    .build();
        }
        
        // For other factors, return error
        log.warn("Factor type {} not supported", factorType);
        throw new com.hybridaccess.auth_backend.exception.MfaException(
            "Type de facteur MFA non supporté: " + factorType
        );
    }
}
