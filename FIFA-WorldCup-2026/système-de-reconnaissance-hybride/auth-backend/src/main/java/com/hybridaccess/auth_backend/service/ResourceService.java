package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.resource.ResourceCreateDTO;
import com.hybridaccess.auth_backend.dto.resource.ResourceReadDTO;

import java.util.List;

/**
 * Interface du service de gestion des ressources protégées.
 */
public interface ResourceService {

    /**
     * Crée une nouvelle ressource.
     *
     * @param dto Les données de la ressource à créer
     * @return La ressource créée
     * @throws com.hybridaccess.auth_backend.exception.BusinessException si le nom existe déjà
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si l'AccessLevel n'existe pas
     */
    ResourceReadDTO createResource(ResourceCreateDTO dto);

    /**
     * Récupère une ressource par ID.
     *
     * @param id L'ID de la ressource
     * @return La ressource trouvée
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvée
     */
    ResourceReadDTO getResourceById(Long id);

    /**
     * Récupère une ressource par ID avec vérification du niveau d'accès.
     * ✅ VALIDATION CRITIQUE: Vérifie que l'utilisateur a le niveau requis.
     * 
     * @param id L'ID de la ressource
     * @param authentication L'authentification de l'utilisateur courant
     * @return La ressource trouvée
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvée
     * @throws org.springframework.security.access.AccessDeniedException si niveau insuffisant
     */
    ResourceReadDTO getResourceByIdWithAuth(Long id, org.springframework.security.core.Authentication authentication);

    /**
     * Récupère une ressource par nom.
     *
     * @param name Le nom de la ressource
     * @return La ressource trouvée
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvée
     */
    ResourceReadDTO getResourceByName(String name);

    /**
     * Récupère toutes les ressources.
     *
     * @return Liste de toutes les ressources
     */
    List<ResourceReadDTO> getAllResources();

    /**
     * Récupère les ressources sensibles.
     *
     * @return Liste des ressources marquées comme sensibles
     */
    List<ResourceReadDTO> getSensitiveResources();

    /**
     * Récupère les ressources accessibles pour un niveau d'accès donné.
     *
     * @param priorityLevel Le niveau de priorité de l'utilisateur
     * @return Liste des ressources accessibles
     */
    List<ResourceReadDTO> getAccessibleResources(Integer priorityLevel);

    /**
     * Récupère les ressources accessibles pour l'utilisateur authentifié.
     * ✅ FILTRAGE AUTOMATIQUE: Ne renvoie que les ressources que l'user peut voir.
     * 
     * @param authentication L'authentification de l'utilisateur courant
     * @return Liste des ressources accessibles pour ce user
     */
    List<ResourceReadDTO> getAccessibleResources(org.springframework.security.core.Authentication authentication);

    /**
     * Supprime une ressource.
     *
     * @param id L'ID de la ressource à supprimer
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvée
     */
    void deleteResource(Long id);
}
