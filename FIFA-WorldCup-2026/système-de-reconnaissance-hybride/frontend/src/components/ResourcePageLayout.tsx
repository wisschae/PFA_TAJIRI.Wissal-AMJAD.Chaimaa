import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ResourcePageLayoutProps {
    title: string;
    description: string;
    levelName: string;
    levelPriority: number;
    icon: ReactNode;
    requiredFactors: {
        password: boolean;
        otp: boolean;
        biometric: boolean;
    };
    children: ReactNode;
}

/**
 * Layout réutilisable pour toutes les pages de ressources
 */
const ResourcePageLayout: React.FC<ResourcePageLayoutProps> = ({
    title,
    description,
    levelName,
    levelPriority,
    icon,
    requiredFactors,
    children,
}) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const getLevelBadgeClass = (level: string) => {
        switch (level) {
            case 'PUBLIC': return 'badge-public';
            case 'CONFIDENTIEL': return 'badge-confidentiel';
            case 'SECRET': return 'badge-secret';
            case 'TOP_SECRET': return 'badge-top-secret';
            default: return 'badge-public';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Retour au Dashboard</span>
                        </button>

                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="btn btn-secondary flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Titre et description */}
                <div className="mb-8">
                    <div className="flex  items-center gap-4 mb-4">
                        <div className="text-5xl">{icon}</div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                            <p className="text-gray-600 mt-1">{description}</p>
                        </div>
                    </div>

                    {/* Informations de sécurité */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informations de Sécurité
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Niveau d'accès requis */}
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Niveau d'accès minimum requis :</p>
                                <span className={`badge ${getLevelBadgeClass(levelName)} text-base`}>
                                    {levelName} (Niveau {levelPriority})
                                </span>
                            </div>

                            {/* Facteurs MFA requis */}
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Facteurs d'authentification requis :</p>
                                <div className="flex gap-2">
                                    {requiredFactors.password && (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm" title="Mot de passe requis">
                                            🔑 Mot de passe
                                        </span>
                                    )}
                                    {requiredFactors.otp && (
                                        <span className="inline-flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full text-sm" title="Code OTP requis">
                                            📱 OTP
                                        </span>
                                    )}
                                    {requiredFactors.biometric && (
                                        <span className="inline-flex items-center gap-1 bg-purple-100 px-3 py-1 rounded-full text-sm" title="Biométrie requise">
                                            👁️ Biométrie
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenu de la page */}
                {children}
            </main>
        </div>
    );
};

export default ResourcePageLayout;
