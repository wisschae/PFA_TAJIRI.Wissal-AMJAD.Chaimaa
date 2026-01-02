package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelCreateDTO;
import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;

import java.util.List;

/**
 * Interface du service de gestion des niveaux d'accès.
 */
public interface AccessLevelService {

    /**
     * Crée un nouveau niveau d'accès.
     *
     * @param dto Les données du niveau à créer
     * @return Le niveau d'accès créé
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si le nom existe déjà
     */
    AccessLevelReadDTO createAccessLevel(AccessLevelCreateDTO dto);

    /**
     * Récupère un niveau d'accès par ID.
     *
     * @param id L'ID du niveau
     * @return Le niveau trouvé
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    AccessLevelReadDTO getAccessLevelById(Long id);

    /**
     * Récupère un niveau d'accès par nom.
     *
     * @param name Le nom du niveau (ex: LEVEL_1, ADMIN)
     * @return Le niveau trouvé
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    AccessLevelReadDTO getAccessLevelByName(String name);

    /**
     * Récupère tous les niveaux d'accès.
     *
     * @return Liste de tous les niveaux
     */
    List<AccessLevelReadDTO> getAllAccessLevels();

    /**
     * Supprime un niveau d'accès.
     *
     * @param id L'ID du niveau à supprimer
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si des utilisateurs l'utilisent
     */
    void deleteAccessLevel(Long id);
}
