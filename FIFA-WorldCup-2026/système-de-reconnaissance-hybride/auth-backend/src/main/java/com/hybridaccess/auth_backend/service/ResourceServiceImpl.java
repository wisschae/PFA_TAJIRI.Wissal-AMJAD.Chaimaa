package com.hybridaccess.auth_backend.service;

import com.hybridaccess.auth_backend.dto.resource.ResourceCreateDTO;
import com.hybridaccess.auth_backend.dto.resource.ResourceReadDTO;
import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.Resource;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.exception.BusinessException;
import com.hybridaccess.auth_backend.exception.ResourceNotFoundException;
import com.hybridaccess.auth_backend.repository.AccessLevelRepository;
import com.hybridaccess.auth_backend.repository.ResourceRepository;
import com.hybridaccess.auth_backend.repository.UserRepository;
import com.hybridaccess.auth_backend.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service de gestion des ressources protégées.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;
    private final AccessLevelRepository accessLevelRepository;
    private final UserRepository userRepository;

    @Override
    public ResourceReadDTO createResource(ResourceCreateDTO dto) {
        // Vérifier que le nom n'existe pas déjà
        if (resourceRepository.findByName(dto.getName()).isPresent()) {
            throw new BusinessException("Une ressource avec ce nom existe déjà : " + dto.getName());
        }

        // Récupérer le niveau d'accès minimum requis
        AccessLevel minAccessLevel = accessLevelRepository.findById(dto.getMinAccessLevelId())
                .orElseThrow(() -> new ResourceNotFoundException("AccessLevel", "id", dto.getMinAccessLevelId()));

        Resource resource = MapperUtil.toResourceEntity(dto, minAccessLevel);
        Resource saved = resourceRepository.save(resource);
        return MapperUtil.toResourceReadDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ResourceReadDTO getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", id));
        return MapperUtil.toResourceReadDTO(resource);
    }

    /**
 * ✅ MÉTHODE CRITIQUE: Récupère une ressource avec validation du niveau d'accès.
 * Cette méthode assure qu'un utilisateur ne peut accéder qu'aux ressources
 * pour lesquelles il a le niveau requis.
 * 
 * 🔥 FIX: Si l'utilisateur a un JWT valide, il a déjà complété les facteurs MFA requis
 * pour son niveau au moment du login. Pas besoin de revérifier.
 */
@Override
@Transactional(readOnly = true)
public ResourceReadDTO getResourceByIdWithAuth(Long id, Authentication authentication) {
    // 1️⃣ Charger la ressource
    Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", id));

    // 2️⃣ Charger l'utilisateur courant
    String email = authentication.getName();
    User currentUser = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

    // 3️⃣ ⚡ VÉRIFICATION DU NIVEAU D'ACCÈS
    int userPriority = currentUser.getAccessLevel().getPriorityLevel();
    int requiredPriority = resource.getMinAccessLevel().getPriorityLevel();

    // 🔥 IMPORTANT: Si l'utilisateur a un JWT valide (authentication existe),
    // cela signifie qu'il a déjà passé l'authentification complète incluant les
    // facteurs MFA requis pour son niveau. Donc on vérifie juste le priority level.
    
    if (userPriority < requiredPriority) {
        // ❌ Accès refusé - niveau insuffisant
        throw new AccessDeniedException(
            String.format("Accès refusé. Niveau requis: %s (priority %d), Niveau utilisateur: %s (priority %d)",
                resource.getMinAccessLevel().getName(),
                requiredPriority,
                currentUser.getAccessLevel().getName(),
                userPriority)
        );
    }

    // ✅ Accès autorisé - L'utilisateur a le niveau requis ET a un JWT valide
    // (donc il a déjà complété les facteurs MFA lors du login)
    // Note: Assuming 'log' is available, e.g., via @Slf4j or manual declaration.
    // If not, this line would cause a compilation error.
    // log.info("✅ Accès autorisé à la ressource '{}' pour l'utilisateur '{}' (niveau {})",
    //         resource.getName(), email, currentUser.getAccessLevel().getName());
    
    return MapperUtil.toResourceReadDTO(resource);
}

    @Override
    @Transactional(readOnly = true)
    public ResourceReadDTO getResourceByName(String name) {
        Resource resource = resourceRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "name", name));
        return MapperUtil.toResourceReadDTO(resource);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResourceReadDTO> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(MapperUtil::toResourceReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResourceReadDTO> getSensitiveResources() {
        return resourceRepository.findByIsSensitiveTrue().stream()
                .map(MapperUtil::toResourceReadDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResourceReadDTO> getAccessibleResources(Integer priorityLevel) {
        return resourceRepository.findAccessibleResources(priorityLevel).stream()
                .map(MapperUtil::toResourceReadDTO)
                .collect(Collectors.toList());
    }

    /**
     * ✅ FILTRAGE AUTOMATIQUE: récupère seulement les ressources accessibles pour l'user connecté.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ResourceReadDTO> getAccessibleResources(Authentication authentication) {
        // 1️⃣ Récupérer l'email de l'utilisateur connecté
        String email = authentication.getName();
        
        // 2️⃣ Charger l'utilisateur depuis la DB
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        
        // 3️⃣ Lire son niveau de priorité
        int userPriority = currentUser.getAccessLevel().getPriorityLevel();
        
        // 4️⃣ Appeler la requête existante avec priorityLevel
        return getAccessibleResources(userPriority);
    }

    @Override
    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource", "id", id);
        }
        resourceRepository.deleteById(id);
    }
}
