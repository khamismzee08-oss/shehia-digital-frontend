// ============================================================
// HELPERS for the Letters feature
// ============================================================
import { LETTER_TYPE_OPTIONS } from "./letter.constants";

// Translated label for a letter type value, e.g. "BANK_KYC" -> "Barua ya Benki (KYC)".
// Falls back to the (translated) generic "service" label instead of a
// hardcoded Swahili string, so it stays correct when lang === 'ENG'.
export function getLetterTypeLabel(t, type) {
  const option = LETTER_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option ? t(option.labelKey) : type || t("service");
}
