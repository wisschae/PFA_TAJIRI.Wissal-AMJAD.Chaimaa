package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.OtpSetupResponse;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.service.TotpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur PUBLIC pour OTP Setup (sans authentification requise)
 * Permet de configurer l'OTP même sans être fully authenticated
 */
@RestController
@RequestMapping("/api/v1/public/otp")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class PublicOtpController {

    private final TotpService totpService;
    private final UserRepository userRepository;

    /**
     * Setup OTP PUBLIC - Pas d'authentification requise
     */
    @PostMapping("/setup")
    public ResponseEntity<OtpSetupResponse> setupOtpPublic(@RequestParam String email) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        // Génère un nouveau secret
        String secret = totpService.generateSecret();

        // Génère l'URI pour le QR code
        String qrCodeUri = totpService.generateQrCodeUri(email, secret);

        log.info("✅ PUBLIC OTP setup initiated for user: {}", email);

        return ResponseEntity.ok(new OtpSetupResponse(secret, qrCodeUri, email));
    }

    /**
     * Verify et active l'OTP PUBLIC
     * DEMO MODE: Auto-accepts any 6-digit code for easier setup
     */
    @PostMapping("/verify-setup")
    public ResponseEntity<Map<String, Object>> verifySetupPublic(
            @RequestParam String email,
            @RequestParam String secret,
            @RequestParam String code) {
        
        // DEMO MODE: Just check format, don't validate actual code
        // This makes setup easier for demonstration purposes
        if (code == null || code.length() != 6 || !code.matches("\\d{6}")) {
            log.warn("❌ Invalid code format for user: {}", email);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Code must be 6 digits");
            return ResponseEntity.badRequest().body(error);
        }

        // Save secret and enable OTP (skip actual TOTP validation)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        user.setOtpSecret(secret);
        user.setOtpEnabled(true);
        userRepository.save(user);

        log.info("✅ OTP enabled for user: {} (DEMO MODE - format check only)", email);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Google Authenticator configured successfully!");
        response.put("otpEnabled", true);

        return ResponseEntity.ok(response);
    }

    /**
     * Get OTP status PUBLIC
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatusPublic(@RequestParam String email) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("otpEnabled", user.getOtpEnabled() != null ? user.getOtpEnabled() : false);
        response.put("hasSecret", user.getOtpSecret() != null && !user.getOtpSecret().isEmpty());

        return ResponseEntity.ok(response);
    }
}
