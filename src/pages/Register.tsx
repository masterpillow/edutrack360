import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { loginWithServerResponse, login } from "../auth";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { email });
      loginWithServerResponse(data);
      nav("/");
    } catch (e) {
      console.warn("Register API failed, using fallback token.", e);
      login(`${email}-token`);
      nav("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", color: "#e8eef7" }}>
      <h1 style={{ marginBottom: 8 }}>Register</h1>
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
          {loading ? "Creating…" : "Create Account"}
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
