import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

/**
 * Page d'accueil publique du système
 */
const HomePage: React.FC = () => {
    return (
        <ResourcePageLayout
            title="Page d'Accueil"
            description="Point d'entrée principal du système de reconnaissance hybride"
            levelName="PUBLIC"
            levelPriority={1}
            icon="🌐"
            requiredFactors={{
                password: true,
                otp: false,
                biometric: false,
            }}
        >
            {/* Contenu de la page */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bienvenue */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Bienvenue sur le Système de Reconnaissance Hybride
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Ce système de sécurité innovant utilise une approche multicouche adaptative pour protéger
                        vos ressources sensibles en combinant plusieurs facteurs d'authentification selon le niveau
                        de risque détecté.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note :</strong> Cette page est accessible à tous les utilisateurs authentifiés.
                            Pour accéder aux ressources à niveaux supérieurs, assurez-vous d'avoir les autorisations appropriées.
                        </p>
                    </div>
                </div>

                {/* Statistiques système */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Statistiques du Système
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Ressources disponibles</span>
                            <span className="font-semibold text-lg">8</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Niveaux de sécurité</span>
                            <span className="font-semibold text-lg">4</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Facteurs MFA disponibles</span>
                            <span className="font-semibold text-lg">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Taux de disponibilité</span>
                            <span className="font-semibold text-lg text-green-600">99.9%</span>
                        </div>
                    </div>
                </div>

                {/* Fonctionnalités principales */}
                <div className="card lg:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Fonctionnalités Principales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                            <div className="text-3xl mb-2">🔐</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Authentification Adaptative</h4>
                            <p className="text-sm text-gray-600">
                                Le système ajuste automatiquement les exigences d'authentification selon le niveau de risque
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Gestion des Accès</h4>
                            <p className="text-sm text-gray-600">
                                Contrôle granulaire des permissions par ressource et par niveau utilisateur
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                            <div className="text-3xl mb-2">📝</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Audit Complet</h4>
                            <p className="text-sm text-gray-600">
                                Traçabilité totale de tous les événements d'accès et tentatives de connexion
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default HomePage;
