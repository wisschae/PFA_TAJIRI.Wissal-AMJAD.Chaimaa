package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.user.UserCreateDTO;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.dto.user.UserUpdateDTO;

import java.util.List;

/**
 * Interface du service de gestion des utilisateurs.
 */
public interface UserService {

    /**
     * Crée un nouvel utilisateur.
     *
     * @param userCreateDTO Les données de l'utilisateur à créer
     * @return L'utilisateur créé
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si l'email existe déjà
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si le niveau d'accès n'existe pas
     */
    UserReadDTO createUser(UserCreateDTO userCreateDTO);

    /**
     * Récupère un utilisateur par ID.
     *
     * @param id L'ID de l'utilisateur
     * @return L'utilisateur trouvé
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    UserReadDTO getUserById(Long id);

    /**
     * Récupère un utilisateur par email.
     *
     * @param email L'email de l'utilisateur
     * @return L'utilisateur trouvé
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    UserReadDTO getUserByEmail(String email);

    /**
     * Récupère tous les utilisateurs.
     *
     * @return Liste de tous les utilisateurs
     */
    List<UserReadDTO> getAllUsers();

    /**
     * Récupère uniquement les utilisateurs actifs.
     *
     * @return Liste des utilisateurs actifs
     */
    List<UserReadDTO> getActiveUsers();

    /**
     * Met à jour un utilisateur.
     *
     * @param id L'ID de l'utilisateur à modifier
     * @param userUpdateDTO Les nouvelles données
     * @return L'utilisateur mis à jour
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si validation échoue
     */
    UserReadDTO updateUser(Long id, UserUpdateDTO userUpdateDTO);

    /**
     * Désactive un utilisateur (soft delete).
     *
     * @param id L'ID de l'utilisateur
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    void deactivateUser(Long id);

    /**
     * Supprime définitivement un utilisateur.
     *
     * @param id L'ID de l'utilisateur
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    void deleteUser(Long id);
}
