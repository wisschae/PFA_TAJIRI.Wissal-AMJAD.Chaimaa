package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.resource.ResourceCreateDTO;
import com.hybridaccess.auth_backend.dto.resource.ResourceReadDTO;
import com.hybridaccess.auth_backend.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des ressources protégées.
 * Base URL: /api/v1/resources
 */
@RestController
@RequestMapping("/api/v1/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    /**
     * Crée une nouvelle ressource.
     * POST /api/v1/resources
     * ✅ Réservé aux administrateurs (niveau 4 uniquement)
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_LEVEL_4')")
    public ResponseEntity<ResourceReadDTO> createResource(@Valid @RequestBody ResourceCreateDTO dto) {
        ResourceReadDTO created = resourceService.createResource(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Récupère les ressources accessibles pour l'utilisateur connecté.
     * GET /api/v1/resources
     * ✅ FILTRAGE AUTOMATIQUE: Ne renvoie que les ressources accessibles selon le niveau user
     */
    @GetMapping
    public ResponseEntity<List<ResourceReadDTO>> getAllResources(Authentication authentication) {
        // ✅ Appeler la nouvelle méthode qui filtre automatiquement selon le niveau user
        List<ResourceReadDTO> resources = resourceService.getAccessibleResources(authentication);
        return ResponseEntity.ok(resources);
    }

    /**
     * Récupère une ressource par ID avec validation du niveau d'accès.
     * GET /api/v1/resources/{id}
     * ✅ PROTECTION: Throw 403 si niveau insuffisant
     */
    @GetMapping("/{id}")
    public ResponseEntity<ResourceReadDTO> getResourceById(
            @PathVariable Long id, 
            Authentication authentication) {
        // ✅ Utiliser la méthode avec validation d'accès
        ResourceReadDTO resource = resourceService.getResourceByIdWithAuth(id, authentication);
        return ResponseEntity.ok(resource);
    }

    /**
     * Récupère une ressource par nom.
     * GET /api/v1/resources/name/{name}
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<ResourceReadDTO> getResourceByName(@PathVariable String name) {
        ResourceReadDTO resource = resourceService.getResourceByName(name);
        return ResponseEntity.ok(resource);
    }

    /**
     * Supprime une ressource.
     * DELETE /api/v1/resources/{id}
     * ✅ Réservé aux administrateurs (niveau 4 uniquement)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_LEVEL_4')")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}
