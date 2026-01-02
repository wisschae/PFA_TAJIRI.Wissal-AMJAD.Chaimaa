import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/worldcup/Login';
import MFA from '../pages/worldcup/MFA';
import Dashboard from '../pages/worldcup/Dashboard';
import OtpSetup from '../pages/worldcup/OtpSetup';
import Page403 from '../pages/Page403';
import Page404 from '../pages/Page404';

// Pages des ressources
import HomePage from '../pages/HomePage';
import UserDashboardPage from '../pages/UserDashboardPage';
import ConfidentialDocumentsPage from '../pages/ConfidentialDocumentsPage';
import ClientsDatabasePage from '../pages/ClientsDatabasePage';
import ProductionServerPage from '../pages/ProductionServerPage';
import SourceCodeRepoPage from '../pages/SourceCodeRepoPage';
import DigitalVaultPage from '../pages/DigitalVaultPage';
import EncryptionKeysPage from '../pages/EncryptionKeysPage';

// World Cup 2026 Resources
import FanZoneLiveHub from '../pages/resources/FanZoneLiveHub';
import MatchPredictions from '../pages/resources/MatchPredictions';
import TicketReservationCenter from '../pages/resources/TicketReservationCenter';
import VipHospitalityLounge from '../pages/resources/VipHospitalityLounge';
import TeamTravelHotels from '../pages/resources/TeamTravelHotels';
import StadiumOperations from '../pages/resources/StadiumOperations';
import SecurityControlRoom from '../pages/resources/SecurityControlRoom';
import CryptoVault from '../pages/resources/CryptoVault';

import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Configuration des routes de l'application
 * Niveaux : 1=PUBLIC, 2=CONFIDENTIEL, 3=SECRET, 4=TOP_SECRET
 */
const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route par défaut : redirection vers /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/mfa" element={<MFA />} />
                <Route path="/403" element={<Page403 />} />

                {/* Dashboard principal (protégé) */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* OTP Setup - Accessible même avant MFA complet */}
                <Route path="/settings/otp" element={<OtpSetup />} />

                {/* Routes des ressources - Niveau PUBLIC (1) */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute requiredPriority={1}>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/user"
                    element={
                        <ProtectedRoute requiredPriority={1}>
                            <UserDashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Routes des ressources - Niveau CONFIDENTIEL (2) */}
                <Route
                    path="/documents/confidential"
                    element={
                        <ProtectedRoute requiredPriority={2}>
                            <ConfidentialDocumentsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/db/clients"
                    element={
                        <ProtectedRoute requiredPriority={2}>
                            <ClientsDatabasePage />
                        </ProtectedRoute>
                    }
                />

                {/* Routes des ressources - Niveau SECRET (3) */}
                <Route
                    path="/servers/production"
                    element={
                        <ProtectedRoute requiredPriority={3}>
                            <ProductionServerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/repo/source"
                    element={
                        <ProtectedRoute requiredPriority={3}>
                            <SourceCodeRepoPage />
                        </ProtectedRoute>
                    }
                />

                {/* Routes des ressources - Niveau TOP_SECRET (4) */}
                <Route
                    path="/vault/secrets"
                    element={
                        <ProtectedRoute requiredPriority={4}>
                            <DigitalVaultPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/vault/encryption-keys"
                    element={
                        <ProtectedRoute requiredPriority={4}>
                            <EncryptionKeysPage />
                        </ProtectedRoute>
                    }
                />

                {/* ========== WORLD CUP 2026 RESOURCES ========== */}

                {/* Level 1 - PUBLIC */}
                <Route
                    path="/wc2026/fanzone/live"
                    element={
                        <ProtectedRoute requiredPriority={1}>
                            <FanZoneLiveHub />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wc2026/predictions"
                    element={
                        <ProtectedRoute requiredPriority={1}>
                            <MatchPredictions />
                        </ProtectedRoute>
                    }
                />

                {/* Level 2 - CONFIDENTIEL */}
                <Route
                    path="/wc2026/tickets/reservations"
                    element={
                        <ProtectedRoute requiredPriority={2}>
                            <TicketReservationCenter />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wc2026/vip/hospitality"
                    element={
                        <ProtectedRoute requiredPriority={2}>
                            <VipHospitalityLounge />
                        </ProtectedRoute>
                    }
                />

                {/* Level 3 - SECRET */}
                <Route
                    path="/wc2026/ops/team-travel"
                    element={
                        <ProtectedRoute requiredPriority={3}>
                            <TeamTravelHotels />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wc2026/ops/stadium"
                    element={
                        <ProtectedRoute requiredPriority={3}>
                            <StadiumOperations />
                        </ProtectedRoute>
                    }
                />

                {/* Level 4 - TOP_SECRET */}
                <Route
                    path="/wc2026/security/control-room"
                    element={
                        <ProtectedRoute requiredPriority={4}>
                            <SecurityControlRoom />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wc2026/security/crypto-vault"
                    element={
                        <ProtectedRoute requiredPriority={4}>
                            <CryptoVault />
                        </ProtectedRoute>
                    }
                />

                {/* Route 404 - Page introuvable */}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
