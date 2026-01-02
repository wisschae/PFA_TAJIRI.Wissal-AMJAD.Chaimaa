package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelCreateDTO;
import com.hybridaccess.auth_backend.dto.accesslevel.AccessLevelReadDTO;
import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.exception.BusinessException;
import com.hybridaccess.auth_backend.exception.ResourceNotFoundException;
import com.hybridaccess.auth_backend.repository.AccessLevelRepository;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service de gestion des niveaux d'accès.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class AccessLevelServiceImpl implements AccessLevelService {

    private final AccessLevelRepository accessLevelRepository;
    private final UserRepository userRepository;

    @Override
    public AccessLevelReadDTO createAccessLevel(AccessLevelCreateDTO dto) {
        // Vérifier que le nom n'existe pas déjà
        if (accessLevelRepository.existsByName(dto.getName())) {
            throw new BusinessException("Un niveau d'accès avec ce nom existe déjà : " + dto.getName());
        }

        AccessLevel accessLevel = MapperUtil.toAccessLevelEntity(dto);
        AccessLevel saved = accessLevelRepository.save(accessLevel);
        return MapperUtil.toAccessLevelReadDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AccessLevelReadDTO getAccessLevelById(Long id) {
        AccessLevel accessLevel = accessLevelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "id", id));
        return MapperUtil.toAccessLevelReadDTO(accessLevel);
    }

    @Override
    @Transactional(readOnly = true)
    public AccessLevelReadDTO getAccessLevelByName(String name) {
        AccessLevel accessLevel = accessLevelRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "name", name));
        return MapperUtil.toAccessLevelReadDTO(accessLevel);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccessLevelReadDTO> getAllAccessLevels() {
        return accessLevelRepository.findAll().stream()
                .map(MapperUtil::toAccessLevelReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAccessLevel(Long id) {
        AccessLevel accessLevel = accessLevelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "id", id));

        // Vérifier qu'aucun utilisateur n'utilise ce niveau
        List<?> users = userRepository.findByAccessLevelId(id);
        if (!users.isEmpty()) {
            throw new BusinessException("Impossible de supprimer ce niveau d'accès : " + users.size() + " utilisateur(s) l'utilisent");
        }

        accessLevelRepository.delete(accessLevel);
    }
}
