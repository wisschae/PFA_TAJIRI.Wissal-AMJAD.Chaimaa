package com.hybridaccess.auth_backend.repository;

import com.hybridaccess.auth_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'entité User.
 * 
 * Fournit les opérations CRUD et des requêtes personnalisées pour les utilisateurs.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Trouve un utilisateur par email.
     * 
     * @param email L'email de l'utilisateur
     * @return Optional contenant l'utilisateur si trouvé
     */
    Optional<User> findByEmail(String email);

    /**
     * Vérifie si un email existe déjà.
     * 
     * @param email L'email à vérifier
     * @return true si l'email existe
     */
    boolean existsByEmail(String email);

    /**
     * Trouve tous les utilisateurs actifs.
     * 
     * @return Liste des utilisateurs actifs
     */
    List<User> findByActiveTrue();

    /**
     * Trouve les utilisateurs par niveau d'accès.
     * 
     * @param accessLevelId ID du niveau d'accès
     * @return Liste des utilisateurs avec ce niveau
     */
    @Query("SELECT u FROM User u WHERE u.accessLevel.id = :accessLevelId")
    List<User> findByAccessLevelId(Long accessLevelId);

    /**
     * Trouve les utilisateurs ayant échoué plusieurs fois récemment.
     * 
     * @param threshold Nombre minimum de tentatives échouées
     * @return Liste des utilisateurs suspects
     */
    @Query("SELECT u FROM User u WHERE u.failedLoginAttempts >= :threshold")
    List<User> findUsersWithFailedAttempts(int threshold);

    /**
     * Trouve les utilisateurs qui ne se sont pas connectés depuis une certaine date.
     * 
     * @param date Date limite
     * @return Liste des utilisateurs inactifs
     */
    @Query("SELECT u FROM User u WHERE u.lastLogin < :date OR u.lastLogin IS NULL")
    List<User> findInactiveUsers(LocalDateTime date);
}
