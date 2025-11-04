import React, { useEffect, useState } from "react";
import { getSession } from "../auth";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

type Row = {
  email: string;
  createdAt: string;
  progressPercent: number;
  role: "learner" | "instructor" | "admin";
};

export default function AdminPanel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // super simple guard
        const { token } = getSession() ?? { token: "" };
        const { data } = await api.get<Row[]>("/admin/users", {
          params: { token: "admin" } // demo gate; matches server
        });
        setRows(data);
      } catch (e) {
        console.error(e);
        setErr("Failed to load users");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto", color: "#e8eef7" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Panel</h1>
        <Link className="btn ghost" to="/">← Home</Link>
      </header>

      {err && <p style={{ color: "#ff8a8a" }}>{err}</p>}

      <div style={{
        marginTop: 16,
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 12,
        overflow: "hidden"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 8,
          fontWeight: 700,
          padding: "10px 12px",
          background: "rgba(255,255,255,.06)"
        }}>
          <div>Email</div>
          <div>Role</div>
          <div>Created</div>
          <div>Progress</div>
        </div>

        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 8,
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            alignItems: "center",
            background: "rgba(0,0,0,.18)"
          }}>
            <div style={{ wordBreak: "break-all" }}>{r.email}</div>
            <div style={{ opacity: .9, textTransform: "capitalize" }}>{r.role}</div>
            <div style={{ opacity: .8, fontSize: 12 }}>
              {new Date(r.createdAt).toLocaleString()}
            </div>

            {/* Progress bar + percent */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                position: "relative",
                width: 120,
                height: 10,
                background: "rgba(255,255,255,.15)",
                borderRadius: 999
              }}>
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${Math.max(0, Math.min(100, r.progressPercent))}%`,
                  borderRadius: 999,
                  background: "#7cd1ff"
                }} />
              </div>
              <div style={{ width: 42, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {Math.round(r.progressPercent)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
