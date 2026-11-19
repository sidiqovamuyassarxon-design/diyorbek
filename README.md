# Galactic Journey

A Next.js + React Three Fiber starter for an immersive space exploration experience.

## Included in this ZIP

- Responsive futuristic dashboard UI
- Interactive 3D scene with orbit controls
- Procedurally generated galaxy dust and starfield
- Clickable demo planets and live detail panel
- Planet search
- Fullscreen and UI controls
- Next.js health endpoint
- Starter Prisma schema for users, celestial objects and favorites

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production checks

```bash
npm run typecheck
npm run build
npm start
```

## Database setup (optional starter)

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your PostgreSQL connection string.
3. Install Prisma CLI and client:

```bash
npm install -D prisma
npm install @prisma/client
npx prisma generate
npx prisma migrate dev --name init
```

## Important scope notes

This is a functional starter/MVP foundation, not the complete 100+ feature production platform.
The current scene is a stylized educational visualization of a simplified Solar System. It is not a scale-accurate Milky Way map and does not yet load live NASA/ESA datasets. The sample planet properties are illustrative; connect authoritative data sources and cite provenance before presenting scientific facts as verified.

The 3D scene uses random procedural star particles, so generated star positions are visual effects, not catalog coordinates. The sound toggle is a UI preference only; ambient audio is not bundled. VR, authentication, AI assistant, missions, and admin tools are planned extension points rather than implemented features.

## Suggested next milestones

1. Replace sample celestial data with validated NASA/ESA catalog data and provenance.
2. Add real textures, physically based materials, and optimized GLTF assets.
3. Add authentication and persisted favorites.
4. Build star-system and planet detail routes.
5. Add tests, accessibility checks, rate limiting, monitoring and deployment configuration.

## Project structure

```text
app/
  api/health/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  GalaxyDashboard.tsx
  GalaxyScene.tsx
data/
  celestial.ts
prisma/
  schema.prisma
```
