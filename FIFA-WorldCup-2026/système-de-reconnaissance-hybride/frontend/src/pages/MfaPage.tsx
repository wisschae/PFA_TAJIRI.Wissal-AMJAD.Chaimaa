import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import toast from 'react-hot-toast';
import { MfaState } from '../types';
import authApi from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { setMfaDone } from '../lib/mfaState';

/**
 * Page de vérification MFA avec choix FACE ou OTP
 */
const MfaPage: React.FC = () => {
    const [mfaState, setMfaState] = useState<MfaState | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [showWebcam, setShowWebcam] = useState(true);

    // ✅ OTP states
    const [selectedTab, setSelectedTab] = useState<'FACE' | 'OTP'>('FACE');
    const [otpCode, setOtpCode] = useState('');

    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser, setToken, logout } = useAuth();

    useEffect(() => {
        const storedMfa = localStorage.getItem('mfa_state');
        const storedEmail = localStorage.getItem('mfa_email');

        if (storedMfa) {
            const parsedMfa = JSON.parse(storedMfa);
            setMfaState({ ...parsedMfa, email: storedEmail || '' });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleCapture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setCapturedImage(imageSrc);
                setShowWebcam(false);
                setError(null);
            } else {
                setError("Impossible de capturer l'image. Veuillez réessayer.");
            }
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setShowWebcam(true);
        setError(null);
    };

    const handleVerifyFace = async () => {
        if (!capturedImage || !mfaState) {
            const errorMsg = "Veuillez capturer une image de votre visage";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '📸' });
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userEmail = localStorage.getItem('mfa_email') || '';

            const response = await authApi.verifyMfa({
                sessionId: mfaState.sessionId,
                factorType: 'FACE',
                factorData: userEmail,
                imageBase64: capturedImage
            });

            if (response.token) {
                // ✅ STEP 1: Save token first
                localStorage.setItem('token', response.token);
                setToken(response.token);

                // ✅ STEP 2: Fetch user data immediately with this token
                try {
                    const userData = await authApi.me();
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);

                    // ✅ STEP 3: Clean up MFA state
                    localStorage.removeItem('mfa_state');
                    localStorage.removeItem('mfa_email');

                    toast.success('Authentification réussie !', {
                        duration: 2000,
                        icon: '✅',
                    });

                    // 🔥 FIX: Force un rechargement complet de la page
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 100);
                } catch (meError) {
                    console.error('Failed to fetch user after MFA:', meError);
                    toast.error('Erreur lors de la récupération du profil');
                    // Keep token but show error
                }
            } else {
                setError("Vérification échouée. Token non reçu.");
                toast.error("Vérification échouée");
            }
        } catch (err: any) {
            console.error('Face verification error:', err);

            const status = err.response?.status;

            if (status === 400) {
                const errorMessage = err.response?.data?.message
                    || err.message
                    || "La vérification faciale a échoué. Veuillez réessayer.";
                setError(errorMessage);
                toast.error(errorMessage, {
                    duration: 5000,
                    icon: '❌',
                });

                setCapturedImage(null);
                setShowWebcam(true);
            } else if (status === 401 || status === 403) {
                console.warn('Authentication error, logging out');
                toast.error('Session expirée, reconnectez-vous', {
                    icon: '⚠️',
                });
                logout();
                navigate('/login');
            } else if (!err.response) {
                const errorMessage = "Service temporairement indisponible. Vérifiez votre connexion.";
                setError(errorMessage);
                toast.error(errorMessage, {
                    duration: 5000,
                    icon: '🌐',
                });
            } else {
                const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue";
                setError(errorMessage);
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Handle OTP verification
    const handleVerifyOtp = async () => {
        if (!otpCode || !mfaState) {
            const errorMsg = "Veuillez entrer le code OTP";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '🔢' });
            return;
        }

        if (!/^\d{6}$/.test(otpCode)) {
            const errorMsg = "Le code OTP doit contenir exactement 6 chiffres";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '⚠️' });
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userEmail = localStorage.getItem('mfa_email') || '';

            const response = await authApi.verifyMfa({
                sessionId: mfaState.sessionId,
                factorType: 'OTP',
                factorData: userEmail,
                imageBase64: otpCode
            });

            if (response.token) {
                // ✅ STEP 1: Save token first
                localStorage.setItem('token', response.token);
                setToken(response.token);

                // ✅ STEP 2: Fetch user data immediately with this token
                try {
                    const userData = await authApi.me();
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);

                    // ✅ STEP 3: Clean up MFA state
                    localStorage.removeItem('mfa_state');
                    localStorage.removeItem('mfa_email');

                    toast.success('Authentification OTP réussie !', {
                        duration: 2000,
                        icon: '✅',
                    });

                    // 🔥 FIX CRITIQUE: Force un rechargement complet de la page
                    // pour que http.ts interceptor utilise le nouveau token
                    setTimeout(() => {
                        window.location.href = '/dashboard';  // au lieu de navigate()
                    }, 100);
                } catch (meError) {
                    console.error('Failed to fetch user after OTP MFA:', meError);
                    toast.error('Erreur lors de la récupération du profil');
                }
            } else {
                setError("Vérification échouée. Token non reçu.");
                toast.error("Vérification échouée");
            }
        } catch (err: any) {
            console.error('OTP verification error:', err);

            const status = err.response?.status;

            if (status === 400) {
                const errorMessage = err.response?.data?.message
                    || err.message
                    || "Code OTP invalide ou expiré. Veuillez réessayer.";
                setError(errorMessage);
                toast.error(errorMessage, {
                    duration: 5000,
                    icon: '❌',
                });
                setOtpCode('');
            } else if (status === 401 || status === 403) {
                console.warn('Authentication error, logging out');
                toast.error('Session expirée, reconnectez-vous', {
                    icon: '⚠️',
                });
                logout();
                navigate('/login');
            } else {
                const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue";
                setError(errorMessage);
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    };

    if (!mfaState) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warning-light to-danger-light">
            <div className="max-w-2xl w-full mx-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-block p-3 bg-warning-light rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-warning"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Authentification Multi-Facteurs Requise
                        </h1>
                        <p className="text-sm text-gray-600">
                            Score de risque détecté : <strong>{mfaState.riskScore}%</strong>
                        </p>
                    </div>

                    {/* Facteurs requis */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                            Facteurs d'authentification requis :
                        </p>
                        <div className="space-y-2">
                            {mfaState.requiredFactors.map((factor, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg"
                                >
                                    {factor === 'FACE' && (
                                        <>
                                            <span className="text-2xl">👤</span>
                                            <span>Reconnaissance faciale</span>
                                            <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                Actif
                                            </span>
                                        </>
                                    )}
                                    {factor === 'OTP' && (
                                        <>
                                            <span className="text-2xl">📱</span>
                                            <span>Code OTP (One-Time Password)</span>
                                            <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                Actif
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ✅ Onglets pour choisir FACE ou OTP */}
                    <div className="mb-6">
                        <div className="flex gap-2 border-b border-gray-200">
                            <button
                                onClick={() => setSelectedTab('FACE')}
                                className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${selectedTab === 'FACE'
                                    ? 'border-b-2 border-primary text-primary bg-primary-light'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span className="text-xl mr-2">👤</span>
                                Reconnaissance Faciale
                            </button>
                            <button
                                onClick={() => setSelectedTab('OTP')}
                                className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${selectedTab === 'OTP'
                                    ? 'border-b-2 border-primary text-primary bg-primary-light'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span className="text-xl mr-2">🔢</span>
                                Code OTP
                            </button>
                        </div>
                    </div>

                    {/* Contenu conditionnel */}
                    {selectedTab === 'OTP' ? (
                        /* ========== MODE OTP ========== */
                        <div className="mb-6">
                            <div className="bg-gray-50 rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <span className="text-6xl">📱</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Entrez votre code OTP
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Ouvrez Google Authenticator et entrez le code à 6 chiffres
                                </p>

                                <div className="max-w-xs mx-auto">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        className="w-full text-center text-3xl font-mono tracking-widest px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary-light"
                                        autoFocus
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Le code change toutes les 30 secondes
                                    </p>
                                </div>

                                {error && (
                                    <div className="mt-4 p-3 bg-danger-light text-danger rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={isLoading || otpCode.length !== 6}
                                    className={`mt-6 w-full btn ${isLoading || otpCode.length !== 6
                                        ? 'btn-disabled'
                                        : 'btn-primary'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Vérification...
                                        </>
                                    ) : (
                                        '✓ Vérifier le code OTP'
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ========== MODE FACE ========== */
                        <div className="mb-6">
                            <div className="bg-black rounded-lg overflow-hidden relative">
                                {showWebcam && !capturedImage ? (
                                    <>
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                            className="w-full"
                                        />
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                            <button
                                                onClick={handleCapture}
                                                className="btn btn-primary"
                                            >
                                                📸 Capturer mon visage
                                            </button>
                                        </div>
                                    </>
                                ) : capturedImage ? (
                                    <>
                                        <img src={capturedImage} alt="Captured" className="w-full" />
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                                            <button
                                                onClick={handleRetake}
                                                className="btn btn-secondary"
                                            >
                                                🔄 Reprendre
                                            </button>
                                            <button
                                                onClick={handleVerifyFace}
                                                disabled={isLoading}
                                                className={`btn ${isLoading ? 'btn-disabled' : 'btn-success'}`}
                                            >
                                                {isLoading ? 'Vérification...' : '✓ Vérifier'}
                                            </button>
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            {error && selectedTab === 'FACE' && (
                                <div className="mt-4 p-3 bg-danger-light text-danger rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Info session */}
                    <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                        <p>Session ID : {mfaState.sessionId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MfaPage;
