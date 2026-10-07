/**
 * ============================================================
 * ISSUE API  ->  /api/v1/resident/issues/**
 * ============================================================
 * Debugging path: "Issue reporting problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * POST /api/v1/resident/issues/report
 * multipart/form-data: { category, priority, location, description, photo? }
 *   - photo: OPTIONAL File (from FileUploadInput / a camera capture),
 *     in place of the resident typing a photoUrl string. The backend
 *     stores it and fills in photoUrl itself.
 */
export function reportIssue({ category, priority, location, description, photo }) {
  const body = new FormData();
  body.append("category", category);
  body.append("priority", priority);
  if (location) body.append("location", location);
  body.append("description", description);
  if (photo) body.append("photo", photo);

  return request("/resident/issues/report", {
    method: "POST",
    body,
    isForm: true,
  });
}

/**
 * GET /api/v1/resident/issues
 * Returns the authenticated resident's own issue reports.
 */
export function getMyIssues() {
  return request("/resident/issues");
}
