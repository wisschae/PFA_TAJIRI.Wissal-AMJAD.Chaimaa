// ============================================================================
// Authentication Types
// ============================================================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
}

export interface LoginResponse {
    token?: string;
    mfaRequired: boolean;
    requiredFactors?: string[];
    sessionId?: string;
    riskScore: number;
    message?: string;
    user?: User; // User data returned after successful MFA verification
}

export interface MfaVerifyRequest {
    sessionId: string;
    factorType: string; // "FACE" | "OTP"
    factorData: string;
    imageBase64?: string; // For FACE factor - base64-encoded webcam capture
}

// ============================================================================
// User & Access Level Types
// ============================================================================

export interface AccessLevel {
    id: number;
    name: string; // "PUBLIC" | "CONFIDENTIEL" | "SECRET" | "TOP_SECRET"
    description: string;
    passwordRequired: boolean;
    biometricRequired: boolean;
    otpRequired: boolean;
    priorityLevel: number;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    accessLevel: AccessLevel;
    active: boolean;
    createdAt: string;
    lastLogin?: string;
    failedLoginAttempts: number;
}

// ============================================================================
// Resource Types
// ============================================================================

export interface Resource {
    id: number;
    name: string;
    description: string;
    minAccessLevel: AccessLevel;
    resourcePath: string;
    isSensitive: boolean;
}

// ============================================================================
// Access Event Types
// ============================================================================

export interface AccessEvent {
    id: number;
    userId: number;
    resourceId?: number;
    accessTime: string;
    status: 'GRANTED' | 'DENIED' | 'MFA_REQUIRED';
    methodUsed: string;
    ipAddress: string;
    userAgent: string;
    riskScore: number;
    failureReason?: string;
}

// ============================================================================
// Context/State Types
// ============================================================================

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isAuthReady: boolean; // ✅ NOUVEAU: pour éviter les flash redirects
    login: (email: string, password: string) => Promise<LoginResponse>;
    logout: () => void;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
}


export interface MfaState {
    sessionId: string;
    requiredFactors: string[];
    riskScore: number;
}
