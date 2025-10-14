import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Version info
app.get("/version", (_req, res) =>
  res.json({ app: "EduTrack360", version: "0.1.0" })
);

// Courses endpoint
app.get("/courses", (_req, res) => {
  res.json([
    { id: "c1", code: "CSC-101", title: "Intro to CS" },
    { id: "c2", code: "CSC-400", title: "Capstone Project" },
    { id: "c3", code: "MAT-221", title: "Statistics for Data Science" },
  ]);
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`✅ EduTrack360 API running on http://localhost:${port}`)
);
