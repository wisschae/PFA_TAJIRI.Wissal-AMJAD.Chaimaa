package com.hybridaccess.auth_backend.repository;

import com.hybridaccess.auth_backend.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'entité Resource.
 * 
 * Fournit les opérations CRUD et des requêtes pour les ressources protégées.
 */
@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    /**
     * Trouve une ressource par nom.
     * 
     * @param name Le nom de la ressource
     * @return Optional contenant la ressource si trouvée
     */
    Optional<Resource> findByName(String name);

    /**
     * Trouve une ressource par chemin.
     * 
     * @param path Le chemin de la ressource
     * @return Optional contenant la ressource si trouvée
     */
    Optional<Resource> findByResourcePath(String path);

    /**
     * Trouve toutes les ressources sensibles.
     * 
     * @return Liste des ressources sensibles
     */
    List<Resource> findByIsSensitiveTrue();

    /**
     * Trouve les ressources accessibles avec un niveau donné.
     * 
     * @param priorityLevel Le niveau de priorité minimum
     * @return Liste des ressources accessibles
     */
    @Query("SELECT r FROM Resource r WHERE r.minAccessLevel.priorityLevel <= :priorityLevel")
    List<Resource> findAccessibleResources(Integer priorityLevel);
}
