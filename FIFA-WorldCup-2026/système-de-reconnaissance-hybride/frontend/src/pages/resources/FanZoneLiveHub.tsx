import React, { useState, useEffect } from 'react';

interface Match {
    id: string;
    team1: string;
    team2: string;
    stadium: string;
    time: string;
    status: 'live' | 'upcoming' | 'finished';
    score?: string;
}

const FanZoneLiveHub: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const matches: Match[] = [
        { id: '1', team1: 'Brazil', team2: 'Argentina', stadium: 'MetLife Stadium', time: 'Live', status: 'live', score: '2-1' },
        { id: '2', team1: 'France', team2: 'Germany', stadium: 'AT&T Stadium', time: '18:00', status: 'upcoming' },
        { id: '3', team1: 'Spain', team2: 'Portugal', stadium: 'SoFi Stadium', time: '21:00', status: 'upcoming' },
        { id: '4', team1: 'England', team2: 'Italy', stadium: 'Hard Rock Stadium', time: 'Finished', status: 'finished', score: '1-1' },
    ];

    const liveUpdates = [
        { time: '2 min ago', text: '⚽ Goal! Neymar scores for Brazil' },
        { time: '5 min ago', text: '🟨 Yellow card for Messi' },
        { time: '8 min ago', text: '📊 Possession: Brazil 55% - Argentina 45%' },
        { time: '12 min ago', text: '🔥 Shot on target by Vinicius Jr' },
    ];

    const trendingTeams = [
        { name: 'Brazil', momentum: 95, flag: '🇧🇷' },
        { name: 'France', momentum: 88, flag: '🇫🇷' },
        { name: 'Argentina', momentum: 85, flag: '🇦🇷' },
        { name: 'Spain', momentum: 78, flag: '🇪🇸' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Fan Zone...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        ⚽ Fan Zone Live Hub
                    </h1>
                    <p className="text-gray-600">
                        World Cup 2026 - Live matches, updates & trending teams
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex gap-2">
                    {['all', 'live', 'upcoming', 'finished'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${selectedFilter === filter
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Match Center */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📺 Match Center</h2>
                        {matches
                            .filter(m => selectedFilter === 'all' || m.status === selectedFilter)
                            .map((match) => (
                                <div key={match.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${match.status === 'live' ? 'bg-red-100 text-red-800 animate-pulse' :
                                                match.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {match.status.toUpperCase()}
                                        </span>
                                        <span className="text-sm text-gray-500">{match.time}</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-xl font-bold text-gray-900">{match.team1}</div>
                                        {match.score && (
                                            <div className="text-2xl font-bold text-primary">{match.score}</div>
                                        )}
                                        <div className="text-xl font-bold text-gray-900">{match.team2}</div>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        📍 {match.stadium}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Live Updates */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="animate-pulse text-red-500">🔴</span>
                                Live Pulse
                            </h3>
                            <div className="space-y-3">
                                {liveUpdates.map((update, idx) => (
                                    <div key={idx} className="border-l-2 border-primary pl-3">
                                        <p className="text-xs text-gray-500">{update.time}</p>
                                        <p className="text-sm text-gray-900">{update.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trending Teams */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">🔥 Trending Teams</h3>
                            <div className="space-y-3">
                                {trendingTeams.map((team) => (
                                    <div key={team.name}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-gray-900">
                                                {team.flag} {team.name}
                                            </span>
                                            <span className="text-sm text-primary font-bold">{team.momentum}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${team.momentum}%` }}
                                            />
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

export default FanZoneLiveHub;
