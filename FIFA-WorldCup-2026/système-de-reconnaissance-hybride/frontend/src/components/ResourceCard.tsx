import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Resource } from '../types';

interface ResourceCardProps {
    resource: Resource;
}

/**
 * Carte d'affichage d'une ressource
 * Avec badge de niveau d'accès, indicateur de sensibilité et navigation
 */
const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    const navigate = useNavigate();

    // Déterminer la classe du badge selon le niveau
    const getBadgeClass = (levelName: string): string => {
        switch (levelName) {
            case 'PUBLIC':
                return 'badge-public';
            case 'CONFIDENTIEL':
                return 'badge-confidentiel';
            case 'SECRET':
                return 'badge-secret';
            case 'TOP_SECRET':
                return 'badge-top-secret';
            default:
                return 'badge-public';
        }
    };

    // Icône selon le niveau
    const getLevelIcon = (levelName: string): string => {
        switch (levelName) {
            case 'PUBLIC':
                return '🌐';
            case 'CONFIDENTIEL':
                return '🔒';
            case 'SECRET':
                return '🔐';
            case 'TOP_SECRET':
                return '🛡️';
            default:
                return '📁';
        }
    };

    // Mapping du resourcePath vers la route correcte
    const getRoute = (path: string): string => {
        const routeMap: { [key: string]: string } = {
            '/home': '/home',
            '/dashboard': '/dashboard/user',
            '/documents/confidential': '/documents/confidential',
            '/db/clients': '/db/clients',
            '/servers/production': '/servers/production',
            '/repo/source': '/repo/source',
            '/vault/secrets': '/vault/secrets',
            '/vault/encryption-keys': '/vault/encryption-keys',
        };
        return routeMap[path] || '/dashboard';
    };

    const handleClick = () => {
        const route = getRoute(resource.resourcePath);
        navigate(route);
    };

    return (
        <div
            className="card hover:scale-105 hover:shadow-2xl cursor-pointer transition-all duration-200"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{getLevelIcon(resource.minAccessLevel.name)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                </div>
                {resource.isSensitive && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Sensible
                    </span>
                )}
            </div>

            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>

            <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ${getBadgeClass(resource.minAccessLevel.name)}`}>
                    {resource.minAccessLevel.name}
                </span>

                <div className="flex gap-1 ml-auto text-xs text-gray-500">
                    {resource.minAccessLevel.passwordRequired && (
                        <span className="bg-gray-100 px-2 py-1 rounded" title="Mot de passe requis">
                            🔑
                        </span>
                    )}
                    {resource.minAccessLevel.otpRequired && (
                        <span className="bg-gray-100 px-2 py-1 rounded" title="OTP requis">
                            📱
                        </span>
                    )}
                    {resource.minAccessLevel.biometricRequired && (
                        <span className="bg-gray-100 px-2 py-1 rounded" title="Biométrie requise">
                            👁️
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                <code className="text-xs text-gray-500">{resource.resourcePath}</code>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};

export default ResourceCard;
