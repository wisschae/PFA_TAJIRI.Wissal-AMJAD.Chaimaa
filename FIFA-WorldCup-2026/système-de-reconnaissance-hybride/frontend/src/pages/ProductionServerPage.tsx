import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

const ProductionServerPage: React.FC = () => {
    return (
        <ResourcePageLayout
            title="Serveur de Production"
            description="Accès au serveur de production - Opérations critiques"
            levelName="SECRET"
            levelPriority={3}
            icon="🖥️"
            requiredFactors={{ password: true, otp: false, biometric: true }}
        >
            <div className="space-y-6">
                {/* Alerte */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <p className="text-orange-900 font-semibold">⚠️ Zone Critique - Biométrie Requise</p>
                    <p className="text-sm text-orange-800 mt-1">Toute action sur ce serveur nécessite une authentification biométrique.</p>
                </div>

                {/* Status Système */}
                <div className="card">
                    <h3 className="text-xl font-semibold mb-4">État du Système</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">✅</div>
                            <div className="text-sm text-gray-600">CPU</div>
                            <div className="font-bold text-green-600">45%</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">💾</div>
                            <div className="text-sm text-gray-600">RAM</div>
                            <div className="font-bold text-green-600">62%</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl mb-2">💿</div>
                            <div className="text-sm text-gray-600">Disque</div>
                            <div className="font-bold text-yellow-600">78%</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🌐</div>
                            <div className="text-sm text-gray-600">Réseau</div>
                            <div className="font-bold text-green-600">Normal</div>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Services Actifs</h3>
                    <div className="space-y-2">
                        {['API Backend', 'Base de Données', 'Cache Redis', 'Queue Manager'].map((service, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                <span className="text-gray-700">{service}</span>
                                <span className="flex items-center gap-2 text-green-600">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    En ligne
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default ProductionServerPage;
