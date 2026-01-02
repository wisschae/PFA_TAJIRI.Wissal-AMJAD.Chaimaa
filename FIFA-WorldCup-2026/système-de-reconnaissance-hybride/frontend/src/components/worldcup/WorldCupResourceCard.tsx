import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { WorldCupResource, ResourceAccessState } from '../../types/worldcup';
import { computeAccessState, getLevelLabel, getLevelColor } from '../../lib/access';
import { useAuth } from '../../context/AuthContext';

interface Props {
    resource: WorldCupResource;
}

const WorldCupResourceCard: React.FC<Props> = ({ resource }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const accessState: ResourceAccessState = computeAccessState(user, resource);

    const handleClick = () => {
        switch (accessState) {
            case 'ACCESSIBLE':
                navigate(resource.path);
                break;
            case 'MFA_REQUIRED':
                navigate('/mfa', { state: { from: resource.path } });
                break;
            case 'LOCKED_LEVEL':
                toast.error(
                    `Accès refusé. Niveau requis: ${getLevelLabel(resource.requiredLevel)}`,
                    { icon: '🔒', duration: 3000 }
                );
                break;
        }
    };

    // Couleurs selon l'état
    const stateConfig = {
        ACCESSIBLE: {
            badge: 'bg-green-100 text-green-800',
            button: 'btn-primary',
            text: 'Access Granted',
            icon: '✓'
        },
        MFA_REQUIRED: {
            badge: 'bg-orange-100 text-orange-800',
            button: 'btn-warning',
            text: 'MFA Required',
            icon: '🔐'
        },
        LOCKED_LEVEL: {
            badge: 'bg-red-100 text-red-800',
            button: 'btn-disabled',
            text: 'Locked',
            icon: '🔒'
        }
    };

    const config = stateConfig[accessState];
    const levelColor = getLevelColor(resource.requiredLevel);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Header avec badges */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                        {resource.name}
                    </h3>
                    {resource.sensitive && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                            🔐 Sensitive
                        </span>
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-3">
                    {resource.description}
                </p>

                {/* Badges niveau et état */}
                <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium bg-${levelColor}-100 text-${levelColor}-800`}>
                        Level {resource.requiredLevel} - {getLevelLabel(resource.requiredLevel)}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${config.badge}`}>
                        {config.icon} {config.text}
                    </span>
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        📁 {resource.category}
                    </span>
                </div>
            </div>

            {/* Facteurs requis */}
            <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="text-xs text-gray-500 mb-2">Required Factors:</p>
                <div className="flex gap-2">
                    {resource.requiredFactors.map((factor) => {
                        const icons = {
                            PASSWORD: '🔑',
                            OTP: '📱',
                            FACE: '👁️'
                        };
                        return (
                            <span
                                key={factor}
                                className="text-xs px-2 py-1 bg-white border border-gray-300 rounded-lg flex items-center gap-1"
                            >
                                <span>{icons[factor]}</span>
                                <span className="font-medium">{factor}</span>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Action button */}
            <div className="p-4">
                <button
                    onClick={handleClick}
                    disabled={accessState === 'LOCKED_LEVEL'}
                    className={`w-full btn ${config.button}`}
                >
                    {accessState === 'ACCESSIBLE' && '🚀 Open'}
                    {accessState === 'MFA_REQUIRED' && '🔐 Complete Verification'}
                    {accessState === 'LOCKED_LEVEL' && '🔒 Insufficient Level'}
                </button>
            </div>
        </div>
    );
};

export default WorldCupResourceCard;
