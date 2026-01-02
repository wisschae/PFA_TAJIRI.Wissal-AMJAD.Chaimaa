import React, { useState, useEffect } from 'react';

const StadiumOperations: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const shifts = [
        { time: '06:00-14:00', role: 'Security', staff: 45, status: 'Confirmed' },
        { time: '14:00-22:00', role: 'Concessions', staff: 120, status: 'Confirmed' },
        { time: '18:00-02:00', role: 'Cleaning', staff: 80, status: 'Pending' },
    ];

    const gates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading operations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🏟️ Stadium Operations
                    </h1>
                    <p className="text-gray-600">
                        Planification shifts, maintenance, et contrôle des portes
                    </p>
                    <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full inline-block text-sm font-medium">
                        👁️ FACE Required - SECRET Level 3
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Shift Planner</h2>
                        <div className="space-y-3">
                            {shifts.map((shift, idx) => (
                                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-gray-900">{shift.role}</p>
                                            <p className="text-sm text-gray-600">{shift.time}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${shift.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {shift.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{shift.staff} staff assigned</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">🚪 Gate Status</h2>
                        <div className="grid grid-cols-4 gap-3">
                            {gates.map(gate => (
                                <div key={gate} className="p-4 bg-green-100 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-green-800">{gate}</p>
                                    <p className="text-xs text-green-600">OPEN</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StadiumOperations;
