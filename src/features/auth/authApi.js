/**
 * ============================================================
 * AUTH API  ->  /api/v1/auth/**
 * ============================================================
 * Everything the login/registration modal and the app shell need to
 * manage a resident's authentication session.
 *
 * Debugging path: "Login problem" -> here -> services/httpClient.js
 * ============================================================
 */
import {
  request,
  setToken,
  isAuthenticated,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  clearSession,
} from "../../services/httpClient";

// Re-exported so the rest of the app can treat "features/auth" as the
// front door for anything session-related, without reaching past it
// into the generic HTTP client directly.
export { isAuthenticated, getStoredUser, setStoredUser, clearStoredUser, clearSession };

/**
 * POST /api/v1/auth/login
 * body: { zanId, password }
 * returns: { token, zanId, role, tokenType, mustChangePassword }
 */
export async function login(zanId, password) {
  const data = await request("/auth/login", {
    method: "POST",
    body: { zanId, password },
    auth: false,
  });

  setToken(data.token);
  return data;
}

/**
 * POST /api/v1/auth/change-password
 * body: { currentPassword, newPassword }
 * Requires the resident to already be authenticated.
 */
export function changePassword({ currentPassword, newPassword }) {
  return request("/auth/change-password", {
    method: "POST",
    body: { currentPassword, newPassword },
  });
}

/**
 * POST /api/v1/auth/logout
 * Server-side this is a no-op (stateless JWT) but we still call it
 * for parity with the backend contract, then always clear locally.
 */
export async function logout() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    clearSession();
  }
}
