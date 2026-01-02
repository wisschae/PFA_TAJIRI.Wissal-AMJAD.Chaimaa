/**
 * Centralized Token Management
 * Source unique pour toute manipulation de token JWT
 * ⛔ Ne JAMAIS accéder directement à localStorage.getItem('token') ailleurs
 */

const TOKEN_KEY = 'token';

/**
 * Récupère le token JWT depuis localStorage
 */
export function getToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error reading token from localStorage:', error);
        return null;
    }
}

/**
 * Stocke le token JWT dans localStorage
 */
export function setToken(token: string): void {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error saving token to localStorage:', error);
    }
}

/**
 * Supprime le token JWT et toutes les données utilisateur
 */
export function clearToken(): void {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('user');
        localStorage.removeItem('mfa_state');
        localStorage.removeItem('mfa_email');
    } catch (error) {
        console.error('Error clearing token from localStorage:', error);
    }
}

/**
 * Décode le payload d'un token JWT (base64)
 * Retourne null si le token est invalide ou corrompu
 */
export function getTokenPayload(token: string): any | null {
    try {
        // Un JWT est composé de 3 parties séparées par des points: header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        // Le payload est la 2ème partie (index 1)
        const payload = parts[1];

        // Décoder base64url -> JSON
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
}

/**
 * Vérifie si un token JWT est valide (non expiré, bien formé)
 * @returns true si le token est valide, false sinon
 */
export function isTokenValid(token: string | null): boolean {
    if (!token) {
        return false;
    }

    try {
        const payload = getTokenPayload(token);
        if (!payload) {
            return false;
        }

        // Vérifier l'expiration (exp est en secondes, Date.now() en millisecondes)
        if (payload.exp) {
            const expirationTime = payload.exp * 1000;
            const now = Date.now();

            if (now >= expirationTime) {
                console.warn('Token expired');
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}
