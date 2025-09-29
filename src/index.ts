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

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on :${port}`));
