import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Secret {
    id: string;
    name: string;
    type: 'API_KEY' | 'PASSWORD' | 'CERTIFICATE';
    value: string;
    lastAccessed: string;
}

const CryptoVault: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [revealed, setRevealed] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);

    const secrets: Secret[] = [
        { id: '1', name: 'FIFA API Master Key', type: 'API_KEY', value: 'sk_live_51HqR8KL...', lastAccessed: '2 hours ago' },
        { id: '2', name: 'Database Admin Password', type: 'PASSWORD', value: 'Secur3Pa$$w0rd!2026', lastAccessed: '5 hours ago' },
        { id: '3', name: 'SSL Certificate', type: 'CERTIFICATE', value: '-----BEGIN CERTIFICATE-----\nMIIDdzCCAl...', lastAccessed: '1 day ago' },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    useEffect(() => {
        if (revealed && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setRevealed(null);
                        toast.success('Secret masked for security');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [revealed, timer]);

    const revealSecret = (id: string) => {
        setRevealed(id);
        setTimer(10);
        toast.success('Secret revealed for 10 seconds');
        console.log('[AUDIT] Secret accessed:', id, new Date().toISOString());
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-purple-200">Decrypting vault...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 py-8 px-4 text-white">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        🔐 Encryption & Credentials Vault
                    </h1>
                    <p className="text-purple-200">
                        Coffre-fort cryptographique - Accès ultra-restreint
                    </p>
                    <div className="mt-2 px-3 py-1 bg-red-600 text-white rounded-full inline-block text-sm font-medium">
                        🔐👁️ OTP + FACE Required - TOP SECRET Level 4
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-purple-500 mb-6">
                    <h2 className="text-2xl font-bold mb-6">🔑 Secrets Vault</h2>
                    <div className="space-y-4">
                        {secrets.map(secret => (
                            <div key={secret.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-bold text-white">{secret.name}</p>
                                        <p className="text-sm text-gray-400">{secret.type}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{secret.lastAccessed}</span>
                                </div>

                                <div className="mb-3 font-mono text-sm bg-black p-3 rounded border border-gray-700">
                                    {revealed === secret.id ? (
                                        <span className="text-green-400">{secret.value}</span>
                                    ) : (
                                        <span className="text-gray-600">••••••••••••••••••••</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => revealSecret(secret.id)}
                                    disabled={revealed === secret.id}
                                    className="btn btn-sm btn-primary"
                                >
                                    {revealed === secret.id ? `Hide in ${timer}s` : '👁️ Reveal'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4">📊 Audit Trail</h3>
                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between text-gray-400">
                            <span>[2026-06-15 18:45:32]</span>
                            <span>Secret #1 accessed by admin@wc2026.org</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>[2026-06-15 14:22:11]</span>
                            <span>Secret #2 accessed by security@wc2026.org</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoVault;
