# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** personal portfolio website (TypeScript, React 19, Tailwind CSS v4, Sass). It is a single frontend app with a few serverless API routes.

### Running / building / checking

Standard scripts live in `package.json`:

- `npm run dev` — start the dev server (Turbopack) on http://localhost:3000
- `npm run type-check` — TypeScript check (`tsc --noEmit`)
- `npm run format` — Prettier write; `npx prettier --check .` to check only
- `npm run build` / `npm run start` — production build / serve

There is **no `lint` script** and no ESLint config in this repo; use `npm run type-check` and Prettier as the code-quality gates.

### Optional API integrations (safe to leave unset in dev)

The following API routes read environment variables. The core portfolio site renders and works fully without them; only these specific features need keys:

- `src/app/api/chat/route.ts` — chat bot, needs `GEMINI_API_KEY` (or `GOOGLE_GENERATIVE_AI_API_KEY`). Returns a 500 gracefully if missing.
- `src/app/api/send-email/route.ts` — contact form email, needs `EMAIL_USER` + `EMAIL_PASSWORD`. Returns an error gracefully if missing; the form itself is still interactive.
- `src/app/api/tts/route.ts` — text-to-speech, needs `ELEVENLABS_VOICE_ID` + `ELEVENLABS_API_KEY`.

Env files (`.env*`) are gitignored; add keys locally only if you need to exercise those integrations.

### Notes

- `prettier --check .` currently reports pre-existing formatting warnings in a few tracked files; these are not caused by setup.
- The repo has other branches (e.g. `coming-soon`); `main`/this branch renders the full portfolio (home, about, contact sections).
