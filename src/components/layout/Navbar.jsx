import React from 'react';
import { UserCheck, LogOut, Menu } from 'lucide-react';

// ============================================================
// TRANSLATIONS for Navbar
// ============================================================

const TRANSLATIONS = {
  SW: {
    brand: "SHEHIA YA FUONI UWANDANI",
    brandSub: "Wilaya ya Magharibi B · Zanzibar",
    // Public (logged-out) nav items — link to sections on the landing page.
    about: "Kuhusu Sisi",
    emergency: "Namba za Dharura",
    verify: "Hakiki Barua",
    // Resident (logged-in) nav items — link to sections on the dashboard.
    applyLetter: "Omba Barua",
    trackLetter: "Fuatilia Maombi",
    reportIssue: "Ripoti Tatizo",
    announcements: "Matangazo",
    login: "Ingia",
    register: "Jisajili",
    logout: "Toka",
  },
  ENG: {
    brand: "FUONI UWANDANI WARD",
    brandSub: "Magharibi B District · Zanzibar",
    // Public (logged-out) nav items — link to sections on the landing page.
    about: "About Us",
    emergency: "Emergency Numbers",
    verify: "Verify a Letter",
    // Resident (logged-in) nav items — link to sections on the dashboard.
    applyLetter: "Apply for Letter",
    trackLetter: "Track Application",
    reportIssue: "Report Issue",
    announcements: "Announcements",
    login: "Login",
    register: "Register",
    logout: "Logout",
  },
};

// ============================================================
// COMPONENT
// ============================================================

export default function Navbar({ lang, setLang, user, onOpenAuth, onLogout }) {
  // Helper to get translation
  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-shehia-primary sticky-top shadow-sm">
      <div className="container">
        {/* Brand/Logo */}
        <a className="navbar-brand d-flex flex-column fw-bold" href="#">
          <span className="fs-5">{t('brand')}</span>
          <small className="text-light opacity-75" style={{ fontSize: '0.75rem' }}>
            {t('brandSub')}
          </small>
        </a>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <Menu className="text-white" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Nav items are entirely different depending on who's looking:
              a logged-out visitor sees the public landing-page sections,
              a logged-in resident sees shortcuts into their own dashboard
              sections instead. Never mix the two lists together. */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white active" href="#apply-letter">
                    {t('applyLetter')}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#my-letters">
                    {t('trackLetter')}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#report-issue">
                    {t('reportIssue')}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#announcements">
                    {t('announcements')}
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white active" href="#about">
                    {t('about')}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#emergency">
                    {t('emergency')}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#verify">
                    {t('verify')}
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* Top Right Controls */}
          <div className="d-flex align-items-center gap-3">
            {/* Language Switcher (already there) */}
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${lang === 'SW' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                onClick={() => setLang('SW')}
              >
                SW
              </button>
              <button
                type="button"
                className={`btn ${lang === 'ENG' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                onClick={() => setLang('ENG')}
              >
                ENG
              </button>
            </div>

            {/* Dynamic Auth / User State */}
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark d-none d-md-inline-block">
                  <UserCheck size={14} className="me-1" /> {user.fullName || user.zanId} · {user.status}
                </span>
                <button className="btn btn-danger btn-sm d-flex align-items-center gap-1" onClick={onLogout}>
                  <LogOut size={16} /> {t('logout')}
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => onOpenAuth('login')}>
                  {t('login')}
                </button>
                <button className="btn btn-warning btn-sm fw-bold" onClick={() => onOpenAuth('register')}>
                  {t('register')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}