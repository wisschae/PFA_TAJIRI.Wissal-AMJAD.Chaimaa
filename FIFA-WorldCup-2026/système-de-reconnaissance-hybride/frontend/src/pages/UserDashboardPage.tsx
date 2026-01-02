import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';
import { useAuth } from '../context/AuthContext';

/**
 * Page Dashboard Utilisateur - Tableau de bord personnel
 */
const UserDashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <ResourcePageLayout
            title="Dashboard Utilisateur"
            description="Tableau de bord personnel et espace de travail"
            levelName="PUBLIC"
            levelPriority={1}
            icon="📊"
            requiredFactors={{
                password: true,
                otp: false,
                biometric: false,
            }}
        >
            <div className="space-y-6">
                {/* Informations utilisateur */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Informations de Profil
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Nom complet</p>
                            <p className="font-semibold">{user?.fullName || 'Non défini'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="font-semibold">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Niveau d'accès</p>
                            <span className={`badge badge-${user?.accessLevel.name.toLowerCase()} inline-block`}>
                                {user?.accessLevel.name}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Statut du compte</p>
                            <span className={`inline-flex items-center gap-1 ${user?.active ? 'text-green-600' : 'text-red-600'}`}>
                                <span className={`w-2 h-2 rounded-full ${user?.active ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                {user?.active ? 'Actif' : 'Inactif'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Activité récente */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Activité Récente
                    </h3>
                    <div className="space-y-3">
                        {[
                            { action: 'Connexion réussie', time: 'Il y a 2 minutes', status: 'success' },
                            { action: 'Accès au Dashboard', time: 'Il y a 5 minutes', status: 'success' },
                            { action: 'Consultation des ressources', time: 'Il y a 15 minutes', status: 'success' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-gray-700">{activity.action}</span>
                                </div>
                                <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Raccourcis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="card hover:shadow-xl transition-shadow text-left">
                        <div className="text-3xl mb-2">📁</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Mes Documents</h4>
                        <p className="text-sm text-gray-600">Accéder à vos documents personnels</p>
                    </button>
                    <button className="card hover:shadow-xl transition-shadow text-left">
                        <div className="text-3xl mb-2">⚙️</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Paramètres</h4>
                        <p className="text-sm text-gray-600">Configurer votre compte</p>
                    </button>
                    <button className="card hover:shadow-xl transition-shadow text-left">
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Statistiques</h4>
                        <p className="text-sm text-gray-600">Voir vos statistiques d'utilisation</p>
                    </button>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default UserDashboardPage;
