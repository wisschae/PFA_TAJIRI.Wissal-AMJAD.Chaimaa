package com.hybridaccess.auth_backend.controller;

import com.hybridaccess.auth_backend.dto.user.UserCreateDTO;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.dto.user.UserUpdateDTO;
import com.hybridaccess.auth_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des utilisateurs.
 * Base URL: /api/v1/users
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Crée un nouvel utilisateur.
     * POST /api/v1/users
     */
    @PostMapping
    public ResponseEntity<UserReadDTO> createUser(@Valid @RequestBody UserCreateDTO userCreateDTO) {
        UserReadDTO created = userService.createUser(userCreateDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Récupère tous les utilisateurs.
     * GET /api/v1/users
     */
    @GetMapping
    public ResponseEntity<List<UserReadDTO>> getAllUsers(@RequestParam(required = false) Boolean activeOnly) {
        List<UserReadDTO> users = activeOnly != null && activeOnly
                ? userService.getActiveUsers()
                : userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Récupère un utilisateur par ID.
     * GET /api/v1/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserReadDTO> getUserById(@PathVariable Long id) {
        UserReadDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Récupère un utilisateur par email.
     * GET /api/v1/users/email/{email}
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UserReadDTO> getUserByEmail(@PathVariable String email) {
        UserReadDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Met à jour un utilisateur.
     * PUT /api/v1/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserReadDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        UserReadDTO updated = userService.updateUser(id, userUpdateDTO);
        return ResponseEntity.ok(updated);
    }

    /**
     * Désactive un utilisateur (soft delete).
     * PATCH /api/v1/users/{id}/deactivate
     */
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Supprime définitivement un utilisateur.
     * DELETE /api/v1/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
