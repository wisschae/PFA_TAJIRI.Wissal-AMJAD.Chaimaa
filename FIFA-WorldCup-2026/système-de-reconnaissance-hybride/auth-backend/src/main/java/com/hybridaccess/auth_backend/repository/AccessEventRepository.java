package com.hybridaccess.auth_backend.repository;

import com.hybridaccess.auth_backend.entity.AccessEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository pour l'entité AccessEvent.
 * 
 * Fournit les opérations de lecture pour les événements d'accès (journalisation).
 */
@Repository
public interface AccessEventRepository extends JpaRepository<AccessEvent, Long> {

    /**
     * Trouve tous les événements d'un utilisateur.
     * 
     * @param userId ID de l'utilisateur
     * @return Liste des événements ordonnés par date décroissante
     */
    @Query("SELECT e FROM AccessEvent e WHERE e.user.id = :userId ORDER BY e.accessTime DESC")
    List<AccessEvent> findByUserId(Long userId);

    /**
     * Trouve les événements d'un utilisateur dans une période donnée.
     * 
     * @param userId ID de l'utilisateur
     * @param startTime Date de début
     * @param endTime Date de fin
     * @return Liste des événements dans la période
     */
    @Query("SELECT e FROM AccessEvent e WHERE e.user.id = :userId AND e.accessTime BETWEEN :startTime AND :endTime ORDER BY e.accessTime DESC")
    List<AccessEvent> findByUserIdAndTimeBetween(Long userId, LocalDateTime startTime, LocalDateTime endTime);

    /**
     * Trouve les événements par statut.
     * 
     * @param status Le statut recherché
     * @return Liste des événements avec ce statut
     */
    List<AccessEvent> findByStatus(AccessEvent.AccessStatus status);

    /**
     * Compte les tentatives échouées récentes d'un utilisateur.
     * 
     * @param userId ID de l'utilisateur
     * @param since Date depuis laquelle compter
     * @return Nombre de tentatives échouées
     */
    @Query("SELECT COUNT(e) FROM AccessEvent e WHERE e.user.id = :userId AND e.status = 'DENIED' AND e.accessTime >= :since")
    Long countRecentFailedAttempts(Long userId, LocalDateTime since);

    /**
     * Trouve les événements avec un score de risque élevé.
     * 
     * @param threshold Score minimum considéré comme élevé
     * @return Liste des événements à risque
     */
    @Query("SELECT e FROM AccessEvent e WHERE e.riskScore >= :threshold ORDER BY e.riskScore DESC, e.accessTime DESC")
    List<AccessEvent> findHighRiskEvents(Integer threshold);

    /**
     * Récupère les derniers événements (pour dashboard admin).
     * 
     * @param limit Nombre d'événements à récupérer
     * @return Liste des derniers événements
     */
    @Query(value = "SELECT e FROM AccessEvent e ORDER BY e.accessTime DESC")
    List<AccessEvent> findRecentEvents();
}
