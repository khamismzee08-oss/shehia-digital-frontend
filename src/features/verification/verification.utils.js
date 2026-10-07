// ============================================================
// HELPERS for the Verification feature
// ============================================================
import { LETTER_TYPE_LABELS, LETTER_STATUS_LABELS } from "./verification.i18n";

export function getLetterTypeLabel(lang, code) {
  return LETTER_TYPE_LABELS[lang]?.[code] || code;
}

export function getLetterStatusLabel(lang, code) {
  return LETTER_STATUS_LABELS[lang]?.[code] || code;
}
