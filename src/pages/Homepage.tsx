// src/pages/Homepage.tsx
import React from "react";
import "../styles/landing.css";
import { Link, useNavigate } from "react-router-dom";
import { isAuthed, isAdmin, logout } from "../auth";

export default function Homepage() {
  const nav = useNavigate();
  const authed = isAuthed();

  // Only protect certain routes
  function guardProtected(path: string) {
    if (!authed) return nav("/login");
    nav(path);
  }

  return (
    <div className="lp">
      <nav className="lp-nav" aria-label="Primary">
        <div className="brand">EduTrack360</div>
        <div className="links">
          <Link to="/features">Features</Link>
          <a href="#api">API</a>

          {isAdmin() && (
            <Link className="btn small ghost" to="/admin">
              Admin Panel
            </Link>
          )}

          {!authed ? (
            <>
              <Link className="btn small ghost" to="/login">Login</Link>
              <Link className="btn small primary" to="/register">Register</Link>
            </>
          ) : (
            <button
              className="btn small ghost"
              onClick={() => { logout(); nav("/"); }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="lp-hero" role="region" aria-label="Hero">
        <div className="lp-overlay">
          <p className="kicker">Personalized Learning</p>
          <h1>Learn Your Learning Style</h1>
          <p className="sub">
            Track your progress, explore VR-ready modules, and discover the learning
            approach that works best for you.
          </p>

          <div className="cta">
            {/* View Courses requires auth */}
            <button className="btn primary" onClick={() => guardProtected("/courses")}>
              View Courses
            </button>

            {/* Get Started goes to VARK without login */}
            <Link className="btn ghost" to="/vark">
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <footer className="lp-foot">
        © 2025 EduTrack360 • Backend: Node/Express/TypeScript
      </footer>
    </div>
  );
}
