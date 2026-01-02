import React from 'react';
import ResourcePageLayout from '../components/ResourcePageLayout';

const ClientsDatabasePage: React.FC = () => {
    const clients = [
        { id: 1, name: 'Entreprise Alpha', contact: 'contact@alpha.com', ca: '1.2M€', status: 'Actif' },
        { id: 2, name: 'Société Beta Corp', contact: 'info@beta.com', ca: '850K€', status: 'Actif' },
        { id: 3, name: 'Gamma Industries', contact: 'hello@gamma.com', ca: '2.5M€', status: 'Prospect' },
    ];

    return (
        <ResourcePageLayout
            title="Base de Données Clients"
            description="Accès à la base de données des clients et prospects"
            levelName="CONFIDENTIEL"
            levelPriority={2}
            icon="👥"
            requiredFactors={{ password: true, otp: true, biometric: false }}
        >
            <div className="card">
                <h3 className="text-xl font-semibold mb-4">Clients Enregistrés ({clients.length})</h3>
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Client</th>
                            <th className="text-left py-3 px-4 font-semibold">Contact</th>
                            <th className="text-left py-3 px-4 font-semibold">CA Annuel</th>
                            <th className="text-left py-3 px-4 font-semibold">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{client.name}</td>
                                <td className="py-3 px-4 text-gray-600">{client.contact}</td>
                                <td className="py-3 px-4 text-gray-600">{client.ca}</td>
                                <td className="py-3 px-4">
                                    <span className={`badge ${client.status === 'Actif' ? 'badge-public' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {client.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ResourcePageLayout>
    );
};

export default ClientsDatabasePage;
