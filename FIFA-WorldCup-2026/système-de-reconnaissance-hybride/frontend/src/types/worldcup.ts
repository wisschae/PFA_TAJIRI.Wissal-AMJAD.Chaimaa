/**
 * Types pour le système World Cup 2026
 */

export type AccessFactor = "PASSWORD" | "OTP" | "FACE";

export type ResourceLevel = 1 | 2 | 3 | 4;

export type ResourceAccessState = "ACCESSIBLE" | "MFA_REQUIRED" | "LOCKED_LEVEL";

export type ResourceCategory = "FAN" | "TICKETING" | "OPS" | "SECURITY";

export interface WorldCupResource {
    id: string;
    name: string;
    description: string;
    path: string;
    category: ResourceCategory;
    requiredLevel: ResourceLevel;
    requiredFactors: AccessFactor[];
    sensitive: boolean;
}
