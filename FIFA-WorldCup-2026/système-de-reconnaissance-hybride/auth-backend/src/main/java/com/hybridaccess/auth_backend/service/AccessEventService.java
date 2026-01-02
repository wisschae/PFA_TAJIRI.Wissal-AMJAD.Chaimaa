package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.accessevent.AccessEventReadDTO;
import com.hybridaccess.auth_backend.entity.AccessEvent;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Interface du service de gestion des événements d'accès (read-only).
 */
public interface AccessEventService {

    /**
     * Récupère un événement par ID.
     *
     * @param id L'ID de l'événement
     * @return L'événement trouvé
     * @throws com.hybridaccess.auth_backend.exception.ResourceNotFoundException si non trouvé
     */
    AccessEventReadDTO getEventById(Long id);

    /**
     * Récupère tous les événements d'accès.
     *
     * @return Liste de tous les événements
     */
    List<AccessEventReadDTO> getAllEvents();

    /**
     * Récupère les événements d'un utilisateur.
     *
     * @param userId L'ID de l'utilisateur
     * @return Liste des événements de cet utilisateur
     */
    List<AccessEventReadDTO> getEventsByUserId(Long userId);

    /**
     * Récupère les événements d'un utilisateur dans une période donnée.
     *
     * @param userId L'ID de l'utilisateur
     * @param startTime Date de début
     * @param endTime Date de fin
     * @return Liste des événements dans la période
     */
    List<AccessEventReadDTO> getEventsByUserIdAndTimeBetween(Long userId, LocalDateTime startTime, LocalDateTime endTime);

    /**
     * Récupère les événements par statut.
     *
     * @param status Le statut recherché
     * @return Liste des événements avec ce statut
     */
    List<AccessEventReadDTO> getEventsByStatus(AccessEvent.AccessStatus status);

    /**
     * Récupère les événements à risque élevé.
     *
     * @param threshold Score minimum considéré comme à risque
     * @return Liste des événements à risque
     */
    List<AccessEventReadDTO> getHighRiskEvents(Integer threshold);

    /**
     * Compte les tentatives échouées récentes d'un utilisateur.
     *
     * @param userId L'ID de l'utilisateur
     * @param since Date depuis laquelle compter
     * @return Nombre de tentatives échouées
     */
    Long countRecentFailedAttempts(Long userId, LocalDateTime since);
}
