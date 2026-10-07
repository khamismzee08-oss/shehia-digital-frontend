import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AuthModal from '../features/auth/components/AuthModal';
import HomePage from '../features/home/HomePage';
import ResidentDashboard from '../features/residents/pages/ResidentDashboard';
import {
  isAuthenticated,
  getStoredUser,
  setStoredUser,
  logout as apiLogout,
  clearSession,
} from '../features/auth/authApi';
import { getMyProfile } from '../features/residents/residentApi';

export default function App() {
  const [lang, setLang] = useState('SW');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const [user, setUser] = useState(null);
  const [bootLoading, setBootLoading] = useState(true);

  // --------------------------------------------------------
  // On first load: if a JWT is already stored (from a previous
  // session), verify it by pulling the resident's own profile
  // from GET /api/v1/resident/profile.
  // --------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      if (!isAuthenticated()) {
        setBootLoading(false);
        return;
      }

      try {
        const profile = await getMyProfile();
        if (!cancelled) {
          setUser(profile);
          setStoredUser(profile);
        }
      } catch (err) {
        // Token invalid/expired -> drop the stale session quietly
        clearSession();
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setBootLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Called by AuthModal once POST /api/v1/auth/login succeeds and
  // the resident profile (GET /api/v1/resident/profile) has been
  // fetched using the new token.
  const handleLoginSuccess = (profile) => {
    setUser(profile);
    setStoredUser(profile);
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      await apiLogout(); // POST /api/v1/auth/logout, then clears local session
    } finally {
      setUser(null);
    }
  };

  if (bootLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{ backgroundColor: '#f5f8f6' }}
      >
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Inapakia...</span>
          </div>
          <p className="text-muted mb-0">Inapakia Mfumo wa Shehia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        lang={lang}
        setLang={setLang}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        {user ? (
          <ResidentDashboard user={user} lang={lang} />
        ) : (
          <HomePage onOpenAuth={handleOpenAuth} lang={lang} setLang={setLang} />
        )}
      </main>

      <Footer />

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authMode}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
