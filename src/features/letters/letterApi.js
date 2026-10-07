/**
 * ============================================================
 * LETTER API  ->  /api/v1/resident/letters/**
 * ============================================================
 * Debugging path: "Letter application problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * POST /api/v1/resident/letters/apply
 * multipart/form-data: { type, formData, supportingDoc? }
 *   - type: one of LetterType enum values
 *   - formData: a string (JSON.stringify'd form details are fine)
 *   - supportingDoc: OPTIONAL File (from FileUploadInput / a camera
 *     capture), in place of the resident typing a docUrl string. The
 *     backend stores it and fills in supportingDocUrl itself.
 */
export function applyForLetter({ type, formData, supportingDoc }) {
  const body = new FormData();
  body.append("type", type);
  body.append("formData", formData);
  if (supportingDoc) body.append("supportingDoc", supportingDoc);

  return request("/resident/letters/apply", {
    method: "POST",
    body,
    isForm: true,
  });
}

/**
 * GET /api/v1/resident/letters
 * Returns the authenticated resident's own letter applications.
 */
export function getMyLetters() {
  return request("/resident/letters");
}

/**
 * GET /api/v1/resident/letters/{referenceNumber}/view
 * Returns generated letter HTML (only once APPROVED/SIGNED).
 */
export function fetchMyLetterHtml(referenceNumber) {
  return request(`/resident/letters/${encodeURIComponent(referenceNumber)}/view`, {
    responseType: "text",
  });
}

/**
 * GET /api/v1/resident/letters/{referenceNumber}/download
 * Returns a PDF (application/pdf) as a Blob and triggers a download.
 */
export async function downloadMyLetterPdf(referenceNumber) {
  const blob = await request(
    `/resident/letters/${encodeURIComponent(referenceNumber)}/download`,
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${referenceNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
