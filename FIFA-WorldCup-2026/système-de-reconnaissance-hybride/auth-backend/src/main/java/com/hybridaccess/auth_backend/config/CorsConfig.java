package com.hybridaccess.auth_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * Configuration CORS pour permettre les appels depuis le frontend.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Origines autorisées (frontend React)
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",  // Vite dev server
                "http://localhost:3000"   // Alternative (CRA)
        ));
        
        // Méthodes HTTP autorisées
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // Headers autorisés
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Autoriser les credentials (cookies, etc.)
        config.setAllowCredentials(true);
        
        // Durée de cache de la requête preflight
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        
        return new CorsFilter(source);
    }
}
