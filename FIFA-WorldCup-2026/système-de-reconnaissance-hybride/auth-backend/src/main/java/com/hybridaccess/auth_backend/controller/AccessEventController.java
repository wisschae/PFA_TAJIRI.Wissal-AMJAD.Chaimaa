package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.accessevent.AccessEventReadDTO;
import com.hybridaccess.auth_backend.entity.AccessEvent;
import com.hybridaccess.auth_backend.service.AccessEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Controller REST pour la consultation des événements d'accès (read-only).
 * Base URL: /api/v1/access-events
 */
@RestController
@RequestMapping("/api/v1/access-events")
@RequiredArgsConstructor
public class AccessEventController {

    private final AccessEventService accessEventService;

    /**
     * Récupère tous les événements d'accès.
     * GET /api/v1/access-events
     */
    @GetMapping
    public ResponseEntity<List<AccessEventReadDTO>> getAllEvents(
            @RequestParam(required = false) AccessEvent.AccessStatus status,
            @RequestParam(required = false) Integer riskThreshold) {
        
        List<AccessEventReadDTO> events;
        
        if (status != null) {
            events = accessEventService.getEventsByStatus(status);
        } else if (riskThreshold != null) {
            events = accessEventService.getHighRiskEvents(riskThreshold);
        } else {
            events = accessEventService.getAllEvents();
        }
        
        return ResponseEntity.ok(events);
    }

    /**
     * Récupère un événement par ID.
     * GET /api/v1/access-events/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AccessEventReadDTO> getEventById(@PathVariable Long id) {
        AccessEventReadDTO event = accessEventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    /**
     * Récupère les événements d'un utilisateur.
     * GET /api/v1/access-events/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AccessEventReadDTO>> getEventsByUserId(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        
        List<AccessEventReadDTO> events;
        
        if (startTime != null && endTime != null) {
            events = accessEventService.getEventsByUserIdAndTimeBetween(userId, startTime, endTime);
        } else {
            events = accessEventService.getEventsByUserId(userId);
        }
        
        return ResponseEntity.ok(events);
    }

    /**
     * Compte les tentatives échouées récentes d'un utilisateur.
     * GET /api/v1/access-events/user/{userId}/failed-attempts
     */
    @GetMapping("/user/{userId}/failed-attempts")
    public ResponseEntity<Long> countRecentFailedAttempts(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since) {
        
        LocalDateTime sinceTime = since != null ? since : LocalDateTime.now().minusHours(24);
        Long count = accessEventService.countRecentFailedAttempts(userId, sinceTime);
        
        return ResponseEntity.ok(count);
    }
}
