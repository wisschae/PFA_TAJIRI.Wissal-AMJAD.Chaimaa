/**
 * Source de vérité des ressources World Cup 2026
 * ATTENTION: Les paths DOIVENT correspondre exactement au routing
 */

import { WorldCupResource } from '../types/worldcup';

export const WORLD_CUP_RESOURCES: WorldCupResource[] = [
    // ========== PUBLIC (Level 1) ==========
    {
        id: 'wc2026-fanzone-live',
        name: 'Fan Zone Live Hub',
        description: 'Centre live des matchs, actualités en temps réel et pulse des supporters',
        path: '/wc2026/fanzone/live',
        category: 'FAN',
        requiredLevel: 1,
        requiredFactors: ['PASSWORD'],
        sensitive: false
    },
    {
        id: 'wc2026-predictions',
        name: 'Match Predictions',
        description: 'Système de prédictions de matchs avec classement et statistiques',
        path: '/wc2026/predictions',
        category: 'FAN',
        requiredLevel: 1,
        requiredFactors: ['PASSWORD'],
        sensitive: false
    },

    // ========== CONFIDENTIEL (Level 2) ==========
    {
        id: 'wc2026-ticket-reservations',
        name: 'Ticket Reservation Center',
        description: 'Centre de réservation de billets avec sélection de sièges et génération QR',
        path: '/wc2026/tickets/reservations',
        category: 'TICKETING',
        requiredLevel: 2,
        requiredFactors: ['PASSWORD', 'OTP'],
        sensitive: true
    },
    {
        id: 'wc2026-vip-hospitality',
        name: 'VIP Hospitality Lounge',
        description: 'Espace exclusif VIP avec offres premium et demandes de callback',
        path: '/wc2026/vip/hospitality',
        category: 'TICKETING',
        requiredLevel: 2,
        requiredFactors: ['PASSWORD', 'OTP'],
        sensitive: true
    },

    // ========== SECRET (Level 3) ==========
    {
        id: 'wc2026-team-travel',
        name: 'Team Travel & Hotels',
        description: 'Gestion des déplacements des équipes, hôtels et itinéraires',
        path: '/wc2026/ops/team-travel',
        category: 'OPS',
        requiredLevel: 3,
        requiredFactors: ['PASSWORD', 'FACE'],
        sensitive: true
    },
    {
        id: 'wc2026-stadium-ops',
        name: 'Stadium Operations',
        description: 'Planification des shifts, maintenance et statut des portes',
        path: '/wc2026/ops/stadium',
        category: 'OPS',
        requiredLevel: 3,
        requiredFactors: ['PASSWORD', 'FACE'],
        sensitive: true
    },

    // ========== TOP SECRET (Level 4) ==========
    {
        id: 'wc2026-security-control',
        name: 'Security Control Room',
        description: 'Salle de contrôle sécurité avec timeline incidents et gestion menaces',
        path: '/wc2026/security/control-room',
        category: 'SECURITY',
        requiredLevel: 4,
        requiredFactors: ['PASSWORD', 'OTP', 'FACE'],
        sensitive: true
    },
    {
        id: 'wc2026-crypto-vault',
        name: 'Encryption & Credentials Vault',
        description: 'Coffre-fort cryptographique avec secrets masqués et audit trail',
        path: '/wc2026/security/crypto-vault',
        category: 'SECURITY',
        requiredLevel: 4,
        requiredFactors: ['PASSWORD', 'OTP', 'FACE'],
        sensitive: true
    }
];

/**
 * Récupère une ressource par son path
 */
export function getResourceByPath(path: string): WorldCupResource | undefined {
    return WORLD_CUP_RESOURCES.find(r => r.path === path);
}

/**
 * Récupère les ressources par niveau
 */
export function getResourcesByLevel(level: number): WorldCupResource[] {
    return WORLD_CUP_RESOURCES.filter(r => r.requiredLevel === level);
}

/**
 * Récupère les ressources par catégorie
 */
export function getResourcesByCategory(category: string): WorldCupResource[] {
    return WORLD_CUP_RESOURCES.filter(r => r.category === category);
}
