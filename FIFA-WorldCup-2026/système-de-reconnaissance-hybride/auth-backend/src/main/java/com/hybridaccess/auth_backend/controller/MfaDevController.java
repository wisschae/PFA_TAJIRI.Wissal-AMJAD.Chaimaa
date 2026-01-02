package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.AccessLevelRepository;
import com.hybridaccess.auth_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour la gestion du MFA (Dev/Testing uniquement)
 * 
 * ATTENTION: Ces endpoints sont pour le développement uniquement.
 * En production, ils devraient être sécurisés ou supprimés.
 */
@RestController
@RequestMapping("/api/v1/dev/mfa")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MfaDevController {

    private final UserRepository userRepository;
    private final AccessLevelRepository accessLevelRepository;

    /**
     * Désactive le MFA pour un utilisateur (pour tests)
     * 
     * @param email Email de l'utilisateur
     * @return Statut de l'opération
     */
    @PostMapping("/disable")
    public ResponseEntity<Map<String, Object>> disableMfa(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        user.setOtpEnabled(false);
        user.setOtpSecret(null);
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "MFA disabled for user: " + email);
        response.put("email", email);
        response.put("otpEnabled", false);

        return ResponseEntity.ok(response);
    }

    /**
     * Active le MFA pour un utilisateur
     * 
     * @param email Email de l'utilisateur
     * @return Statut de l'opération
     */
    @PostMapping("/enable")
    public ResponseEntity<Map<String, Object>> enableMfa(
            @RequestParam String email,
            @RequestParam(required = false) String otpSecret) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        user.setOtpEnabled(true);
        if (otpSecret != null && !otpSecret.isEmpty()) {
            user.setOtpSecret(otpSecret);
        }
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "MFA enabled for user: " + email);
        response.put("email", email);
        response.put("otpEnabled", true);

        return ResponseEntity.ok(response);
    }

    /**
     * Vérifie le statut MFA d'un utilisateur
     * 
     * @param email Email de l'utilisateur
     * @return Statut MFA
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getMfaStatus(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("otpEnabled", user.getOtpEnabled() != null ? user.getOtpEnabled() : false);
        response.put("hasOtpSecret", user.getOtpSecret() != null && !user.getOtpSecret().isEmpty());
        response.put("fullName", user.getFullName());

        return ResponseEntity.ok(response);
    }

    /**
     * Upgrade user access level (pour tests)
     * 
     * @param email Email de l'utilisateur
     * @param priorityLevel Niveau de priorité (1=PUBLIC, 2=CONFIDENTIEL, 3=SECRET, 4=TOP_SECRET)
     * @return Statut
     */
    @PostMapping("/upgrade-access")
    public ResponseEntity<Map<String, Object>> upgradeAccess(
            @RequestParam String email,
            @RequestParam(defaultValue = "4") int priorityLevel) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        AccessLevel newLevel = accessLevelRepository.findByPriorityLevel(priorityLevel)
                .orElseThrow(() -> new RuntimeException("Access level not found: " + priorityLevel));

        String oldLevelName = user.getAccessLevel().getName();
        user.setAccessLevel(newLevel);
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Access level upgraded successfully");
        response.put("email", email);
        response.put("oldLevel", oldLevelName);
        response.put("newLevel", newLevel.getName());
        response.put("priorityLevel", newLevel.getPriorityLevel());

        return ResponseEntity.ok(response);
    }
}
