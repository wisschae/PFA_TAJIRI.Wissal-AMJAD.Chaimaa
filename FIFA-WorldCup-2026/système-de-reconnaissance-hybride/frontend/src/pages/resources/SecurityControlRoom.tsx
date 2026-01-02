import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Incident {
    id: string;
    time: string;
    type: 'THEFT' | 'MEDICAL' | 'CROWD' | 'SECURITY';
    location: string;
    priority: 'LOW' | 'MED' | 'HIGH' | 'CRIT';
    status: 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED';
}

const SecurityControlRoom: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [incidents, setIncidents] = useState<Incident[]>([
        { id: '1', time: '18:45', type: 'CROWD', location: 'Section 204', priority: 'HIGH', status: 'NEW' },
        { id: '2', time: '18:32', type: 'MEDICAL', location: 'Gate F', priority: 'MED', status: 'ACKNOWLEDGED' },
        { id: '3', time: '18:15', type: 'THEFT', location: 'Parking B', priority: 'LOW', status: 'RESOLVED' },
    ]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const acknowledge = (id: string) => {
        setIncidents(prev => prev.map(inc =>
            inc.id === id ? { ...inc, status: 'ACKNOWLEDGED' } : inc
        ));
        toast.success('Incident acknowledged');
    };

    const escalate = (id: string) => {
        const incident = incidents.find(inc => inc.id === id);
        toast.error(`Incident ${id} escalated to supervisor`, { icon: '🚨' });
        console.log('[SECURITY AUDIT] Escalation:', incident);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Accessing control room...</p>
                </div>
            </div>
        );
    }

    const priorityColors = {
        LOW: 'bg-green-100 text-green-800',
        MED: 'bg-yellow-100 text-yellow-800',
        HIGH: 'bg-orange-100 text-orange-800',
        CRIT: 'bg-red-100 text-red-800'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🚨 Security Control Room
                    </h1>
                    <p className="text-gray-600">
                        Real-time incident monitoring and threat management
                    </p>
                    <div className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full inline-block text-sm font-medium">
                        🔐👁️ OTP + FACE Required - TOP SECRET Level 4
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🕐 Incident Timeline</h2>
                    <div className="space-y-4">
                        {incidents.map(incident => (
                            <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${priorityColors[incident.priority]}`}>
                                                {incident.priority}
                                            </span>
                                            <span className="font-mono text-sm text-gray-600">{incident.time}</span>
                                        </div>
                                        <p className="font-bold text-gray-900">{incident.type} - {incident.location}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${incident.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                            incident.status === 'ACKNOWLEDGED' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {incident.status}
                                    </span>
                                </div>

                                {incident.status === 'NEW' && (
                                    <div className="flex gap-2">
                                        <button onClick={() => acknowledge(incident.id)} className="btn btn-primary btn-sm">
                                            ✓ Acknowledge
                                        </button>
                                        <button onClick={() => escalate(incident.id)} className="btn btn-danger btn-sm">
                                            ⚠️ Escalate
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityControlRoom;
