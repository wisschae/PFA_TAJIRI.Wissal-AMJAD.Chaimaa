/**
 * Gestion de l'état MFA (frontend safe pour démo)
 * Utilise localStorage pour persister l'état entre les pages
 */

const MFA_DONE_KEY = 'mfa_done';

/**
 * Vérifie si l'utilisateur a complété le MFA
 */
export function getMfaDone(): boolean {
    const value = localStorage.getItem(MFA_DONE_KEY);
    return value === 'true';
}

/**
 * Marque le MFA comme complété
 */
export function setMfaDone(value: boolean): void {
    localStorage.setItem(MFA_DONE_KEY, value.toString());
}

/**
 * Réinitialise l'état MFA (appelé au logout)
 */
export function clearMfaDone(): void {
    localStorage.removeItem(MFA_DONE_KEY);
}
