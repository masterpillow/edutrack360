import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock data with FrameVR links ---
type Course = { id: string; code: string; title: string; url: string };

const courses: Course[] = [
  { id: "eng110",   code: "ENG-110",  title: "English 110",        url: "https://framevr.io/csc-400-classroom-kt" },
  { id: "math100",  code: "MATH-100", title: "Math 100",           url: "https://framevr.io/framevrproject-kevintran" },
  { id: "soc100",   code: "SOC-100",  title: "Social Studies 100", url: "https://framevr.io/am-bedroom" },
  { id: "bio100",   code: "BIO-100",  title: "Bio 100",            url: "https://framevr.io/csc-400-kt#" },
  { id: "span101",  code: "SPAN-101", title: "Spanish 101",        url: "https://framevr.io/csc-398" },
];

app.get("/", (_req, res) => res.json({ message: "Welcome to EduTrack360 API 🚀" }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/version", (_req, res) => res.json({ app: "EduTrack360", version: "0.1.0" }));

// Courses endpoint
app.get("/api/courses", (_req, res) => {
  res.json(courses);
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on :${port}`));
