import React from 'react';
import FileUploadInput from '../../../components/forms/FileUploadInput';

/**
 * Register tab of the Auth modal — new resident sign-up form.
 * All state/handlers are owned by AuthModal and passed down as props,
 * including `t` (the translate function) and `lang` (the language chosen
 * in the navbar; also forwarded to the shared file-upload buttons).
 */
export default function RegisterForm({
  t,
  lang,
  regType,
  setRegType,
  registerForm,
  setRegisterForm,
  updateRegisterField,
  registerLoading,
  registerError,
  registerSuccess,
  setIdDocument,
  setProofOfResidence,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="card p-3 border-light-subtle bg-light">
        <h6 className="fw-bold mb-3 text-secondary">{t('registerHeading')}</h6>

        {registerError && (
          <div className="alert alert-danger py-2 small">{registerError}</div>
        )}
        {registerSuccess && (
          <div className="alert alert-success py-2 small">{registerSuccess}</div>
        )}

        {/* Registration Type Switcher (informational grouping only) */}
        <div className="mb-3">
          <label className="form-label fw-bold">{t('regTypeLabel')}</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="regType"
                id="relocate"
                checked={regType === 'Relocate'}
                onChange={() => setRegType('Relocate')}
              />
              <label className="form-check-label fw-semibold" htmlFor="relocate">
                {t('regTypeRelocate')}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="regType"
                id="firstTime"
                checked={regType === 'First-Time'}
                onChange={() => setRegType('First-Time')}
              />
              <label className="form-check-label fw-semibold" htmlFor="firstTime">
                {t('regTypeFirstTime')}
              </label>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">{t('fullName')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('fullNamePlaceholder')}
              value={registerForm.fullName}
              onChange={updateRegisterField('fullName')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('zanIdNida')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('zanIdPlaceholder')}
              value={registerForm.zanId}
              onChange={updateRegisterField('zanId')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('phone')}</label>
            <input
              type="tel"
              className="form-control"
              placeholder={t('phonePlaceholder')}
              value={registerForm.phoneNumber}
              onChange={updateRegisterField('phoneNumber')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('email')}</label>
            <input
              type="email"
              className="form-control"
              placeholder={t('emailPlaceholder')}
              value={registerForm.email}
              onChange={updateRegisterField('email')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('dateOfBirth')}</label>
            <input
              type="date"
              className="form-control"
              value={registerForm.dateOfBirth}
              onChange={updateRegisterField('dateOfBirth')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label d-block">{t('gender')}</label>
            <div className="d-flex gap-4 pt-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="MALE"
                  checked={registerForm.gender === 'MALE'}
                  onChange={updateRegisterField('gender')}
                  required
                />
                <label className="form-check-label" htmlFor="genderMale">
                  {t('genderMale')}
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="FEMALE"
                  checked={registerForm.gender === 'FEMALE'}
                  onChange={updateRegisterField('gender')}
                  required
                />
                <label className="form-check-label" htmlFor="genderFemale">
                  {t('genderFemale')}
                </label>
              </div>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">{t('houseNumber')}</label>
            <div className="input-group">
              <span className="input-group-text">SH/UW/</span>
              <select
                className="form-select"
                style={{ maxWidth: 90, flex: '0 0 auto' }}
                value={registerForm.houseZone}
                onChange={updateRegisterField('houseZone')}
                required
              >
                <option value="">{t('zoneOption')}</option>
                {['A','B','C','D','E','F','G','H'].map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
              <span className="input-group-text">/</span>
              <input
                type="text"
                className="form-control"
                placeholder="123"
                maxLength={3}
                value={registerForm.houseNo}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, '').slice(0, 3);
                  setRegisterForm((prev) => ({ ...prev, houseNo: digits }));
                }}
                required
              />
            </div>
            <div className="form-text">{t('houseHint')}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('street')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('streetPlaceholder')}
              value={registerForm.street}
              onChange={updateRegisterField('street')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('shehia')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('shehiaPlaceholder')}
              value={registerForm.shehia}
              onChange={updateRegisterField('shehia')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('district')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('districtPlaceholder')}
              value={registerForm.district}
              onChange={updateRegisterField('district')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('region')}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('regionPlaceholder')}
              value={registerForm.region}
              onChange={updateRegisterField('region')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('password')}</label>
            <input
              type="password"
              className="form-control"
              placeholder={t('passwordPlaceholder')}
              value={registerForm.password}
              onChange={updateRegisterField('password')}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('confirmPassword')}</label>
            <input
              type="password"
              className="form-control"
              placeholder={t('confirmPasswordPlaceholder')}
              value={registerForm.confirmPassword}
              onChange={updateRegisterField('confirmPassword')}
              required
            />
          </div>

          {/* Conditional Uploads Container */}
          <div className="col-12">
            <div className="p-3 bg-white border rounded">
              <p className="fw-bold text-primary mb-2">{t('docsHeading')}</p>

              <small className="text-muted d-block mb-2">
                {regType === 'Relocate' ? t('docsRelocate') : t('docsFirstTime')}
              </small>

              <div className="mb-2">
                <FileUploadInput
                  label={t('idDocument')}
                  lang={lang}
                  onChange={setIdDocument}
                />
              </div>

              <div>
                <FileUploadInput
                  label={t('proofOfResidence')}
                  lang={lang}
                  onChange={setProofOfResidence}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-shehia-primary w-100 fw-bold mt-4 py-2"
          disabled={registerLoading}
        >
          {registerLoading ? t('registerSubmitting') : t('registerSubmit')}
        </button>
      </div>
    </form>
  );
}
