// ============================================================
// Shared date formatting helper.
// ============================================================
// Used across features (letters, issues, announcements) wherever a
// backend timestamp needs to be shown to the resident. Kept generic
// and dependency-free so any feature can import it directly.

export function formatDate(value) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("sw-TZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
