import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/version", (_req, res) => res.json({ app: "EduTrack360", version: "0.1.0" }));

// Example mock endpoint for courses
app.get("/api/courses", (_req, res) => {
  res.json([{ id: "c1", code: "CSC-101", title: "Intro to CS" }]);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));
