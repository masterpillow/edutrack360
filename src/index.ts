import express from "express";
import cors from "cors";

const app = express();

// allow requests from your Codespaces web URL
app.use(cors({ origin: true }));
app.use(express.json());

// sanity checks
app.get("/", (_req, res) =>
  res.json({ message: "Welcome to EduTrack360 API 🚀" })
);
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/version", (_req, res) =>
  res.json({ app: "EduTrack360", version: "0.1.0" })
);

// --- Updated data with FrameVR classroom links ---
const sampleCourses = [
  {
    id: "eng110",
    code: "ENG-110",
    title: "English 110 Classroom",
    url: "https://framevr.io/csc-400-classroom-kt",
  },
  {
    id: "math100",
    code: "MATH-100",
    title: "Math 100 Classroom",
    url: "https://framevr.io/framevrproject-kevintran",
  },
  {
    id: "soc100",
    code: "SOC-100",
    title: "Social Studies 100 Classroom",
    url: "https://framevr.io/am-bedroom",
  },
  {
    id: "bio100",
    code: "BIO-100",
    title: "Bio 100 Classroom",
    url: "https://framevr.io/csc-400-kt#",
  },
  {
    id: "span101",
    code: "SPAN-101",
    title: "Spanish 101 Classroom",
    url: "https://framevr.io/csc-398",
  },
];

// serve on BOTH routes to be safe
app.get("/api/courses", (_req, res) => res.json(sampleCourses));
app.get("/courses", (_req, res) => res.json(sampleCourses));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`✅ API running on :${port}`));
