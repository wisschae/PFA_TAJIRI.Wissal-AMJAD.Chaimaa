package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.accessevent.AccessEventReadDTO;
import com.hybridaccess.auth_backend.entity.AccessEvent;
import com.hybridaccess.auth_backend.exception.ResourceNotFoundException;
import com.hybridaccess.auth_backend.repository.AccessEventRepository;
import com.hybridaccess.auth_backend.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service de gestion des événements d'accès (read-only).
 * Les événements sont créés par le système d'authentification, jamais manuellement.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccessEventServiceImpl implements AccessEventService {

    private final AccessEventRepository accessEventRepository;

    @Override
    public AccessEventReadDTO getEventById(Long id) {
        AccessEvent event = accessEventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AccessEvent", "id", id));
        return MapperUtil.toAccessEventReadDTO(event);
    }

    @Override
    public List<AccessEventReadDTO> getAllEvents() {
        return accessEventRepository.findAll().stream()
                .map(MapperUtil::toAccessEventReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccessEventReadDTO> getEventsByUserId(Long userId) {
        return accessEventRepository.findByUserId(userId).stream()
                .map(MapperUtil::toAccessEventReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccessEventReadDTO> getEventsByUserIdAndTimeBetween(Long userId, LocalDateTime startTime, LocalDateTime endTime) {
        return accessEventRepository.findByUserIdAndTimeBetween(userId, startTime, endTime).stream()
                .map(MapperUtil::toAccessEventReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccessEventReadDTO> getEventsByStatus(AccessEvent.AccessStatus status) {
        return accessEventRepository.findByStatus(status).stream()
                .map(MapperUtil::toAccessEventReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccessEventReadDTO> getHighRiskEvents(Integer threshold) {
        return accessEventRepository.findHighRiskEvents(threshold).stream()
                .map(MapperUtil::toAccessEventReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long countRecentFailedAttempts(Long userId, LocalDateTime since) {
        return accessEventRepository.countRecentFailedAttempts(userId, since);
    }
}
