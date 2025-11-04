import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/* =========================
   Types
========================= */
type Role = "learner" | "admin";


type User = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;        // ISO string
  progressPercent: number;  // 0..100
};

type Course = {
  id: string;
  code: string;
  title: string;
  vrUrl: string;
  videos?: { label: string; url: string }[];
};

/* =========================
   In-memory data (demo)
========================= */
const users: User[] = [
  {
    id: "u_admin",
    email: "admin@edutrack360.com",
    role: "admin",
    createdAt: new Date().toISOString(),
    progressPercent: 100
  }
];

const courses: Course[] = [
  {
    id: "eng110",
    code: "ENG-110",
    title: "English 110",
    vrUrl: "https://framevr.io/csc-400-classroom-kt",
    videos: [
      { label: "Day 1", url: "https://youtu.be/6e77dgMAwS8" },
      { label: "Day 2", url: "https://youtu.be/dzTcaz1Y0DA" }
    ]
  },
  {
    id: "mat100",
    code: "MAT-100",
    title: "Math 100",
    vrUrl: "https://framevr.io/framevrproject-kevintran",
    videos: [
      { label: "Day 1", url: "https://youtu.be/WhbeooHLMpY" },
      { label: "Day 2", url: "https://youtu.be/MetArzO1AoQ" }
    ]
  },
  {
    id: "soc100",
    code: "SOC-100",
    title: "Social Studies 100",
    vrUrl: "https://framevr.io/am-bedroom",
    videos: [{ label: "Lecture", url: "https://youtu.be/m4Q5wloh3rM" }]
  },
  {
    id: "bio100",
    code: "BIO-100",
    title: "Biology 100",
    vrUrl: "https://framevr.io/csc-400-kt",
    videos: [{ label: "Lecture", url: "https://youtu.be/0pbK7IHKg8E" }]
  },
  {
    id: "spa101",
    code: "SPA-101",
    title: "Spanish 101",
    vrUrl: "https://framevr.io/csc-398",
    videos: [{ label: "Lecture", url: "https://youtu.be/GVNnqa7svvg" }]
  }
];

const uid = () => Math.random().toString(36).slice(2, 10);

/* =========================
   Health & info
========================= */
app.get("/", (_req, res) => res.json({ message: "Welcome to EduTrack360 API 🚀" }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/version", (_req, res) => res.json({ app: "EduTrack360", version: "0.1.0" }));

/* =========================
   Auth (demo)
   - register/login by email only
   - any email starting with "admin" => admin role
========================= */
app.post("/auth/register", (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: "email required" });

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({ token: "demo-token", user: { email: existing.email, role: existing.role } });
  }

  const role: Role = email.toLowerCase().startsWith("admin") ? "admin" : "learner";
  const user: User = {
    id: uid(),
    email,
    role,
    createdAt: new Date().toISOString(),
    progressPercent: 0
  };
  users.push(user);

  return res.json({ token: "demo-token", user: { email: user.email, role: user.role } });
});

app.post("/auth/login", (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: "email required" });

  let u = users.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!u) {
    u = {
      id: uid(),
      email,
      role: email.toLowerCase().startsWith("admin") ? "admin" : "learner",
      createdAt: new Date().toISOString(),
      progressPercent: 0
    };
    users.push(u);
  }
  return res.json({ token: "demo-token", user: { email: u.email, role: u.role } });
});

/* =========================
   Admin endpoint (demo)
   - GET /admin/users?token=admin
   - returns recent registered users with progress
========================= */
app.get("/admin/users", (req, res) => {
  const token = (req.query.token as string) || "";
  if (token !== "admin") return res.status(403).json({ error: "forbidden" });

  const rows = users.map(u => ({
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    progressPercent: u.progressPercent
  }));
  res.json(rows);
});

/* =========================
   Courses
========================= */
app.get("/api/courses", (_req, res) => res.json(courses));
app.get("/courses", (_req, res) => res.json(courses));

/* =========================
   Server
========================= */
const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`✅ API running on :${port}`));

export default app; // (optional, helpful for tests)
