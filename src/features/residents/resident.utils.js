// ============================================================
// HELPERS for the Residents feature
// ============================================================
// Used by the dashboard's data-loading step to normalize whatever
// shape the backend returns (a plain array, or a Spring "Page" object
// with a `.content` array) into a plain array components can render.

export function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}
