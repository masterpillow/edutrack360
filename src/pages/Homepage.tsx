import React, { useEffect, useState } from "react";
import "../styles/landing.css";

type ApiStatus = "checking" | "online" | "offline";

export default function Homepage() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [version, setVersion] = useState<string | null>(null);

  // Optional: show API status if VITE_API_URL is set
  useEffect(() => {
    const base = import.meta.env.VITE_API_URL as string | undefined;
    if (!base) {
      setApiStatus("offline");
      return;
    }
    (async () => {
      try {
        const ok = await fetch(`${base}/health`).then(r => r.ok);
        if (!ok) return setApiStatus("offline");
        setApiStatus("online");
        const v = await fetch(`${base}/version`).then(r => r.json()).catch(() => null);
        setVersion(v?.version ?? null);
      } catch {
        setApiStatus("offline");
      }
    })();
  }, []);

  return (
    <div className="lp">
      {/* Top Nav */}
      <nav className="lp-nav" aria-label="Primary">
        <div className="brand">🎓 EduTrack360</div>
        <div className="links">
          <a href="#features">Features</a>
          <a href="#api">API</a>
          <a className="btn small ghost" href="#get-started">Get Started</a>
        </div>
      </nav>

      {/* Hero with background */}
      <main className="lp-hero">
        <div className="lp-overlay" role="region" aria-label="Hero">
          <p className="kicker">Personalized Learning</p>
          <h1>Learn Your Learning Style</h1>
          <p className="sub">
            A simple starting point for courses, sessions, and progress —
            with VR-ready modules your team can plug in.
          </p>

          {/* API status pill (optional) */}
          <div className="statusRow" id="api" aria-live="polite">
            <span className={`statusDot ${apiStatus}`} />
            <span className="statusText">
              API: {apiStatus === "checking" ? "Checking…" : apiStatus.toUpperCase()}
              {version ? ` • v${version}` : ""}
            </span>
          </div>

          <div className="cta">
            <a className="btn primary" href="#get-started">Get Started</a>
            <a className="btn ghost" href="#features">View Courses</a>
          </div>
        </div>
      </main>

      {/* Footer / features anchor */}
      <section id="features" className="lp-foot">
        © 2025 EduTrack360 • Backend: Node/Express/TypeScript • DB: Prisma/SQLite
      </section>
    </div>
  );
}

