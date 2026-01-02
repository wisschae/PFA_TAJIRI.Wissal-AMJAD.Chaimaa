package com.hybridaccess.auth_backend.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

/**
 * Controller pour le health check de l'application.
 * Base URL: /api/v1/health
 */
@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    /**
     * Endpoint de health check.
     * GET /api/v1/health
     */
    @GetMapping
    public ResponseEntity<HealthResponse> health() {
        HealthResponse response = HealthResponse.builder()
                .status("UP")
                .message("Backend Hybrid Access System is running")
                .timestamp(LocalDateTime.now())
                .version("1.0.0")
                .build();
        
        return ResponseEntity.ok(response);
    }

    /**
     * Classe de réponse pour le health check.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HealthResponse {
        private String status;
        private String message;
        private LocalDateTime timestamp;
        private String version;
    }
}
