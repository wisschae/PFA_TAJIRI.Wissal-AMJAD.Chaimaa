import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './index.css';

/**
 * Composant racine de l'application
 */
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Toaster position="top-right" />
            <AppRouter />
        </AuthProvider>
    );
};

export default App;
