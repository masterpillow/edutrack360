import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

type Course = { id: string; code: string; title: string };

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/courses")
      .then(res => setCourses(res.data))
      .catch(err => { console.error(err); setError("Could not load courses"); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto", color: "#e8eef7" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Available Courses</h1>
        <Link to="/" className="btn ghost">← Home</Link>
      </header>

      <div style={{ opacity: .7, fontSize: 12, margin: "8px 0" }}>
        API: {import.meta.env.VITE_API_URL || "http://localhost:4000"}
      </div>

      {loading && <p>Loading courses…</p>}
      {error && <p style={{ color: "#ff8a8a" }}>{error}</p>}
      {!loading && !error && courses.length === 0 && <p>No courses found.</p>}

      {!loading && !error && courses.length > 0 && (
        <ul style={{
          listStyle: "none", padding: 0, display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 12
        }}>
          {courses.map(c => (
            <li key={c.id} style={{
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 12, background: "rgba(0,0,0,.25)", padding: "14px 16px"
            }}>
              <div style={{ fontWeight: 800 }}>{c.code}</div>
              <div style={{ opacity: .9 }}>{c.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
