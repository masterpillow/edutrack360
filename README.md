# EduTrack360 Starter

This starter contains a minimal backend (Node/Express + TypeScript + Prisma/SQLite) and a minimal React client scaffold,
plus CI config. Follow the steps in this README to get running locally.

## Structure
```
edutrack360/
  client/          # React (Vite) skeleton
  server/          # Node/Express API (TypeScript + Prisma)
  docs/
  .github/workflows/ci.yml
```

## Quickstart

### Server
```
cd server
npm install
cp .env.example .env
npx prisma db push
npm run dev
```
API health: http://localhost:4000/health

### Client
```
cd ../client
npm install
npm run dev
```
App: http://localhost:5173

Make sure your client `.env` has `VITE_API_URL="http://localhost:4000"`
