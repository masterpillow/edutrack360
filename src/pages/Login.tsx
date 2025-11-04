// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { loginWithServerResponse, login } from "../auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // New: call backend to get { token, user:{email, role} }
      const { data } = await api.post("/auth/login", { email });
      loginWithServerResponse(data);
      nav("/"); // back to homepage (your current behavior)
    } catch (e) {
      // Fallback: preserve your old behavior if API fails
      console.warn("Login API failed, using fallback token.", e);
      login(`${email}-token`);
      nav("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", color: "#e8eef7" }}>
      <h1 style={{ marginBottom: 8 }}>Login</h1>
      <p style={{ opacity: .8, marginBottom: 24 }}>
        Use any email/password. If the API is available, we’ll record your role (emails starting with <code>admin</code> become admin).
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #334" }}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #334" }}
        />
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
        {err && <div style={{ color: "#ff8a8a" }}>{err}</div>}
      </form>
      <div style={{ marginTop: 12 }}>
        New here? <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
}
