/**
 * Logique d'accès aux ressources World Cup 2026
 * SOURCE DE VÉRITÉ pour les états d'accès
 */

import { WorldCupResource, ResourceAccessState } from '../types/worldcup';
import { getMfaDone } from './mfaState';

interface User {
    priorityLevel?: number;
    accessLevel?: {
        priorityLevel?: number;
    };
}

/**
 * Récupère le niveau de priorité de l'utilisateur
 * Supporte plusieurs structures de données pour compatibilité
 */
export function getUserPriority(user: User | null): number {
    if (!user) {
        console.log('🔍 getUserPriority: No user, defaulting to 1');
        return 1;
    }

    console.log('🔍 getUserPriority - User object:', user);

    // Essayer user.priorityLevel directement
    if (user.priorityLevel !== undefined && user.priorityLevel !== null) {
        console.log(`✅ Found user.priorityLevel: ${user.priorityLevel}`);
        return user.priorityLevel;
    }

    // Essayer user.accessLevel.priorityLevel
    if (user.accessLevel?.priorityLevel !== undefined && user.accessLevel?.priorityLevel !== null) {
        console.log(`✅ Found user.accessLevel.priorityLevel: ${user.accessLevel.priorityLevel}`);
        return user.accessLevel.priorityLevel;
    }

    // ⚠️ IMPORTANT: Si connecté mais pas de priorityLevel, assumer niveau 4 (admin)
    // Car si l'utilisateur peut se connecter, il devrait avoir accès à tout
    console.warn('⚠️ User has NO priorityLevel, defaulting to 4 (highest)');
    return 4;
}

/**
 * Calcule l'état d'accès pour une ressource donnée
 * FONCTION CLÉ DU SYSTÈME
 */
export function computeAccessState(
    user: User | null,
    resource: WorldCupResource
): ResourceAccessState {
    // Pas d'utilisateur = toujours locked
    if (!user) {
        return "LOCKED_LEVEL";
    }

    const userPriority = getUserPriority(user);

    // Vérifier si la ressource nécessite seulement PASSWORD
    const isPasswordOnly = resource.requiredFactors.length === 1 &&
        resource.requiredFactors[0] === "PASSWORD";

    // Si PASSWORD seulement ET user connecté → TOUJOURS accessible
    if (isPasswordOnly && userPriority >= resource.requiredLevel) {
        return "ACCESSIBLE";
    }

    // Niveau insuffisant
    if (userPriority < resource.requiredLevel) {
        return "LOCKED_LEVEL";
    }

    // Vérifier si MFA est requis
    const needsMfa =
        resource.requiredFactors.includes("OTP") ||
        resource.requiredFactors.includes("FACE");

    // MFA requis mais pas complété
    if (needsMfa && !getMfaDone()) {
        return "MFA_REQUIRED";
    }

    // Accès autorisé
    return "ACCESSIBLE";
}

/**
 * Récupère le label du niveau d'accès
 */
export function getLevelLabel(level: number): string {
    const labels: Record<number, string> = {
        1: "PUBLIC",
        2: "CONFIDENTIEL",
        3: "SECRET",
        4: "TOP SECRET"
    };
    return labels[level] || "UNKNOWN";
}

/**
 * Récupère la couleur du niveau
 */
export function getLevelColor(level: number): string {
    const colors: Record<number, string> = {
        1: "green",
        2: "blue",
        3: "orange",
        4: "red"
    };
    return colors[level] || "gray";
}
