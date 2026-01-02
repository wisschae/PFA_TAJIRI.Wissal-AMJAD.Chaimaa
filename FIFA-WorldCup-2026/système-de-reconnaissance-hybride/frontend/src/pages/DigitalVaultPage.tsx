import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

const DigitalVaultPage: React.FC = () => {
    return (
        <ResourcePageLayout
            title="Coffre-Fort Numérique"
            description="Stockage sécurisé des secrets et données ultra-sensibles"
            levelName="TOP_SECRET"
            levelPriority={4}
            icon="🛡️"
            requiredFactors={{ password: true, otp: true, biometric: true }}
        >
            <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <p className="text-red-900 font-semibold">🔴 ZONE TOP SECRET - Accès Ultra-Restreint</p>
                    <p className="text-sm text-red-800 mt-1">
                        Triple authentification requise : Mot de passe + OTP + Biométrie
                    </p>
                </div>

                <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Secrets Stockés</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'API Keys Production', type: 'Clés API', expiry: '01/06/2025' },
                            { name: 'Certificats SSL', type: 'Certificats', expiry: '15/08/2025' },
                            { name: 'Mots de Passe Admin', type: 'Credentials', expiry: 'N/A' },
                            { name: 'Tokens OAuth', type: 'Tokens', expiry: '30/12/2024' },
                        ].map((secret, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                    <div className="font-semibold text-gray-900">🔐 {secret.name}</div>
                                    <div className="text-sm text-gray-600">{secret.type}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Expire le</div>
                                    <div className="text-sm font-medium">{secret.expiry}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                    <h3 className="text-lg font-semibold mb-2">Politique de Sécurité</h3>
                    <ul className="text-sm space-y-2 text-gray-700">
                        <li>✓ Rotation automatique des secrets tous les 90 jours</li>
                        <li>✓ Chiffrement AES-256 au repos</li>
                        <li>✓ Audit complet de tous les accès</li>
                        <li>✓ Notifications d'accès en temps réel</li>
                    </ul>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default DigitalVaultPage;
