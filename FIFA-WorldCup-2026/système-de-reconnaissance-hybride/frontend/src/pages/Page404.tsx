import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Page 404 - Page Introuvable
 * Affichée quand l'utilisateur accède à une route inexistante
 */
const Page404: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Card principale */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                    {/* Icône */}
                    <div className="inline-block p-6 bg-blue-100 rounded-full mb-6">
                        <svg
                            className="w-20 h-20 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Titre */}
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                        404
                    </h1>

                    {/* Code d'erreur */}
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-mono mb-6">
                        PAGE NOT FOUND
                    </div>

                    {/* Message */}
                    <p className="text-lg text-gray-700 mb-3">
                        Oups ! La page que vous recherchez <strong>n'existe pas</strong>.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Il se peut que le lien soit cassé ou que la page ait été déplacée.
                        Veuillez vérifier l'URL ou retourner à la page d'accueil.
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
                                <span>Vérifier que l'URL est correcte</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Retourner au tableau de bord principal</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Utiliser le bouton précédent de votre navigateur</span>
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

export default Page404;
