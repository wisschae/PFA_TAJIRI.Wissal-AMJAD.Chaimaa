package com.hybridaccess.auth_backend.repository;

import com.hybridaccess.auth_backend.entity.AccessLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour l'entité AccessLevel.
 * 
 * Fournit les opérations CRUD et des requêtes pour les niveaux d'accès.
 */
@Repository
public interface AccessLevelRepository extends JpaRepository<AccessLevel, Long> {

    /**
     * Trouve un niveau d'accès par nom.
     * 
     * @param name Le nom du niveau (ex: "LEVEL_1", "ADMIN")
     * @return Optional contenant le niveau si trouvé
     */
    Optional<AccessLevel> findByName(String name);

    /**
     * Trouve un niveau d'accès par priorité.
     * 
     * @param priorityLevel Le niveau de priorité (1-4)
     * @return Optional contenant le niveau si trouvé
     */
    Optional<AccessLevel> findByPriorityLevel(Integer priorityLevel);

    /**
     * Vérifie si un niveau d'accès existe par nom.
     * 
     * @param name Le nom du niveau
     * @return true si le niveau existe
     */
    boolean existsByName(String name);
}
