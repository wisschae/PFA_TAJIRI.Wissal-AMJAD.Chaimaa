package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.user.UserCreateDTO;
import com.hybridaccess.auth_backend.dto.user.UserReadDTO;
import com.hybridaccess.auth_backend.dto.user.UserUpdateDTO;
import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.exception.BusinessException;
import com.hybridaccess.auth_backend.exception.ResourceNotFoundException;
import com.hybridaccess.auth_backend.repository.AccessLevelRepository;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service de gestion des utilisateurs.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AccessLevelRepository accessLevelRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserReadDTO createUser(UserCreateDTO userCreateDTO) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(userCreateDTO.getEmail())) {
            throw new BusinessException("Un utilisateur avec cet email existe déjà : " + userCreateDTO.getEmail());
        }

        // Récupérer le niveau d'accès
        AccessLevel accessLevel = accessLevelRepository.findById(userCreateDTO.getAccessLevelId())
                .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "id", userCreateDTO.getAccessLevelId()));

        // Créer l'utilisateur avec mot de passe hashé
        User user = User.builder()
                .fullName(userCreateDTO.getFullName())
                .email(userCreateDTO.getEmail())
                .password(passwordEncoder.encode(userCreateDTO.getPassword()))
                .accessLevel(accessLevel)
                .active(true)
                .createdAt(LocalDateTime.now())
                .failedLoginAttempts(0)
                .build();

        User savedUser = userRepository.save(user);
        return MapperUtil.toUserReadDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return MapperUtil.toUserReadDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return MapperUtil.toUserReadDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserReadDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(MapperUtil::toUserReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserReadDTO> getActiveUsers() {
        return userRepository.findByActiveTrue().stream()
                .map(MapperUtil::toUserReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserReadDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // Mettre à jour les champs si fournis
        if (userUpdateDTO.getFullName() != null) {
            user.setFullName(userUpdateDTO.getFullName());
        }

        if (userUpdateDTO.getEmail() != null && !userUpdateDTO.getEmail().equals(user.getEmail())) {
            // Vérifier que le nouvel email n'est pas déjà utilisé
            if (userRepository.existsByEmail(userUpdateDTO.getEmail())) {
                throw new BusinessException("Un utilisateur avec cet email existe déjà : " + userUpdateDTO.getEmail());
            }
            user.setEmail(userUpdateDTO.getEmail());
        }

        if (userUpdateDTO.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
        }

        if (userUpdateDTO.getAccessLevelId() != null) {
            AccessLevel accessLevel = accessLevelRepository.findById(userUpdateDTO.getAccessLevelId())
                    .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "id", userUpdateDTO.getAccessLevelId()));
            user.setAccessLevel(accessLevel);
        }

        if (userUpdateDTO.getActive() != null) {
            user.setActive(userUpdateDTO.getActive());
        }

        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return MapperUtil.toUserReadDTO(updatedUser);
    }

    @Override
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }
}
