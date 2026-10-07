import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { getLetterTypeLabel, getLetterStatusLabel } from "../verification.utils";

/**
 * Renders the outcome of a verify-letter check: a network/server
 * error, a valid letter's details, or an "invalid" message. State is
 * owned by HomePage and passed down as props.
 */
export default function VerificationResult({ t, lang, verifyErrorMsg, verifyResult, onReset }) {
  return (
    <>
      {verifyErrorMsg && (
        <div className="verify-result verify-result-error mt-3">
          <XCircle size={22} />
          <div>
            <strong>{verifyErrorMsg}</strong>
          </div>
        </div>
      )}

      {verifyResult && verifyResult.valid && (
        <div className="verify-result verify-result-valid mt-3">
          <CheckCircle2 size={26} className="verify-result-icon" />
          <div className="verify-result-body">
            <strong className="verify-result-title">{t("verifyValidTitle")}</strong>
            <div className="verify-result-grid">
              <div>
                <span>{t("verifyFieldRef")}</span>
                <strong>{verifyResult.referenceNumber}</strong>
              </div>
              <div>
                <span>{t("verifyFieldType")}</span>
                <strong>{getLetterTypeLabel(lang, verifyResult.letterType)}</strong>
              </div>
              <div>
                <span>{t("verifyFieldResident")}</span>
                <strong>{verifyResult.residentName}</strong>
              </div>
              <div>
                <span>{t("verifyFieldStatus")}</span>
                <strong>{getLetterStatusLabel(lang, verifyResult.status)}</strong>
              </div>
              <div>
                <span>{t("verifyFieldDate")}</span>
                <strong>{verifyResult.issuedDate}</strong>
              </div>
            </div>
            <button type="button" className="verify-reset-link" onClick={onReset}>
              {t("verifyAnother")}
            </button>
          </div>
        </div>
      )}

      {verifyResult && !verifyResult.valid && (
        <div className="verify-result verify-result-invalid mt-3">
          <XCircle size={26} className="verify-result-icon" />
          <div className="verify-result-body">
            <strong className="verify-result-title">{t("verifyInvalidTitle")}</strong>
            <p className="mb-2">{verifyResult.message}</p>
            <button type="button" className="verify-reset-link" onClick={onReset}>
              {t("verifyAnother")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
