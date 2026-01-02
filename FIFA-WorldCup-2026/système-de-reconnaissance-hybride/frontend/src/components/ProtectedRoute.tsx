import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredPriority?: number; // Niveau minimum requis (1=PUBLIC, 2=CONFIDENTIEL, 3=SECRET, 4=TOP_SECRET)
}

/**
 * Composant de route protégée avec vérification du niveau d'accès
 * - Vérifie d'abord l'authentification (token JWT)
 * - Puis vérifie le niveau d'accès de l'utilisateur si requiredPriority est spécifié
 * - Redirige vers /login si non authentifié
 * - Redirige vers /403 si niveau insuffisant
 * ✅ Fix: Utilise isAuthReady pour éviter les redirections "flash"
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPriority }) => {
    const { isAuthenticated, isAuthReady, user } = useAuth();

    // ✅ Attendre que l'auth soit complètement initialisée
    if (!isAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Vérification des accès...</p>
                </div>
            </div>
        );
    }

    // ✅ Vérifier l'authentification avec message de redirection
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ message: "Veuillez vous connecter pour accéder à cette page" }}
                replace
            />
        );
    }

    // ✅ Vérifier le niveau d'accès si requis
    if (requiredPriority !== undefined && user) {
        const userPriority = user.accessLevel?.priorityLevel || 1;

        if (userPriority < requiredPriority) {
            // Niveau insuffisant → page 403 avec détails
            return (
                <Navigate
                    to="/403"
                    state={{
                        requiredLevel: requiredPriority,
                        userLevel: userPriority
                    }}
                    replace
                />
            );
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
