import React from 'react';

/**
 * Login tab of the Auth modal — ZanID + password fields.
 * All state/handlers are owned by AuthModal and passed down as props,
 * including `t` (the translate function for the language chosen in the navbar).
 */
export default function LoginForm({
  t,
  loginZanId,
  setLoginZanId,
  loginPassword,
  setLoginPassword,
  loginLoading,
  loginError,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="card p-3 border-light-subtle bg-light mb-3">
        <h6 className="fw-bold mb-3 text-secondary">{t('loginHeading')}</h6>

        {loginError && (
          <div className="alert alert-danger py-2 small">{loginError}</div>
        )}

        <div className="mb-3">
          <label className="form-label font-monospace">{t('zanIdLabel')}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('zanIdPlaceholder')}
            value={loginZanId}
            onChange={(e) => setLoginZanId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label font-monospace">{t('passwordLabel')}</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-shehia-primary w-100 fw-bold py-2"
          disabled={loginLoading}
        >
          {loginLoading ? t('loginSubmitting') : t('loginSubmit')}
        </button>

        <p className="small text-muted mt-3 mb-0">{t('loginPendingNote')}</p>
      </div>
    </form>
  );
}
