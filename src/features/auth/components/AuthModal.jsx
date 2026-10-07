import React, { useLayoutEffect, useState } from 'react';
import { login } from '../authApi';
import { getMyProfile } from '../../residents/residentApi';
import { registerResident } from '../../residents/residentApi';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { TRANSLATIONS } from '../auth.i18n';

const initialRegisterState = {
  fullName: '',
  zanId: '',
  email: '',
  phoneNumber: '',
  houseZone: '',
  houseNo: '',
  street: '',
  shehia: '',
  district: '',
  region: '',
  dateOfBirth: '',
  gender: '', // 'MALE' | 'FEMALE'
  password: '',
  confirmPassword: '',
};

/**
 * Login/registration modal shell: owns tab switching plus all form
 * state and submit handlers, and calls into features/auth/authApi.js
 * and features/residents/residentApi.js. The actual form markup lives
 * in LoginForm.jsx and RegisterForm.jsx.
 *
 * `lang` ("SW" | "ENG") is the language picked in the navbar; every text in
 * the modal comes from ../auth.i18n.js.
 *
 * Debugging path: "Login/registration problem" -> here -> authApi.js /
 * residentApi.js -> services/httpClient.js
 */
export default function AuthModal({ show, onClose, initialTab = 'login', onLoginSuccess, lang = 'SW' }) {
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.SW[key] || key;

  const [activeTab, setActiveTab] = useState(initialTab); // 'login' or 'register'
  const [regType, setRegType] = useState('Relocate'); // 'Relocate' or 'First-Time' (UI grouping only)

  // -------------------- LOGIN STATE --------------------
  const [loginZanId, setLoginZanId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // -------------------- REGISTER STATE --------------------
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  // Real uploaded files (or camera captures), in place of the
  // idDocumentUrl / proofOfResidenceUrl text fields.
  const [idDocument, setIdDocument] = useState(null);
  const [proofOfResidence, setProofOfResidence] = useState(null);

  // This component stays mounted while the modal is closed, so useState(initialTab)
  // only applies the very first time. Re-sync the tab each time the modal is
  // opened so "Register" opens the register tab and "Login" opens the login tab.
  // (useLayoutEffect so the correct tab is in place before the first paint.)
  useLayoutEffect(() => {
    if (show) setActiveTab(initialTab);
  }, [show, initialTab]);

  if (!show) return null;

  const resetAndClose = () => {
    setLoginError('');
    setRegisterError('');
    setRegisterSuccess('');
    onClose();
  };

  const updateRegisterField = (field) => (event) => {
    setRegisterForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // ======================================================
  // LOGIN  ->  POST /api/v1/auth/login
  // then     ->  GET /api/v1/resident/profile
  // ======================================================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const authData = await login(loginZanId.trim(), loginPassword);

      // Pull the full resident profile now that we hold a valid token.
      const profile = await getMyProfile();

      onLoginSuccess({
        ...profile,
        mustChangePassword: authData.mustChangePassword,
      });

      setLoginZanId('');
      setLoginPassword('');
    } catch (err) {
      setLoginError(err?.message || t('errLoginFailed'));
    } finally {
      setLoginLoading(false);
    }
  };

  // ======================================================
  // REGISTER  ->  POST /api/v1/resident/register
  // ======================================================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (registerForm.gender !== 'MALE' && registerForm.gender !== 'FEMALE') {
      setRegisterError(t('errGenderRequired'));
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError(t('errPasswordMismatch'));
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError(t('errPasswordShort'));
      return;
    }

    if (!registerForm.houseZone || !/^\d{3}$/.test(registerForm.houseNo) || registerForm.houseNo === '000') {
      setRegisterError(t('errHouseNumber'));
      return;
    }

    setRegisterLoading(true);

    try {
      const payload = {
        zanId: registerForm.zanId.trim(),
        fullName: registerForm.fullName.trim(),
        email: registerForm.email.trim() || null,
        phoneNumber: registerForm.phoneNumber.trim(),
        houseNumber: `SH/UW/${registerForm.houseZone}/${registerForm.houseNo}`,
        street: registerForm.street.trim(),
        shehia: registerForm.shehia.trim(),
        district: registerForm.district.trim(),
        region: registerForm.region.trim(),
        dateOfBirth: registerForm.dateOfBirth || null,
        gender: registerForm.gender,
        password: registerForm.password,
      };

      await registerResident(payload, { idDocument, proofOfResidence });

      setRegisterSuccess(t('registerSuccess'));
      setRegisterForm(initialRegisterState);
      setIdDocument(null);
      setProofOfResidence(null);

      // Give the resident a moment to read the confirmation, then
      // switch them to the login tab.
      setTimeout(() => {
        setActiveTab('login');
        setRegisterSuccess('');
      }, 3500);
    } catch (err) {
      setRegisterError(err?.message || t('errRegisterFailed'));
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="modal show d-block tab-modal-backdrop" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content card-custom">

          <div className="modal-header bg-shehia-primary text-white">
            <div>
              <h5 className="modal-title fw-bold">{t('modalTitle')}</h5>
              <p className="mb-0 small text-light">{t('modalSubtitle')}</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={resetAndClose}></button>
          </div>

          <div className="modal-body p-4">
            <ul className="nav nav-tabs nav-fill mb-4">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link fw-bold ${activeTab === 'login' ? 'active text-success' : 'text-secondary'}`}
                  onClick={() => setActiveTab('login')}
                >
                  {t('tabLogin')}
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link fw-bold ${activeTab === 'register' ? 'active text-success' : 'text-secondary'}`}
                  onClick={() => setActiveTab('register')}
                >
                  {t('tabRegister')}
                </button>
              </li>
            </ul>

            {activeTab === 'login' && (
              <LoginForm
                t={t}
                loginZanId={loginZanId}
                setLoginZanId={setLoginZanId}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                loginLoading={loginLoading}
                loginError={loginError}
                onSubmit={handleLoginSubmit}
              />
            )}

            {activeTab === 'register' && (
              <RegisterForm
                t={t}
                lang={lang}
                regType={regType}
                setRegType={setRegType}
                registerForm={registerForm}
                setRegisterForm={setRegisterForm}
                updateRegisterField={updateRegisterField}
                registerLoading={registerLoading}
                registerError={registerError}
                registerSuccess={registerSuccess}
                setIdDocument={setIdDocument}
                setProofOfResidence={setProofOfResidence}
                onSubmit={handleRegisterSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
