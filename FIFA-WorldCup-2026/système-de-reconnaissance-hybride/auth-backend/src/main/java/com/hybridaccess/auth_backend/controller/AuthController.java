package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.auth.LoginRequest;
import com.hybridaccess.auth_backend.dto.auth.LoginResponse;
import com.hybridaccess.auth_backend.dto.auth.RegisterRequest;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST pour l'authentification.
 * Base URL: /api/v1/auth
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final com.hybridaccess.auth_backend.security.OtpService otpService;
    private final com.hybridaccess.auth_backend.repository.UserRepository userRepository;

    /**
     * Enregistre un nouvel utilisateur.
     * POST /api/v1/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<UserReadDTO> register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserReadDTO user = authService.register(registerRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    /**
     * Authentifie un utilisateur.
     * POST /api/v1/auth/login
     * 
     * Retourne soit un JWT si pas de MFA requis, soit la liste des facteurs MFA à valider.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    /* 
     * REMOVED: Old verifyMfa endpoint replaced by unified MfaController
     * Use POST /api/v1/auth/mfa/verify in MfaController instead
     */

    /**
     * ✅ Setup OTP - Génère secret et retourne otpauthUri pour QR code.
     * GET /api/v1/auth/mfa/otp/setup
     * Protégé par JWT (utilisateur connecté)
     */
    @GetMapping("/mfa/otp/setup")
    public ResponseEntity<com.hybridaccess.auth_backend.dto.otp.OtpSetupResponse> setupOtp(
            org.springframework.security.core.Authentication authentication) {
        String email = authentication.getName();
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new com.hybridaccess.auth_backend.exception.UnauthorizedException("User not found"));

        // Générer secret si absent
        if (user.getOtpSecret() == null || user.getOtpSecret().isBlank()) {
            user.setOtpSecret(otpService.generateBase32Secret());
            userRepository.save(user);
        }

        String uri = otpService.buildOtpAuthUri("HybridAccess", user.getEmail(), user.getOtpSecret());
        return ResponseEntity.ok(
            new com.hybridaccess.auth_backend.dto.otp.OtpSetupResponse(user.getOtpSecret(), uri)
        );
    }

    /**
     * ✅ Enable OTP - Valide le code et active OTP pour l'utilisateur.
     * POST /api/v1/auth/mfa/otp/enable
     */
    @PostMapping("/mfa/otp/enable")
    public ResponseEntity<String> enableOtp(
            org.springframework.security.core.Authentication authentication,
            @Valid @RequestBody com.hybridaccess.auth_backend.dto.otp.OtpEnableRequest request) {
        
        var user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new com.hybridaccess.auth_backend.exception.UnauthorizedException("User not found"));

        if (user.getOtpSecret() == null || user.getOtpSecret().isBlank()) {
            return ResponseEntity.badRequest().body("OTP not setup. Call /mfa/otp/setup first.");
        }

        boolean ok = otpService.verifyCode(user.getOtpSecret(), request.code());
        if (!ok) {
            return ResponseEntity.status(400).body("Invalid OTP code");
        }

        user.setOtpEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("OTP enabled successfully");
    }

    /**
     * 🔥 CRITICAL FIX: Get current authenticated user
     * GET /api/v1/auth/me
     * Returns the user as DTO (not entity) to avoid JSON circular references
     */
    @GetMapping("/me")
    public ResponseEntity<UserReadDTO> getCurrentUser(
            org.springframework.security.core.Authentication authentication) {
        
        String email = authentication.getName();
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new com.hybridaccess.auth_backend.exception.UnauthorizedException("User not found"));

        // Convert entity to DTO to avoid JSON circular reference
        UserReadDTO userDTO = com.hybridaccess.auth_backend.util.MapperUtil.toUserReadDTO(user);
        
        return ResponseEntity.ok(userDTO);
    }
    
    /**
     * Gère les exceptions MFA (facteur invalide).
     * Retourne 400 BAD_REQUEST au lieu de 401 UNAUTHORIZED
     * pour permettre à l'utilisateur de rester sur /mfa et réessayer.
     */
    @ExceptionHandler(com.hybridaccess.auth_backend.exception.MfaException.class)
    public ResponseEntity<ApiError> handleMfaException(
            com.hybridaccess.auth_backend.exception.MfaException ex) {
        ApiError error = new ApiError(
            HttpStatus.BAD_REQUEST.value(),
            "MFA_FAILED",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * Classe interne pour les erreurs API.
     */
    @lombok.Data
    @lombok.AllArgsConstructor
    public static class ApiError {
        private int status;
        private String code;
        private String message;
    }
}
