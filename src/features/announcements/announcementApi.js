/**
 * ============================================================
 * ANNOUNCEMENT API  ->  /api/v1/public/announcements
 * ============================================================
 * Debugging path: "Announcement problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * GET /api/v1/public/announcements
 * Returns only PUBLISHED announcements (backend filters this). No auth
 * required — used by both the public landing page and the resident
 * dashboard.
 */
export function getPublicAnnouncements() {
  return request("/public/announcements", { auth: false });
}
