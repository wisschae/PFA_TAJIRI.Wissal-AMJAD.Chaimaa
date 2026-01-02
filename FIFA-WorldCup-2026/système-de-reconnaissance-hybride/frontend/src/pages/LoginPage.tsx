import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { MfaState } from '../types';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Afficher le message de redirection si présent (venant de ProtectedRoute)
    useEffect(() => {
        const stateMessage = (location.state as any)?.message;
        if (stateMessage) {
            toast(stateMessage, {
                duration: 4000,
                icon: '🔒',
            });
            // Nettoyer le state pour éviter de réafficher le message
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await login(email, password);

            if (response.mfaRequired) {
                // MFA requis : stocker les infos et rediriger vers /mfa
                const mfaState: MfaState = {
                    sessionId: response.sessionId || '',
                    requiredFactors: response.requiredFactors || [],
                    riskScore: response.riskScore,
                };
                localStorage.setItem('mfa_state', JSON.stringify(mfaState));
                // Store email for face verification
                localStorage.setItem('mfa_email', email);
                navigate('/mfa');
            } else {
                // Pas de MFA : rediriger vers le dashboard
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error('Login error:', err);

            // ✅ Différencier les types d'erreurs pour meilleur UX
            const status = err.response?.status;

            if (status === 401) {
                // Mauvais email/mot de passe
                setError('Email ou mot de passe incorrect');
                toast.error('Email ou mot de passe incorrect', {
                    icon: '❌',
                });
            } else if (status === 500) {
                // Erreur serveur
                setError('Serveur indisponible. Veuillez réessayer plus tard.');
                toast.error('Serveur indisponible', {
                    icon: '🔧',
                });
            } else if (!err.response) {
                // Pas de réponse = problème réseau ou backend down
                setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
                toast.error('Serveur inaccessible', {
                    duration: 5000,
                    icon: '🌐',
                });
            } else {
                // Autre erreur
                const message = err.response?.data?.message || 'Une erreur est survenue';
                setError(message);
                toast.error(message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="max-w-md w-full mx-4">
                {/* Card principale */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Hybrid Access System
                        </h1>
                        <p className="text-sm text-gray-600">
                            Système de reconnaissance hybride multi-niveaux
                        </p>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-danger-light border border-danger text-danger-dark px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="input"
                                placeholder="utilisateur@exemple.com"
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="input"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Connexion en cours...
                                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Info de démo */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            <strong>Compte de test :</strong> test@test.com / password123
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Projet PFE - 5IIR - Chaimaa Amjad
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
