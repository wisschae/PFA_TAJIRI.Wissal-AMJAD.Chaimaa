package com.hybridaccess.auth_backend.security;

import com.hybridaccess.auth_backend.entity.AccessLevel;
import com.hybridaccess.auth_backend.entity.User;
import com.hybridaccess.auth_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Service pour charger les détails de l'utilisateur pour Spring Security.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email : " + email));

        // ✅ Créer authorities hiérarchiques
        List<GrantedAuthority> authorities = buildHierarchicalAuthorities(user.getAccessLevel());

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .accountLocked(!user.getActive())
                .build();
    }

    /**
     * Construit les authorities de manière hiérarchique.
     * Un user LEVEL_4 (TOP_SECRET) a aussi les droits LEVEL_3, LEVEL_2, LEVEL_1.
     * 
     * @param level Le niveau d'accès de l'utilisateur
     * @return Liste des authorities hiérarchiques
     */
    private List<GrantedAuthority> buildHierarchicalAuthorities(AccessLevel level) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        int userPriority = level.getPriorityLevel();
        
        // Ajouter tous les niveaux de 1 jusqu'au niveau de l'utilisateur
        for (int i = 1; i <= userPriority; i++) {
            authorities.add(new SimpleGrantedAuthority("ROLE_LEVEL_" + i));
        }
        
        // Optionnel: Ajouter aussi le rôle nominal (PUBLIC, CONFIDENTIEL, etc.)
        authorities.add(new SimpleGrantedAuthority("ROLE_" + level.getName()));
        
        return authorities;
    }

    /**
     * Charge un utilisateur par ID (optionnel, pour usage interne).
     */
    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'ID : " + id));

        // ✅ Utiliser la même logique hiérarchique
        List<GrantedAuthority> authorities = buildHierarchicalAuthorities(user.getAccessLevel());

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .accountLocked(!user.getActive())
                .build();
    }
}
