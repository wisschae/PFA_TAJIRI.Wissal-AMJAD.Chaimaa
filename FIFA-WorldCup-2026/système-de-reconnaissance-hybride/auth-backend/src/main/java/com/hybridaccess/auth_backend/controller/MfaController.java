package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.MfaVerifyRequest;
import com.hybridaccess.auth_backend.dto.MfaVerifyResponse;
import com.hybridaccess.auth_backend.entity.MfaSession;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.security.JwtTokenProvider;
import com.hybridaccess.auth_backend.service.MfaSessionService;
import com.hybridaccess.auth_backend.service.TotpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Unified MFA Controller for all MFA verification
 * Handles both OTP and FACE verification in a single endpoint
 */
@RestController
@RequestMapping("/api/v1/auth/mfa")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class MfaController {

    private final MfaSessionService mfaSessionService;
    private final TotpService totpService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Unified endpoint to verify any MFA factor (OTP or FACE)
     * 
     * Returns mfaCompleted=false if more factors are needed
     * Returns mfaCompleted=true + JWT token when all factors verified
     */
    @PostMapping("/verify")
    public ResponseEntity<MfaVerifyResponse> verifyMfaFactor(@RequestBody MfaVerifyRequest request) {
        try {
            UUID sessionId = request.getMfaSessionId();
            String factorType = request.getFactorType();

            log.info("🔐 MFA verification attempt: session={}, factor={}", sessionId, factorType);

            // Get session
            MfaSession session = mfaSessionService.findById(sessionId);

            if (!session.isValid()) {
                log.warn("❌ MFA session expired: {}", sessionId);
                return ResponseEntity.status(401).body(createErrorResponse("MFA session expired. Please login again."));
            }

            // Verify the factor
            boolean verified = false;
            
            switch (factorType.toUpperCase()) {
                case "OTP":
                    verified = verifyOtpFactor(session, request.getOtpCode());
                    break;
                    
                case "FACE":
                    verified = verifyFaceFactor(session, request.getImageBase64());
                    break;
                    
                default:
                    log.warn("❌ Unknown factor type: {}", factorType);
                    return ResponseEntity.badRequest().body(createErrorResponse("Invalid factor type: " + factorType));
            }

            if (!verified) {
                log.warn("❌ Factor verification failed: {}", factorType);
                return ResponseEntity.status(401).body(createErrorResponse("Invalid " + factorType + " verification"));
            }

            // Mark factor as verified
            session = mfaSessionService.verifyFactor(sessionId, factorType.toUpperCase());

            // Check if MFA is complete
            if (session.isComplete()) {
                log.info("✅ MFA COMPLETED for session {}. Issuing final JWT token.", sessionId);

                // Get user
                User user = userRepository.findById(session.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));

                // Generate FINAL JWT token with MFA claims
                String token = jwtTokenProvider.generateTokenWithMfaClaims(user, session.getVerifiedFactors());

                // Delete session (no longer needed)
                mfaSessionService.deleteSession(sessionId);

                MfaVerifyResponse response = new MfaVerifyResponse();
                response.setMfaCompleted(true);
                response.setVerifiedFactors(session.getVerifiedFactors());
                response.setRequiredFactors(session.getRequiredFactors());
                response.setToken(token);
                response.setUser(user); // Can be simplified to UserDTO
                response.setMessage("MFA completed successfully");

                return ResponseEntity.ok(response);
            } else {
                // More factors needed
                log.info("⏳ MFA partial completion. Verified: {}, Required: {}",
                        session.getVerifiedFactors(), session.getRequiredFactors());

                MfaVerifyResponse response = new MfaVerifyResponse();
                response.setMfaCompleted(false);
                response.setVerifiedFactors(session.getVerifiedFactors());
                response.setRequiredFactors(session.getRequiredFactors());
                response.setMessage("Factor verified. Please complete remaining factors.");

                return ResponseEntity.ok(response);
            }

        } catch (Exception e) {
            log.error("❌ MFA verification error", e);
            return ResponseEntity.status(500).body(createErrorResponse("MFA verification failed: " + e.getMessage()));
        }
    }

    /**
     * Verifies OTP factor
     */
    private boolean verifyOtpFactor(MfaSession session, String otpCode) {
        User user = userRepository.findById(session.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getOtpEnabled() || user.getOtpSecret() == null) {
            log.warn("❌ OTP not enabled for user {}", user.getEmail());
            return false;
        }

        boolean valid = totpService.validateCodeWithTolerance(user.getOtpSecret(), otpCode);
        if (valid) {
            log.info("✅ OTP verified for user {}", user.getEmail());
        } else {
            log.warn("❌ Invalid OTP code for user {}", user.getEmail());
        }
        return valid;
    }

    /**
     * Verifies FACE factor
     * TODO: Implement actual face recognition using face-service
     */
    private boolean verifyFaceFactor(MfaSession session, String imageBase64) {
        // TODO: Call face-service to verify against stored face embedding
        // For now, placeholder logic
        
        log.warn("⚠️ FACE verification not yet implemented - accepting as valid for testing");
        return true; // Placeholder: always accept for now
    }

    /**
     * Helper to create error response
     */
    private MfaVerifyResponse createErrorResponse(String message) {
        MfaVerifyResponse response = new MfaVerifyResponse();
        response.setMfaCompleted(false);
        response.setMessage(message);
        return response;
    }
}
