import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const TicketReservationCenter: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState<'select' | 'confirm' | 'ticket'>('select');
    const [selectedMatch, setSelectedMatch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [ticketGenerated, setTicketGenerated] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const matches = [
        { id: 'qf1', name: 'Quart de finale 1', date: '2026-07-02', venue: 'MetLife Stadium, NY' },
        { id: 'qf2', name: 'Quart de finale 2', date: '2026-07-03', venue: 'AT&T Stadium, TX' },
        { id: 'sf1', name: 'Demi-finale 1', date: '2026-07-06', venue: 'SoFi Stadium, CA' },
        { id: 'final', name: 'FINALE', date: '2026-07-10', venue: 'MetLife Stadium, NY' },
    ];

    const categories = [
        { id: 'standard', name: 'Standard', price: 150, available: 245 },
        { id: 'premium', name: 'Premium', price: 350, available: 89 },
        { id: 'vip', name: 'VIP Suite', price: 850, available: 12 },
    ];

    const handleReserve = () => {
        if (!selectedMatch || !selectedCategory) {
            toast.error('Veuillez sélectionner un match et une catégorie');
            return;
        }
        setStep('confirm');
    };

    const handleConfirm = () => {
        setTicketGenerated(true);
        setStep('ticket');
        toast.success('Réservation confirmée! 🎫', { duration: 3000 });
        console.log('[AUDIT] Ticket reserved:', { match: selectedMatch, category: selectedCategory, timestamp: new Date().toISOString() });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reservation center...</p>
                </div>
            </div>
        );
    }

    const selectedMatchData = matches.find(m => m.id === selectedMatch);
    const selectedCategoryData = categories.find(c => c.id === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🎫 Ticket Reservation Center
                    </h1>
                    <p className="text-gray-600">
                        Réservez vos billets pour la Coupe du Monde 2026
                    </p>
                    <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full inline-block text-sm font-medium">
                        🔐 OTP Required - CONFIDENTIEL Level 2
                    </div>
                </div>

                {step === 'select' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sélectionner un match</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matches.map(match => (
                                    <div
                                        key={match.id}
                                        onClick={() => setSelectedMatch(match.id)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition ${selectedMatch === match.id
                                                ? 'border-primary bg-primary-light'
                                                : 'border-gray-200 hover:border-primary'
                                            }`}
                                    >
                                        <p className="font-bold text-gray-900">{match.name}</p>
                                        <p className="text-sm text-gray-600">{match.date}</p>
                                        <p className="text-xs text-gray-500">{match.venue}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Catégorie de siège</h2>
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <div
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition flex items-center justify-between ${selectedCategory === cat.id
                                                ? 'border-primary bg-primary-light'
                                                : 'border-gray-200 hover:border-primary'
                                            }`}
                                    >
                                        <div>
                                            <p className="font-bold text-gray-900">{cat.name}</p>
                                            <p className="text-sm text-gray-600">${cat.price} USD</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">{cat.available} disponibles</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleReserve} className="w-full btn btn-primary">
                            Continuer →
                        </button>
                    </div>
                )}

                {step === 'confirm' && selectedMatchData && selectedCategoryData && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmer la réservation</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Match:</span>
                                <span className="font-medium">{selectedMatchData.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{selectedMatchData.date}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Stade:</span>
                                <span className="font-medium">{selectedMatchData.venue}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">Catégorie:</span>
                                <span className="font-medium">{selectedCategoryData.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-primary">${selectedCategoryData.price} USD</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep('select')} className="flex-1 btn btn-secondary">
                                ← Retour
                            </button>
                            <button onClick={handleConfirm} className="flex-1 btn btn-success">
                                ✓ Confirmer
                            </button>
                        </div>
                    </div>
                )}

                {step === 'ticket' && ticketGenerated && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="text-6xl mb-4">🎫</div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">Réservation Confirmée!</h2>
                        <div className="bg-gray-100 rounded-xl p-6 mb-6">
                            <div className="text-8xl mb-4">▮▮▮▮▮</div>
                            <p className="text-xs text-gray-500">QR Code simulé</p>
                            <p className="font-mono text-sm text-gray-700 mt-2">WC2026-{Date.now().toString().slice(-6)}</p>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Votre billet a été envoyé par email. Présentez ce QR code à l'entrée du stade.
                        </p>
                        <button onClick={() => { setStep('select'); setTicketGenerated(false); }} className="btn btn-primary">
                            Nouvelle réservation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketReservationCenter;
