import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

/**
 * Page Documents Confidentiels
 */
const ConfidentialDocumentsPage: React.FC = () => {
    // Mock data
    const documents = [
        { id: 1, name: 'Rapport Financier Q4 2024.pdf', size: '2.4 MB', date: '05/12/2024', category: 'Finance' },
        { id: 2, name: 'Stratégie Commerciale 2025.docx', size: '890 KB', date: '03/12/2024', category: 'Stratégie' },
        { id: 3, name: 'Contrats Partenaires.zip', size: '15.2 MB', date: '01/12/2024', category: 'Juridique' },
        { id: 4, name: 'Données Clients VIP.xlsx', size: '5.1 MB', date: '28/11/2024', category: 'Commercial' },
    ];

    return (
        <ResourcePageLayout
            title="Documents Confidentiels"
            description="Accès aux documents confidentiels de l'entreprise"
            levelName="CONFIDENTIEL"
            levelPriority={2}
            icon="🔒"
            requiredFactors={{
                password: true,
                otp: true,
                biometric: false,
            }}
        >
            <div className="space-y-6">
                {/* Alerte de sécurité */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Zone à Accès Restreint</h4>
                            <p className="text-sm text-blue-800">
                                Les documents listés ci-dessous contiennent des informations confidentielles.
                                Toute consultation est tracée et nécessite une authentification MFA (OTP).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Liste des documents */}
                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Documents Disponibles ({documents.length})
                        </h3>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nouveau Document
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nom du document</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Catégorie</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Taille</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📄</div>
                                                <span className="font-medium text-gray-900">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                                {doc.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{doc.size}</td>
                                        <td className="py-4 px-4 text-gray-600">{doc.date}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Télécharger">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Partager">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default ConfidentialDocumentsPage;
