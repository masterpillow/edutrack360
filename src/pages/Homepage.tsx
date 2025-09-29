import React from "react";
import "../styles/landing.css";

export default function Homepage() {
  return (
    <div className="lp">
      <nav className="lp-nav" aria-label="Primary">
        <div className="brand">EduTrack360</div>
        <div className="links">
          <a href="#features">Features</a>
          <a href="#api">API</a>
          <a className="btn small ghost" href="#get-started">Get Started</a>
        </div>
      </nav>

      <main className="lp-hero">
        <div className="lp-overlay" role="region" aria-label="Hero">
          <p className="kicker">Personalized Learning</p>
          <h1>Learn Your Learning Style</h1>
          <p className="sub">
            Track your progress, explore VR-ready modules, and discover
            the learning approach that works best for you.
          </p>
          <div className="cta">
            <a className="btn primary" href="#get-started">Get Started</a>
            <a className="btn ghost" href="#features">View Courses</a>
          </div>
        </div>
      </main>

      <footer className="lp-foot">
        © 2025 EduTrack360 • Built with React + Node + Prisma
      </footer>
    </div>
  );
}
