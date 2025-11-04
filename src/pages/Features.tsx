import React from "react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: 20, color: "#e8eef7" }}>
        Platform Features
      </h1>
      <p style={{ color: "#b0c4de", marginBottom: 40 }}>
        EduTrack360 combines VR classrooms, personalized learning insights, 
        and course dashboards to improve student engagement and success.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "20px",
        }}
      >
        <FeatureCard
          title="VARK Learning Assessment"
          desc="Discover whether you learn best visually, by listening, through reading & writing, or by doing — then receive personalized study tips."
        />

        <FeatureCard
          title="VR Classrooms (FrameVR)"
          desc="Join immersive virtual learning spaces where lectures, collaboration, and interactive lessons come to life."
        />

        <FeatureCard
          title="Course Dashboard"
          desc="View available courses and jump directly into VR connected classrooms for real-time learning."
        />

        <FeatureCard
          title="Lecture Video Learning"
          desc="Watch recorded lessons and reinforce knowledge with platform-provided study tools."
        />
      </div>

      <div style={{ marginTop: 40 }}>
        <Link className="btn ghost" to="/">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        padding: 20,
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#e8eef7",
      }}
    >
      <h2 style={{ fontSize: "1.4rem", marginBottom: 10 }}>{title}</h2>
      <p style={{ fontSize: "0.92rem", opacity: 0.9 }}>{desc}</p>
    </div>
  );
}
