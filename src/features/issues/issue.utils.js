// ============================================================
// HELPERS for the Issues feature
// ============================================================
import { ISSUE_CATEGORY_OPTIONS } from "./issue.constants";

// Translated label for an issue category value, e.g. "SANITATION" -> "Usafi wa Mazingira".
// Falls back to the (translated) "Other" label instead of a hardcoded
// Swahili string, so it stays correct when lang === 'ENG'.
export function getIssueCategoryLabel(t, category) {
  const option = ISSUE_CATEGORY_OPTIONS.find((opt) => opt.value === category);
  return option ? t(option.labelKey) : category || t("issueOther");
}
