import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

type VideoLink = { label: string; url: string };
type Course = {
  id: string;
  code: string;
  title: string;
  vrUrl?: string;
  videos?: VideoLink[];
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // try /api/courses first (recommended)
        const { data } = await api.get<Course[]>("/api/courses");
        setCourses(data);
      } catch {
        try {
          // fallback if someone hits /courses on the API
          const { data } = await api.get<Course[]>("/courses");
          setCourses(data);
        } catch (e) {
          console.error(e);
          setError("Could not load courses");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 1080, margin: "0 auto", color: "#e8eef7" }}>
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
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 14
        }}>
          {courses.map(c => (
            <li key={c.id} style={{
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 12,
              background: "rgba(0,0,0,.25)",
              padding: "14px 16px"
            }}>
              <div style={{ fontWeight: 800, marginBottom: 4 }}>{c.code}</div>
              <div style={{ opacity: .9, marginBottom: 10 }}>{c.title}</div>

              {c.vrUrl && (
                <div style={{ marginBottom: 8 }}>
                  <a
                    href={c.vrUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "#9b7cff", fontWeight: 700 }}
                  >
                    Open in VR
                  </a>
                </div>
              )}

              {c.videos && c.videos.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, opacity: .8, marginBottom: 6 }}>Sample Lectures</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {c.videos.map((v, i) => (
                      <a
                        key={v.url + i}
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 13,
                          color: "#7cd1ff",
                          textDecoration: "none",
                          border: "1px solid rgba(255,255,255,.2)",
                          borderRadius: 8,
                          padding: "4px 8px"
                        }}
                      >
                        {v.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
