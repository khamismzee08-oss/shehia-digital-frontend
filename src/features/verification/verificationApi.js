/**
 * ============================================================
 * VERIFICATION API  ->  /api/v1/public/letters/verify/{code}
 * ============================================================
 * Debugging path: "Letter verification problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * GET /api/v1/public/letters/verify/{code}
 * Public, no-auth check for the short "HASH: XXXX-XXXX-XXXX" code printed
 * on every approved/signed letter. Returns:
 *   { valid, message, referenceNumber?, letterType?, residentName?, status?, issuedDate? }
 * `valid: false` is a normal response (not thrown), used for "no match".
 */
export function verifyLetter(code) {
  return request(`/public/letters/verify/${encodeURIComponent(code)}`, {
    auth: false,
  });
}
