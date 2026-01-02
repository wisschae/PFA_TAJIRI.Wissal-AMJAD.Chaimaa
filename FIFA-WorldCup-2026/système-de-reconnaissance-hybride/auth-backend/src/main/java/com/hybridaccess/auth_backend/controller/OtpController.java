package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.OtpSetupResponse;
import com.hybridaccess.auth_backend.dto.VerifyOtpSetupRequest;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.service.TotpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour la gestion de l'OTP (Google Authenticator)
 */
@RestController
@RequestMapping("/api/v1/auth/otp")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class OtpController {

    private final TotpService totpService;
    private final UserRepository userRepository;

    /**
     * Étape 1: Génère un nouveau secret OTP et le QR code
     * 
     * @param authentication Utilisateur authentifié
     * @return Secret et URI du QR code
     */
    @PostMapping("/setup")
    public ResponseEntity<OtpSetupResponse> setupOtp(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Génère un nouveau secret
        String secret = totpService.generateSecret();
        
        // Important: On ne sauvegarde PAS encore dans la DB
        // On attend que l'utilisateur vérifie d'abord le code

        // Génère l'URI pour le QR code
        String qrCodeUri = totpService.generateQrCodeUri(email, secret);

        log.info("OTP setup initiated for user: {}", email);

        return ResponseEntity.ok(new OtpSetupResponse(secret, qrCodeUri, email));
    }

    /**
     * Étape 2: Vérifie le premier code OTP et active l'OTP
     * 
     * @param request Secret temporaire + code
     * @param authentication Utilisateur authentifié
     * @return Confirmation de l'activation
     */
    @PostMapping("/verify-setup")
    public ResponseEntity<Map<String, Object>> verifySetup(
            @Valid @RequestBody VerifyOtpSetupRequest request,
            Authentication authentication) {
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        // Valide le code
        boolean isValid = totpService.validateCodeWithTolerance(request.getSecret(), request.getCode());

        if (!isValid) {
            log.warn("Invalid OTP code during setup for user: {}", email);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid OTP code. Please try again.");
            return ResponseEntity.badRequest().body(error);
        }

        // Code valide → Sauvegarde le secret et active l'OTP
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setOtpSecret(request.getSecret());
        user.setOtpEnabled(true);
        userRepository.save(user);

        log.info("OTP successfully enabled for user: {}", email);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Google Authenticator configured successfully!");
        response.put("otpEnabled", true);

        return ResponseEntity.ok(response);
    }

    /**
     * Désactive l'OTP pour l'utilisateur
     * 
     * FIX: Gestion correcte de l'authentification null pour éviter 500 errors
     * 
     * @param authentication Utilisateur authentifié (peut être null)
     * @return Confirmation ou erreur 401
     */
    @PostMapping("/disable")
    public ResponseEntity<Map<String, Object>> disableOtp(Authentication authentication) {
        // FIX: Vérifier explicitement si l'authentication est null ou invalide
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("❌ OTP disable attempt without authentication");
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Authentication required to disable OTP");
            return ResponseEntity.status(401).body(error);
        }

        // FIX: Vérifier le type de Principal avant cast
        if (!(authentication.getPrincipal() instanceof UserDetails)) {
            log.warn("❌ OTP disable attempt with invalid principal type: {}", 
                    authentication.getPrincipal().getClass().getName());
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid authentication token");
            return ResponseEntity.status(401).body(error);
        }

        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found: " + email));

            user.setOtpEnabled(false);
            user.setOtpSecret(null);
            userRepository.save(user);

            log.info("✅ OTP disabled successfully for user: {}", email);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP disabled successfully");
            response.put("otpEnabled", false);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Error disabling OTP", e);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Failed to disable OTP: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Vérifie le statut OTP de l'utilisateur
     * 
     * @param authentication Utilisateur authentifié
     * @return Statut OTP
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("otpEnabled", user.getOtpEnabled() != null ? user.getOtpEnabled() : false);
        response.put("hasSecret", user.getOtpSecret() != null && !user.getOtpSecret().isEmpty());

        return ResponseEntity.ok(response);
    }
}
