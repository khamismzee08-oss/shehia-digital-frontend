/**
 * ============================================================
 * RESIDENT API  ->  /api/v1/resident/register, /api/v1/resident/profile
 * ============================================================
 * Debugging path: "Resident registration problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * POST /api/v1/resident/register
 * multipart/form-data: the same fields as before —
 * {
 *   zanId, fullName, email, phoneNumber, houseNumber, street,
 *   shehia, district, region, dateOfBirth, gender ("MALE" | "FEMALE"), password
 * }
 * — plus two OPTIONAL File objects (from FileUploadInput / a camera
 * capture) sent as their own form parts, in place of the resident
 * typing idDocumentUrl / proofOfResidenceUrl as a string:
 *   files.idDocument       -> "idDocument" part
 *   files.proofOfResidence -> "proofOfResidence" part
 * The backend stores each file and fills in the *Url fields itself.
 * New accounts are created with status = PENDING, so login will be
 * rejected until an administrator activates the account.
 */
export function registerResident(payload, files = {}) {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      body.append(key, value);
    }
  });
  if (files.idDocument) body.append("idDocument", files.idDocument);
  if (files.proofOfResidence) body.append("proofOfResidence", files.proofOfResidence);

  return request("/resident/register", {
    method: "POST",
    body,
    isForm: true,
    auth: false,
  });
}

/**
 * GET /api/v1/resident/profile
 * Returns the UserResponse for the currently authenticated resident.
 */
export function getMyProfile() {
  return request("/resident/profile");
}
