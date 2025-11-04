// src/auth.ts

export type Role = "learner" | "admin";

export type Session = {
  email: string;
  role: Role;
  token: string;
};

const KEY = "et360_token"; // keep the same key for backward-compat

/** Save a full session (new style) */
export function saveSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

/** Read session (works with old string token or new JSON) */
export function getSession(): Session | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  // If it's JSON, parse and return
  if (raw.startsWith("{") || raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw) as Session;
      // minimal shape guard
      if (parsed && typeof parsed.token === "string") return parsed;
      return null;
    } catch {
      return null;
    }
  }

  // Old style: just a token string
  return { email: "", role: "learner", token: raw };
}

/** Old API: just checks "something" is stored */
export function isAuthed(): boolean {
  const s = getSession();
  return !!s && typeof s.token === "string" && s.token.length > 0;
}

/** Am I admin? (new) */
export function isAdmin(): boolean {
  const s = getSession();
  return !!s && s.role === "admin";
}

/** Old API: login(dummyToken?) — kept for compatibility.
 *  If you call with an email, we’ll infer a role and create a full session.
 *    login("admin@edutrack360.com") -> { role: "admin" }
 *  If you call with a non-email, we treat it as a bare token (old behavior).
 */
export function login(value: string = "demo-token"): void {
  if (value.includes("@")) {
    // treat as email-based login
    const role: Role = value.toLowerCase().startsWith("admin")
      ? "admin"
      : "learner";
    saveSession({ email: value, role, token: "demo-token" });
  } else {
    // old style: bare token
    localStorage.setItem(KEY, value);
  }
}

/** New helper: use server response directly */
export function loginWithServerResponse(res: { token: string; user: { email: string; role: Role }}) {
  saveSession({ email: res.user.email, role: res.user.role, token: res.token });
}

/** Old API: logout() — unchanged */
export function logout(): void {
  localStorage.removeItem(KEY);
}
