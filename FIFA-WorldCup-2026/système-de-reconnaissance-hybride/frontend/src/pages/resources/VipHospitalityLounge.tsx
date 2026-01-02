import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const VipHospitalityLounge: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const offers = [
        { id: '1', name: 'Presidential Suite', price: 5000, demand: 95, perks: ['Private entrance', 'Champagne service', 'Meet & Greet'] },
        { id: '2', name: 'Executive Box', price: 3500, demand: 78, perks: ['Premium seating', 'Gourmet dining', 'VIP parking'] },
        { id: '3', name: 'Club Access', price: 1500, demand: 45, perks: ['Lounge access', 'Premium bar', 'Concierge'] },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Accessing VIP Lounge...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        👑 VIP Hospitality Lounge
                    </h1>
                    <p className="text-gray-600">
                        Exclusive offers for {user?.email || 'VIP Members'}
                    </p>
                    <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full inline-block text-sm font-medium">
                        🔐 OTP Required - CONFIDENTIEL Level 2
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.name}</h3>
                            <p className="text-3xl font-bold text-purple-600 mb-4">${offer.price}/match</p>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Demand</span>
                                    <span className="font-medium">{offer.demand}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${offer.demand > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${offer.demand}%` }} />
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                {offer.perks.map((perk, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full btn btn-primary">Request Callback</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VipHospitalityLounge;
