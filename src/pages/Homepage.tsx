import React from "react";
import "../styles/landing.css";

export default function Homepage() {
  return (
    <div className="lp">
      <nav className="lp-nav">
        <div className="brand">EduTrack360</div>
        <div className="links">
          <a href="#">Features</a>
          <a href="#">API</a>
          <a href="#">Get Started</a>
        </div>
      </nav>

      <main className="lp-hero">
        <div className="lp-overlay">
          <p className="kicker">Personalized Learning</p>
          <h1>Learn Your Learning Style</h1>
          <p className="sub">
            A simple starting point for courses, sessions, and progress — with VR-ready modules your team can plug in.
          </p>
          <div className="cta">
            <a className="btn primary" href="#">Get Started</a>
            <a className="btn ghost" href="#">View Courses</a>
          </div>
        </div>
      </main>

      <footer className="lp-foot">
        © 2025 EduTrack360 • Backend: Node/Express/TypeScript • DB: Prisma/SQLite
      </footer>
    </div>
  );
}
