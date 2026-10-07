/**
 * ============================================================
 * SHARED HTTP CLIENT
 * ============================================================
 * Generic, feature-agnostic HTTP infrastructure for talking to the
 * Spring Boot backend (com.shehia_management.api).
 *
 * Base path on the server:   /api/v1
 * Auth pattern:               Stateless JWT ("Authorization: Bearer <token>")
 *
 * This file owns ONLY generic concerns: base URL, JWT/session storage,
 * building requests (JSON / FormData), and normalizing responses/errors
 * (including blob responses for PDF downloads). It knows nothing about
 * any specific feature (auth, letters, issues, ...).
 *
 * Debugging path: "All API requests suddenly fail" -> start here.
 * ============================================================
 */

// ------------------------------------------------------------
// BASE URL
// ------------------------------------------------------------
// Configure VITE_API_BASE_URL in a .env file for production, e.g.
//   VITE_API_BASE_URL=https://api.shehia.go.tz/api/v1
// Falls back to the local Spring Boot dev server (default port 8080).
const BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  "http://localhost:8080/api/v1";

// ------------------------------------------------------------
// TOKEN / SESSION STORAGE
// ------------------------------------------------------------
const TOKEN_KEY = "shehia_token";
const USER_KEY = "shehia_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function clearSession() {
  clearToken();
  clearStoredUser();
}

// ------------------------------------------------------------
// CORE REQUEST HELPER
// ------------------------------------------------------------
// GlobalExceptionHandler on the backend returns errors shaped like:
//   { timestamp, status, error, message }
// We normalize that into a thrown Error whose `.message` is
// the human-readable backend message, with `.status` attached.

export async function request(
  path,
  { method = "GET", body, isForm = false, responseType = "json", auth = true } = {}
) {
  const headers = {};

  if (!isForm && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch (networkErr) {
    const err = new Error(
      "Imeshindikana kuwasiliana na server. Hakikisha una mtandao au jaribu tena baadaye."
    );
    err.cause = networkErr;
    err.isNetworkError = true;
    throw err;
  }

  // 204 No Content
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (responseType === "blob") {
    if (!response.ok) {
      let message = `Ombi limeshindikana (HTTP ${response.status}).`;
      try {
        const data = await response.json();
        message = data?.message || message;
      } catch {
        /* body wasn't JSON, ignore */
      }
      const err = new Error(message);
      err.status = response.status;
      throw err;
    }
    return response.blob();
  }

  let data = null;
  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => null);
  }

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && data.message) ||
      (typeof data === "string" && data) ||
      `Ombi limeshindikana (HTTP ${response.status}).`;

    const err = new Error(message);
    err.status = response.status;
    err.payload = data;

    // Session expired / invalid token -> clear it so the UI can react
    if (response.status === 401) {
      clearSession();
    }

    throw err;
  }

  return data;
}
