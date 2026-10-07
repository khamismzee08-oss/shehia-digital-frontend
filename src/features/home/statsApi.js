/**
 * ============================================================
 * PUBLIC STATS API  ->  /api/v1/public/stats
 * ============================================================
 * Debugging path: "Hero statistics card problem" -> here -> services/httpClient.js
 * ============================================================
 */
import { request } from "../../services/httpClient";

/**
 * GET /api/v1/public/stats  (no auth required)
 * returns: { totalResidents, totalHouses, maleResidents, femaleResidents }
 * Counts cover ACTIVE (verified) residents only.
 */
export function getPublicStats() {
  return request("/public/stats", { auth: false });
}
