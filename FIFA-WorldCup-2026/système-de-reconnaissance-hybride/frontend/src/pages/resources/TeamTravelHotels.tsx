import React, { useState, useEffect } from 'react';

const TeamTravelHotels: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const itinerary = [
        { date: '2026-06-15', event: 'Arrival NYC', hotel: 'The Plaza Hotel', transport: 'Private jet' },
        { date: '2026-06-18', event: 'Match Day', hotel: 'The Plaza Hotel', transport: 'Team bus' },
        { date: '2026-06-20', event: 'Travel to Dallas', hotel: 'Four Seasons Dallas', transport: 'Charter flight' },
        { date: '2026-06-23', event: 'Match Day', hotel: 'Four Seasons Dallas', transport: 'Team bus' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading travel data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        ✈️ Team Travel & Hotels
                    </h1>
                    <p className="text-gray-600">
                        Gestion des déplacements et hébergements d'équipes
                    </p>
                    <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full inline-block text-sm font-medium">
                        👁️ FACE Required - SECRET Level 3
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Itinerary Timeline</h2>
                    <div className="space-y-4">
                        {itinerary.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="w-24 flex-shrink-0">
                                    <div className="text-sm font-medium text-primary">{item.date}</div>
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold text-gray-900 mb-2">{item.event}</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Hotel:</span>
                                            <span className="ml-2 font-medium">{item.hotel}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Transport:</span>
                                            <span className="ml-2 font-medium">{item.transport}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamTravelHotels;
