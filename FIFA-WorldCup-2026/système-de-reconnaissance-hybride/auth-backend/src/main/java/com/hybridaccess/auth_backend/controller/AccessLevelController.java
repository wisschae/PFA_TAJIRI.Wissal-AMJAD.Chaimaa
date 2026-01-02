package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelCreateDTO;
import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;
import com.hybridaccess.auth_backend.service.AccessLevelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des niveaux d'accès.
 * Base URL: /api/v1/access-levels
 */
@RestController
@RequestMapping("/api/v1/access-levels")
@RequiredArgsConstructor
public class AccessLevelController {

    private final AccessLevelService accessLevelService;

    /**
     * Crée un nouveau niveau d'accès.
     * POST /api/v1/access-levels
     */
    @PostMapping
    public ResponseEntity<AccessLevelReadDTO> createAccessLevel(@Valid @RequestBody AccessLevelCreateDTO dto) {
        AccessLevelReadDTO created = accessLevelService.createAccessLevel(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Récupère tous les niveaux d'accès.
     * GET /api/v1/access-levels
     */
    @GetMapping
    public ResponseEntity<List<AccessLevelReadDTO>> getAllAccessLevels() {
        List<AccessLevelReadDTO> levels = accessLevelService.getAllAccessLevels();
        return ResponseEntity.ok(levels);
    }

    /**
     * Récupère un niveau d'accès par ID.
     * GET /api/v1/access-levels/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AccessLevelReadDTO> getAccessLevelById(@PathVariable Long id) {
        AccessLevelReadDTO level = accessLevelService.getAccessLevelById(id);
        return ResponseEntity.ok(level);
    }

    /**
     * Récupère un niveau d'accès par nom.
     * GET /api/v1/access-levels/name/{name}
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<AccessLevelReadDTO> getAccessLevelByName(@PathVariable String name) {
        AccessLevelReadDTO level = accessLevelService.getAccessLevelByName(name);
        return ResponseEntity.ok(level);
    }

    /**
     * Supprime un niveau d'accès.
     * DELETE /api/v1/access-levels/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessLevel(@PathVariable Long id) {
        accessLevelService.deleteAccessLevel(id);
        return ResponseEntity.noContent().build();
    }
}
