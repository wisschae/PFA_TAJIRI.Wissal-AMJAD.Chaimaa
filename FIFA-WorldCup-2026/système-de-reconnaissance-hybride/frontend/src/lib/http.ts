import axios, { AxiosError, AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import { getToken, clearToken } from './token';

/**
 * Instance HTTP centralisée avec gestion robuste des erreurs
 * Remplace l'ancien httpClient.ts avec une meilleure architecture
 */

// Base URL depuis env ou fallback
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const http: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 secondes
});

/**
 * Request Interceptor
 * Ajoute automatiquement le token JWT à chaque requête
 */
http.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Gestion centralisée des erreurs HTTP
 */
http.interceptors.response.use(
    // Succès: retourner la réponse telle quelle
    (response) => response,

    // Erreur: gestion détaillée selon le code HTTP
    (error: AxiosError) => {
        const status = error.response?.status;
        const message = (error.response?.data as any)?.message || error.message;

        // 401 Unauthorized - Session expirée ou token invalide
        if (status === 401) {
            console.warn('401 Unauthorized - Logging out user');

            // Nettoyer le token et les données utilisateur
            clearToken();

            // Dispatch event pour que AuthContext puisse réagir
            window.dispatchEvent(new Event('auth:logout'));

            // Toast d'avertissement
            toast.error('Session expirée. Veuillez vous reconnecter.', {
                duration: 4000,
                icon: '⚠️',
            });

            // Redirection vers login avec raison
            // Utiliser setTimeout pour éviter les conflits avec les navigations en cours
            setTimeout(() => {
                if (!window.location.pathname.includes('/login')) {
                    window.location.assign('/login?reason=session_expired');
                }
            }, 100);
        }

        // 403 Forbidden - Accès refusé (niveau insuffisant)
        else if (status === 403) {
            console.warn('403 Forbidden - Access denied');
            toast.error('Accès interdit : niveau d\'autorisation insuffisant', {
                duration: 4000,
                icon: '🚫',
            });
            // NE PAS déconnecter l'utilisateur, juste afficher le message
        }

        // 500 Internal Server Error
        else if (status === 500) {
            console.error('500 Internal Server Error:', message);
            toast.error('Erreur serveur. Veuillez réessayer plus tard.', {
                duration: 4000,
                icon: '❌',
            });
        }

        // Timeout ou erreur réseau
        else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            console.error('Request timeout:', error);
            toast.error('Le serveur met trop de temps à répondre. Réessayez.', {
                duration: 4000,
                icon: '⏱️',
            });
        }

        // Erreur réseau (pas de réponse du serveur)
        else if (!error.response) {
            console.error('Network error:', error);
            toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.', {
                duration: 5000,
                icon: '🌐',
            });
        }

        // Autres erreurs 4xx
        else if (status && status >= 400 && status < 500) {
            console.warn(`Client error ${status}:`, message);
            // Ne pas afficher de toast pour les 400, laisser les composants gérer
            // (ex: LoginPage affichera "Email ou mot de passe incorrect")
        }

        return Promise.reject(error);
    }
);

export default http;
