import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) =>
  res.json({ message: "Welcome to EduTrack360 API 🚀" })
);
app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));
app.get("/version", (_req: Request, res: Response) =>
  res.json({ app: "EduTrack360", version: "0.1.0" })
);
app.get("/courses", (_req, res) => {
  res.json([
    { id: "c1", code: "CSC-101", title: "Intro to CS" },
    { id: "c2", code: "CSC-400", title: "Capstone Project" },
    { id: "c3", code: "MAT-221", title: "Statistics for Data Science" }
  ]);
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on :${port}`));
