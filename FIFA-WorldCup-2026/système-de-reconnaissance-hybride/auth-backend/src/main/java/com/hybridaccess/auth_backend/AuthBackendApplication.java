package com.hybridaccess.auth_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Point d'entrée principal de l'application Backend Hybrid Access System.
 * 
 * Cette application gère :
 * - L'authentification multi-facteurs (mot de passe, biométrie, OTP)
 * - La gestion des niveaux d'accès
 * - L'évaluation des risques
 * - La journalisation des événements d'accès
 */
@SpringBootApplication
public class AuthBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthBackendApplication.class, args);
    }
}
