import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Page 403 - Accès Refusé
 * Affichée quand l'utilisateur n'a pas le niveau d'accès requis pour une ressource
 */
const Page403: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Card principale */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                    {/* Icône */}
                    <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
                        <svg
                            className="w-20 h-20 text-red-600"
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

                    {/* Titre */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Accès Refusé
                    </h1>

                    {/* Code d'erreur */}
                    <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-mono mb-6">
                        ERREUR 403 - FORBIDDEN
                    </div>

                    {/* Message */}
                    <p className="text-lg text-gray-700 mb-3">
                        Vous n'avez pas le <strong>niveau d'accès requis</strong> pour accéder à cette ressource.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Cette page nécessite un niveau d'autorisation supérieur au vôtre.
                        Veuillez contacter votre administrateur système pour demander une élévation de privilèges.
                    </p>

                    {/* Informations */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Que puis-je faire ?
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Retourner au tableau de bord et accéder aux ressources disponibles pour votre niveau</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Contacter l'administrateur système pour une demande de niveau d'accès supérieur</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Vérifier que vous êtes connecté avec le bon compte utilisateur</span>
                            </li>
                        </ul>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-primary inline-flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Retour au Dashboard
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary inline-flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Page Précédente
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Système de Reconnaissance Hybride - Contrôle d'Accès Multi-Niveaux
                </p>
            </div>
        </div>
    );
};

export default Page403;
