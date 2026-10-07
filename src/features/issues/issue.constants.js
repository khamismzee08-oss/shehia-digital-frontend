// ============================================================
// ENUM OPTIONS & STATIC DATA for the Issues feature
// ============================================================
// Pure data — no JSX, no translation logic. Each option only stores a
// `labelKey` that components resolve through `t()` at render time, so
// SW/ENG stays in sync automatically.

export const ISSUE_CATEGORY_OPTIONS = [
  { value: "SANITATION", labelKey: "issueSanitation" },
  { value: "INFRASTRUCTURE", labelKey: "issueInfrastructure" },
  { value: "SECURITY", labelKey: "issueSecurity" },
  { value: "WATER_ELEC", labelKey: "issueWaterElec" },
  { value: "PUBLIC_HEALTH", labelKey: "issueHealth" },
  { value: "OTHER", labelKey: "issueOther" },
];

export const ISSUE_PRIORITY_OPTIONS = [
  { value: "LOW", labelKey: "priorityLow" },
  { value: "MEDIUM", labelKey: "priorityMedium" },
  { value: "HIGH", labelKey: "priorityHigh" },
  { value: "URGENT", labelKey: "priorityUrgent" },
];
