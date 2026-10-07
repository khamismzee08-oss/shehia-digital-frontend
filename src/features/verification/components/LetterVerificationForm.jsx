import React from "react";
import { Search, Loader2, ShieldCheck } from "lucide-react";

/**
 * The verification code input + submit button. State (verifyCode,
 * verifyLoading) and the submit handler are owned by HomePage and
 * passed down as props.
 */
export default function LetterVerificationForm({
  t,
  verifyCode,
  setVerifyCode,
  verifyLoading,
  onSubmit,
}) {
  return (
    <form className="verify-letter-form" onSubmit={onSubmit}>
      <div className="verify-input-wrap">
        <Search size={17} className="verify-input-icon" />
        <input
          type="text"
          className="form-control verify-input"
          placeholder={t("verifyPlaceholder")}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          disabled={verifyLoading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-shehia-primary verify-submit-btn"
        disabled={verifyLoading}
      >
        {verifyLoading ? (
          <>
            <Loader2 size={16} className="spin-icon" />
            {t("verifyButtonLoading")}
          </>
        ) : (
          <>
            <ShieldCheck size={16} />
            {t("verifyButton")}
          </>
        )}
      </button>
    </form>
  );
}
