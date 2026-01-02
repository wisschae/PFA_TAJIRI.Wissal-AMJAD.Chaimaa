import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

const SourceCodeRepoPage: React.FC = () => {
    return (
        <ResourcePageLayout
            title="Repository Code Source"
            description="Accès au code source du système - Développeurs autorisés uniquement"
            levelName="SECRET"
            levelPriority={3}
            icon="💻"
            requiredFactors={{ password: true, otp: false, biometric: true }}
        >
            <div className="space-y-6">
                <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Dépôts Git Disponibles</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'auth-backend', branch: 'main', commits: 245, language: 'Java' },
                            { name: 'frontend', branch: 'develop', commits: 189, language: 'TypeScript' },
                            { name: 'face-service', branch: 'main', commits: 67, language: 'Python' },
                        ].map((repo, i) => (
                            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-lg">📁 {repo.name}</h4>
                                    <span className="badge badge-public">{repo.language}</span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600">
                                    <span>🌿 {repo.branch}</span>
                                    <span>📝 {repo.commits} commits</span>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm">
                                        Cloner
                                    </button>
                                    <button className="px-3 py-1 border rounded hover:bg-gray-50 text-sm">
                                        Historique
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ResourcePageLayout>
    );
};

export default SourceCodeRepoPage;
