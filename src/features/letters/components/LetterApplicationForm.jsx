import React from "react";
import { FileText, Loader2, Send } from "lucide-react";

import FileUploadInput from "../../../components/forms/FileUploadInput";
import { LETTER_TYPE_OPTIONS, LETTER_FORM_FIELDS } from "../letter.constants";
import DynamicLetterFields from "./DynamicLetterFields";

/**
 * "Apply for Government Letter" card: letter-type selector, read-only
 * resident info, the fields specific to the selected letter type, an
 * optional supporting document, and the submit button.
 */
export default function LetterApplicationForm({
  t,
  letterType,
  setLetterType,
  residentName,
  residentZanId,
  residentHouse,
  dynamicFormData,
  onDynamicFieldChange,
  setLetterSupportingDoc,
  submittingLetter,
  onSubmit,
}) {
  const fields = LETTER_FORM_FIELDS[letterType] || [];

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="rounded-3 p-2" style={{ backgroundColor: "#e7f6ee", color: "#008f50" }}>
            <FileText size={23} />
          </div>
          <div>
            <h5 className="fw-bold mb-1">{t('applyLetter')}</h5>
            <p className="text-muted small mb-0">{t('applyDesc')}</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="row g-3">
            {/* Letter Type */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('letterType')}</label>
              <select
                className="form-select form-select-lg"
                value={letterType}
                onChange={(event) => setLetterType(event.target.value)}
              >
                {LETTER_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                ))}
              </select>
            </div>

            {/* Resident Info (read-only) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('fullName')}</label>
              <input type="text" className="form-control form-control-lg bg-light" value={residentName} readOnly />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('zanId')}</label>
              <input type="text" className="form-control form-control-lg bg-light" value={residentZanId} readOnly />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('houseNumber')}</label>
              <input type="text" className="form-control form-control-lg bg-light" value={residentHouse} readOnly />
            </div>

            {/* Dynamic Fields (specific to the selected letter type) */}
            <DynamicLetterFields
              fields={fields}
              dynamicFormData={dynamicFormData}
              onChange={onDynamicFieldChange}
              t={t}
            />

            {/* Optional Supporting Document */}
            <div className="col-12">
              <label className="form-label fw-semibold">{t('docUrlLabel')}</label>
              <FileUploadInput
                helpText={t('docUrlHelp')}
                onChange={setLetterSupportingDoc}
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-4">
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 rounded-3 fw-semibold"
                disabled={submittingLetter}
                style={{ backgroundColor: "#008f50", borderColor: "#008f50" }}
              >
                {submittingLetter ? (
                  <><Loader2 size={18} className="me-2" />{t('submittingLetter')}</>
                ) : (
                  <><Send size={18} className="me-2" />{t('submitLetter')}</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
