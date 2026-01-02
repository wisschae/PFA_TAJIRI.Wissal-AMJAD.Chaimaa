import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Prediction {
    matchId: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    outcome: 'win' | 'draw' | 'lose';
}

const MatchPredictions: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [selectedMatch, setSelectedMatch] = useState('');
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);

        // Load saved predictions
        const saved = localStorage.getItem('wc2026_predictions');
        if (saved) {
            setPredictions(JSON.parse(saved));
        }
    }, []);

    const matches = [
        { id: 'm1', team1: 'Brazil', team2: 'Argentina' },
        { id: 'm2', team1: 'France', team2: 'Germany' },
        { id: 'm3', team1: 'Spain', team2: 'Portugal' },
        { id: 'm4', team1: 'England', team2: 'Italy' },
    ];

    const leaderboard = [
        { name: 'Maria Silva', points: 250, flag: '🇧🇷' },
        { name: 'Jean Dupont', points: 230, flag: '🇫🇷' },
        { name: 'John Smith', points: 210, flag: '🇺🇸' },
        { name: 'Carlos Lopez', points: 195, flag: '🇪🇸' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedMatch) {
            toast.error('Sélectionnez un match');
            return;
        }

        const match = matches.find(m => m.id === selectedMatch);
        if (!match) return;

        let outcome: 'win' | 'draw' | 'lose';
        if (score1 > score2) outcome = 'win';
        else if (score1 < score2) outcome = 'lose';
        else outcome = 'draw';

        const newPrediction: Prediction = {
            matchId: selectedMatch,
            team1: match.team1,
            team2: match.team2,
            score1,
            score2,
            outcome
        };

        const updated = [...predictions.filter(p => p.matchId !== selectedMatch), newPrediction];
        setPredictions(updated);
        localStorage.setItem('wc2026_predictions', JSON.stringify(updated));

        toast.success('Prédiction enregistrée!', { icon: '⚽' });
        setSelectedMatch('');
        setScore1(0);
        setScore2(0);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading predictions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🔮 Match Predictions
                    </h1>
                    <p className="text-gray-600">
                        Prédisez les résultats et gagnez des points!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Prediction Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nouvelle Prédiction</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sélectionner un match
                                    </label>
                                    <select
                                        value={selectedMatch}
                                        onChange={(e) => setSelectedMatch(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">-- Choisissez --</option>
                                        {matches.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.team1} vs {m.team2}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Score Équipe 1
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={score1}
                                            onChange={(e) => setScore1(Number(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-center text-2xl font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Score Équipe 2
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={score2}
                                            onChange={(e) => setScore2(Number(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-center text-2xl font-bold"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn btn-primary">
                                    💾 Enregistrer la prédiction
                                </button>
                            </form>
                        </div>

                        {/* My Predictions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mes Prédictions</h2>
                            {predictions.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Aucune prédiction enregistrée
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {predictions.map((pred) => (
                                        <div key={pred.matchId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {pred.team1} vs {pred.team2}
                                                </p>
                                                <p className="text-2xl font-bold text-primary">
                                                    {pred.score1} - {pred.score2}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${pred.outcome === 'win' ? 'bg-green-100 text-green-800' :
                                                    pred.outcome === 'draw' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {pred.outcome.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏆 Classement</h2>
                            <div className="space-y-3">
                                {leaderboard.map((player, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                idx === 1 ? 'bg-gray-200 text-gray-700' :
                                                    idx === 2 ? 'bg-orange-100 text-orange-800' :
                                                        'bg-gray-100 text-gray-600'
                                            }`}>
                                            #{idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {player.flag} {player.name}
                                            </p>
                                            <p className="text-sm text-gray-500">{player.points} pts</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPredictions;
