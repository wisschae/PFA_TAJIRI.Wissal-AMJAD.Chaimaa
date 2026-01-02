import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

const EncryptionKeysPage: React.FC = () => {
    return (
        <ResourcePageLayout
            title="Clés de Chiffrement Maîtres"
            description="Gestion des clés de chiffrement critiques du système"
            levelName="TOP_SECRET"
            levelPriority={4}
            icon="🔑"
            requiredFactors={{ password: true, otp: true, biometric: true }}
        >
            <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <p className="text-red-900 font-semibold">🔴 ATTENTION : Zone Ultra-Sensible</p>
                    <p className="text-sm text-red-800 mt-1">
                        Les clés maîtres permettent de déchiffrer toutes les données du système.
                        Leur compromission entraînerait une violation de sécurité majeure.
                    </p>
                </div>

                <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Clés de Chiffrement Actives</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'KEY-001', name: 'Master Encryption Key', algo: 'RSA-4096', created: '01/01/2024', status: 'Active' },
                            { id: 'KEY-002', name: 'Database Encryption Key', algo: 'AES-256', created: '15/03/2024', status: 'Active' },
                            { id: 'KEY-003', name: 'TLS/SSL Private Key', algo: 'ECDSA P-384', created: '20/06/2024', status: 'Active' },
                        ].map((key, i) => (
                            <div key={i} className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="font-bold text-gray-900">{key.name}</div>
                                        <div className="text-xs text-gray-600 font-mono">{key.id}</div>
                                    </div>
                                    <span className="badge bg-green-100 text-green-800">
                                        {key.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-gray-600">Algorithme</div>
                                        <div className="font-mono font-semibold">{key.algo}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Créée le</div>
                                        <div className="font-semibold">{key.created}</div>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                                        Rotation
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                                        Révoquer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-blue-50">
                        <h4 className="font-semibold mb-2">📊 Statistiques de Rotation</h4>
                        <div className="text-sm space-y-1 text-gray-700">
                            <div>Dernière rotation : <strong>15/11/2024</strong></div>
                            <div>Prochaine rotation : <strong>15/02/2025</strong></div>
                            <div>Fréquence : <strong>90 jours</strong></div>
                        </div>
                    </div>
                    <div className="card bg-green-50">
                        <h4 className="font-semibold mb-2">✅ Conformité</h4>
                        <div className="text-sm space-y-1 text-gray-700">
                            <div>✓ RGPD : Conforme</div>
                            <div>✓ ISO 27001 : Conforme</div>
                            <div>✓ SOC 2 : Conforme</div>
                        </div>
                    </div>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default EncryptionKeysPage;
