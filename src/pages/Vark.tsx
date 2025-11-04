import React from "react";

export default function Vark() {
    function nav(path: string): void {
        if (typeof window === "undefined") return;
        try {
            // Try to use the History API so navigation doesn't cause a full page reload.
            window.history.pushState({}, "", path);
            // Dispatch a popstate event so client-side routers (if any) can react.
            window.dispatchEvent(new PopStateEvent("popstate"));
        } catch {
            // Fallback to full navigation if History API isn't available for some reason.
            window.location.href = path;
        }
    }
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px", color: "#e8eef7" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Discover Your Learning Style (VARK)</h1>
        <a
          href="https://vark-learn.com/the-vark-questionnaire/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
          style={{ textDecoration: "none" }}
        >
          Take the VARK Assessment
        </a>
      </header>

      <p style={{ opacity: .8, marginTop: 10 }}>
        Take the short VARK questionnaire to learn how you best take in information. Then we’ll
        use your result to suggest course materials and study tips that match your style.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 24
        }}
      >
        {/* Visual */}
        <article style={card}>
          <h3 style={title}>Visual</h3>
          <p style={desc}>
            People with a strong visual preference for learning like: different formats, space,
            graphs, charts, diagrams, maps and plans.
          </p>
        </article>

        {/* Aural */}
        <article style={card}>
          <h3 style={title}>Aural</h3>
          <p style={desc}>
            People with a strong aural preference for learning like: discussions, stories,
            guest speakers, chat.
          </p>
        </article>

        {/* Read/Write */}
        <article style={card}>
          <h3 style={title}>Read/Write</h3>
          <p style={desc}>
            People with a strong read/write preference for learning like: lists, notes and text
            in all its formats and whether in print or online.
          </p>
        </article>

        {/* Kinesthetic */}
        <article style={card}>
          <h3 style={title}>Kinesthetic</h3>
          <p style={desc}>
            People with a strong kinesthetic preference for learning like: senses, practical
            exercises, examples, cases, trial and error.
          </p>
        </article>
      </section>

      <div style={{ marginTop: 24 }}>
  <button
    className="btn ghost"
    onClick={() => nav("/")}
    style={{
      padding: "10px 18px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,.3)",
      background: "rgba(255,255,255,.1)",
      cursor: "pointer",
      fontWeight: 600
    }}
  >
    ← Back to Homepage
  </button>
</div>
</div>
  );
}

const card: React.CSSProperties = {
  background: "rgba(0,0,0,.28)",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 14,
  padding: "16px 18px",
  minHeight: 150
};

const title: React.CSSProperties = { margin: "0 0 6px 0", fontWeight: 800 };
const desc: React.CSSProperties = { margin: 0, opacity: .9, lineHeight: 1.45 };
