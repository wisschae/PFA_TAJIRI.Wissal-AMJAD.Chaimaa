import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WORLD_CUP_RESOURCES } from '../data/worldcupResources';
import WorldCupResourceCard from '../components/worldcup/WorldCupResourceCard';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Grouper par niveau
    const level1 = WORLD_CUP_RESOURCES.filter(r => r.requiredLevel === 1);
    const level2 = WORLD_CUP_RESOURCES.filter(r => r.requiredLevel === 2);
    const level3 = WORLD_CUP_RESOURCES.filter(r => r.requiredLevel === 3);
    const level4 = WORLD_CUP_RESOURCES.filter(r => r.requiredLevel === 4);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <span className="text-3xl">⚽</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    World Cup 2026 Access Center
                                </h1>
                                <p className="text-sm text-gray-500">Hybrid MFA + Risk-based access</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Info utilisateur */}
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{user?.fullName || user?.email}</p>
                                <p className="text-xs text-gray-500">
                                    Level {user?.priorityLevel || user?.accessLevel?.priorityLevel || 1}
                                </p>
                            </div>

                            {/* Bouton logout */}
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary flex items-center gap-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="card bg-gradient-to-br from-green-100 to-green-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-800">Level 1 - PUBLIC</p>
                                <p className="text-2xl font-bold text-green-900">{level1.length}</p>
                            </div>
                            <span className="text-3xl">🌐</span>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-blue-100 to-blue-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-800">Level 2 - CONFIDENTIEL</p>
                                <p className="text-2xl font-bold text-blue-900">{level2.length}</p>
                            </div>
                            <span className="text-3xl">🔒</span>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-orange-100 to-orange-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-800">Level 3 - SECRET</p>
                                <p className="text-2xl font-bold text-orange-900">{level3.length}</p>
                            </div>
                            <span className="text-3xl">🔐</span>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-red-100 to-red-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-800">Level 4 - TOP SECRET</p>
                                <p className="text-2xl font-bold text-red-900">{level4.length}</p>
                            </div>
                            <span className="text-3xl">🛡️</span>
                        </div>
                    </div>
                </div>

                {/* Ressources par niveau */}
                <div className="space-y-8">
                    {/* Level 1 - PUBLIC */}
                    {level1.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🌐</span> Level 1 - Public Access
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {level1.map((resource) => (
                                    <WorldCupResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Level 2 - CONFIDENTIEL */}
                    {level2.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🔒</span> Level 2 - Confidential
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {level2.map((resource) => (
                                    <WorldCupResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Level 3 - SECRET */}
                    {level3.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🔐</span> Level 3 - Secret
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {level3.map((resource) => (
                                    <WorldCupResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Level 4 - TOP SECRET */}
                    {level4.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🛡️</span> Level 4 - Top Secret
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {level4.map((resource) => (
                                    <WorldCupResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
