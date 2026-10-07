// ============================================================
// Shared status -> badge style mapping.
// ============================================================
// Both the letters table and the issues table show a status badge for
// a backend status string. The mapping logic itself isn't specific to
// either feature, so it lives here instead of being duplicated in
// letter.utils.js and issue.utils.js.

export function getStatusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (["approved", "signed", "resolved", "closed"].some((s) => value.includes(s))) {
    return { className: "bg-success-subtle text-success", label: "completed" };
  }

  if (["rejected", "cancel"].some((s) => value.includes(s))) {
    return { className: "bg-danger-subtle text-danger", label: "rejected" };
  }

  if (["pending", "assigned", "in_progress", "changes_requested"].some((s) => value.includes(s))) {
    return { className: "bg-warning-subtle text-warning-emphasis", label: "pending" };
  }

  return { className: "bg-secondary-subtle text-secondary", label: "unknown" };
}
