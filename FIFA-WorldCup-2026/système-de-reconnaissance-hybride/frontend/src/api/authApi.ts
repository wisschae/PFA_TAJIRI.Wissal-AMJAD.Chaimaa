import http from '../lib/http';
import { LoginRequest, LoginResponse, RegisterRequest, MfaVerifyRequest, User } from '../types';

/**
 * Service d'authentification
 * Gère login, register et MFA
 */
class AuthService {
    /**
     * Connexion utilisateur
     */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await http.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    }

    /**
     * Inscription d'un nouvel utilisateur
     */
    async register(data: RegisterRequest): Promise<User> {
        const response = await http.post<User>('/auth/register', data);
        return response.data;
    }

    /**
     * Vérification MFA
     */
    async verifyMfa(data: MfaVerifyRequest): Promise<LoginResponse> {
        const response = await http.post<LoginResponse>('/auth/mfa/verify', data);
        return response.data;
    }

    /**
     * Récupérer les informations de l'utilisateur connecté
     */
    async getCurrentUser(): Promise<User> {
        const response = await http.get<User>('/auth/me');
        return response.data;
    }

    /**
     * Alias pour getCurrentUser (utilisé dans MFA flow)
     * ✅ FIX: Explicitement défini pour éviter lint errors
     */
    async me(): Promise<User> {
        const response = await http.get<User>('/auth/me');
        return response.data;
    }

    // ========== OTP / Google Authenticator (PUBLIC ENDPOINTS - NO AUTH REQUIRED) ==========

    /**
     * Initier la configuration OTP (génère QR code)
     * Uses the authenticated user's email from JWT token
     */
    async setupOtp(): Promise<{ secret: string; qrCodeUri: string; email: string }> {
        // Use /auth/otp/setup which requires authentication (JWT)
        const response = await http.post('/auth/otp/setup');
        return response.data;
    }

    /**
     * Vérifier le code OTP lors du setup et activer l'OTP
     * Uses authenticated user from JWT token
     */
    async verifyOtpSetup(secret: string, code: string): Promise<{ success: boolean; message: string }> {
        // Use /auth/otp/verify-setup which requires authentication
        const response = await http.post('/auth/otp/verify-setup', { secret, code });
        return response.data;
    }

    /**
     * Désactiver l'OTP pour l'utilisateur
     */
    async disableOtp(): Promise<{ success: boolean; message: string }> {
        const response = await http.post('/auth/otp/disable');
        return response.data;
    }

    /**
     * Vérifier le statut OTP de l'utilisateur connecté
     * Uses authenticated user from JWT token
     */
    async getOtpStatus(): Promise<{ email: string; otpEnabled: boolean; hasSecret: boolean }> {
        // Use /auth/otp/status which requires authentication
        const response = await http.get('/auth/otp/status');
        return response.data;
    }
}

export default new AuthService();
