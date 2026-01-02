import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User, LoginResponse } from '../types';
import authApi from '../api/authApi';
import { getToken, setToken as saveToken, clearToken, isTokenValid } from '../lib/token';
import { clearMfaDone } from '../lib/mfaState';

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Provider du contexte d'authentification
 * Gère l'état de connexion, le token JWT et l'utilisateur courant
 * ✅ Fix: Ajout de isAuthReady pour éviter les redirections "flash"
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthReady, setIsAuthReady] = useState(false); // ✅ NOUVEAU

    // Au chargement, récupérer et valider le token
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = getToken();
                console.log('🔍 AuthContext Init - Token exists:', !!storedToken);

                // Vérifier si le token existe et est valide
                if (storedToken && isTokenValid(storedToken)) {
                    console.log('✅ Token is valid, setting state...');
                    setToken(storedToken);

                    // ✅ FIX CRITIQUE: Appeler authApi.me() pour récupérer user du backend
                    try {
                        console.log('🔄 Fetching user data from backend...');
                        const userData = await authApi.getCurrentUser();
                        setUser(userData);
                        localStorage.setItem('user', JSON.stringify(userData));
                        console.log('✅ User loaded from backend:', userData.email);
                    } catch (apiError: any) {
                        console.error('❌ Failed to fetch user from API:', apiError);

                        // Si l'API échoue (401, 403, 500), fallback vers localStorage
                        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
                            console.warn('⚠️ Token rejected by backend, clearing auth');
                            clearToken();
                            setToken(null);
                            setUser(null);
                        } else {
                            // Erreur réseau/serveur, utiliser localStorage temporairement
                            console.warn('⚠️ Network error, using cached user from localStorage');
                            const storedUser = localStorage.getItem('user');
                            if (storedUser) {
                                try {
                                    const parsedUser = JSON.parse(storedUser);
                                    setUser(parsedUser);
                                    console.log('✅ User loaded from cache:', parsedUser.email);
                                } catch (error) {
                                    console.error('Error parsing stored user:', error);
                                    localStorage.removeItem('user');
                                }
                            }
                        }
                    }
                } else {
                    // Token absent, invalide ou expiré → nettoyage silencieux
                    if (storedToken) {
                        console.warn('⚠️ Token invalid or expired, clearing...');
                        clearToken();
                    } else {
                        console.log('ℹ️ No token found in localStorage');
                    }
                }
            } catch (error) {
                console.error('❌ Error initializing auth:', error);
                clearToken();
            } finally {
                // ✅ CRITIQUE: Toujours marquer comme "ready" à la fin
                console.log('✅ Auth initialization complete - isAuthReady: true');
                setIsAuthReady(true);
                setIsLoading(false);
            }
        };

        initializeAuth();

        // Écouter les déconnexions globales (déclenchées par http.ts interceptor)
        const handleLogout = () => {
            setToken(null);
            setUser(null);
        };

        window.addEventListener('auth:logout', handleLogout);
        return () => window.removeEventListener('auth:logout', handleLogout);
    }, []);

    /**
     * Fonction de connexion
     * Appelle l'API, stocke le token et redirige si nécessaire
     */
    const login = async (email: string, password: string): Promise<LoginResponse> => {
        const response = await authApi.login({ email, password });

        // Si pas de MFA requis, stocker le token
        if (!response.mfaRequired && response.token) {
            setToken(response.token);
            saveToken(response.token);

            // Récupérer les infos utilisateur si fournies
            if (response.user) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
            } else {
                // Sinon créer un User basique
                const basicUser: User = {
                    id: 0,
                    email,
                    fullName: email.split('@')[0],
                    accessLevel: {
                        id: 1,
                        name: 'PUBLIC',
                        description: '',
                        passwordRequired: true,
                        biometricRequired: false,
                        otpRequired: false,
                        priorityLevel: 1,
                    },
                    active: true,
                    createdAt: new Date().toISOString(),
                    failedLoginAttempts: 0,
                };
                setUser(basicUser);
                localStorage.setItem('user', JSON.stringify(basicUser));
            }

            // ✅ Toast de bienvenue
            toast.success('Bienvenue ! Connexion réussie.', {
                duration: 3000,
                icon: '👋',
            });
        }

        return response;
    };

    /**
     * Fonction de déconnexion
     * Supprime le token et les données utilisateur
     */
    const logout = () => {
        setToken(null);
        setUser(null);
        clearToken(); // ✅ Utiliser le helper centralisé
        clearMfaDone(); // ✅ Clear MFA state on logout

        // ✅ Toast de confirmation
        toast.success('Déconnecté avec succès', {
            duration: 2000,
            icon: '👋',
        });

        // Dispatcher event pour notifier d'autres composants
        window.dispatchEvent(new Event('auth:logout'));
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        isAuthReady, // ✅ EXPOSER isAuthReady
        login,
        logout,
        setUser,
        setToken: (newToken: string | null) => {
            setToken(newToken);
            if (newToken) {
                saveToken(newToken);
            } else {
                clearToken();
            }
        },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
