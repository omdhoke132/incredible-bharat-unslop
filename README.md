# Incredible Bharat — Living Cultural Atlas of India

**SIH Problem Statement:** SIH26197 — Student Innovation: Ideas that showcase the rich cultural heritage and traditions of India  
**Theme:** Heritage & Culture  
**Status:** Active prototype; content coverage and editorial verification are still in progress.

Incredible Bharat is a web-based cultural atlas for exploring Indian heritage and living traditions. It brings together structured regional collections and provides search, state-based exploration, dedicated record pages, and an AI-assisted cultural guide grounded in the collection.

## Current capabilities

- State-by-state browsing across the ten currently included state datasets.
- Cultural collections for heritage, festivals, traditions, arts, crafts, textiles, music, instruments, cuisine, communities, cultural places, institutions, languages, literature, and traditional knowledge.
- Search, category filters, state-level filtering, shareable state/category filter URLs, result counts, and heritage detail pages.
- Dedicated detail pages for non-monument cultural records.
- Regional reference directories surfaced from the underlying data.
- An AI Guide API that retrieves matching collection entries before generating an answer.
- Automated data validation, linting, production builds, and GitHub Actions checks.

**Coverage note:** the current data index includes ten states. The project must not be described as a complete catalogue of all Indian states and union territories until those regions are added and reviewed. A source listed for a state is a regional research starting point, not proof that it supports every claim about every entry. Add item-specific citations as part of editorial review.

## Technology

- React 19, React Router, and Vite
- Node.js and Express for the AI API
- OpenAI API (server-side; model configurable with `OPENAI_MODEL`)
- Node's built-in test runner and ESLint
- Netlify-compatible SPA fallback via `public/_redirects`

## Local setup

Use a recent supported Node.js LTS release (Node 22 is used by the CI workflow).

```bash
npm ci
cp .env.example .env
npm run dev
```

The frontend runs on Vite's default local origin, usually `http://localhost:5173`.

Open a second terminal in the repository and start the API:

```bash
npm run start:server
```

Add your own OpenAI API key to the local `.env` file as `OPENAI_API_KEY`. Never commit a real key. The AI Guide returns a configuration error when the key has not been set; the rest of the cultural atlas can still be explored.

## Environment variables

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Secret OpenAI API key used only by the backend. |
| `OPENAI_MODEL` | Optional model override; default is `gpt-4.1-mini`. |
| `PORT` | API port; defaults to `3001` locally and honours a deployment platform's assigned port. |
| `HOST` | API host; defaults to `0.0.0.0` for deployment compatibility. |
| `FRONTEND_URL` | Main permitted frontend origin for CORS. |
| `CORS_ORIGINS` | Optional comma-separated list of additional permitted origins. |
| `RATE_LIMIT_PER_MINUTE` | Per-IP AI request limit; defaults to `10`. |
| `VITE_API_BASE_URL` | Frontend build-time API origin. Leave blank for same-origin hosting; set to the backend origin for a separately hosted API. |

For local development, the backend permits Vite's localhost origins. In production, set `FRONTEND_URL` and `CORS_ORIGINS` to the exact deployed frontend origins. Configure `VITE_API_BASE_URL` during the frontend build when the API is hosted on a different origin.

## Quality checks

Run the same checks locally that CI runs:

```bash
npm run check
```

The command runs ESLint, the cultural dataset tests, and the Vite production build. The GitHub Actions workflow runs these checks for pushes to `main` and `feature/**` and for pull requests to `main`.

## Deployment outline

### Frontend

Deploy the Vite application to Netlify or another static frontend host. Build command: `npm run build`. Publish directory: `dist`. The `public/_redirects` file enables SPA deep-link fallback on Netlify.

### AI API

Deploy the Node service separately on a Node-compatible host such as Render. Build/install command: `npm ci`; start command: `npm run start:server`. Set `OPENAI_API_KEY`, `OPENAI_MODEL`, `FRONTEND_URL`, and `CORS_ORIGINS` in the host's environment settings. Do not expose the key as a `VITE_*` variable or in browser code.

After deployment, verify `/api/health` and ask a question through the live website. Health returning HTTP 200 does not itself mean the model is configured; inspect the `aiConfigured` field.

## Architecture

```text
React pages
  ├── Home / regional explorer
  ├── Explore / search and category filters
  ├── Heritage and cultural record detail pages
  └── AI Guide
       └── POST /api/ask-guide
             ├── input validation and rate limit
             ├── retrieval from src/data/states/
             ├── OpenAI generation with retrieved context
             └── answer + matched entries + regional reference links
```

The primary cultural dataset lives in `src/data/states/`, with the central state index at `src/data/states/index.js` and normalisation/search helpers in `src/services/cultureService.js`.

## Editorial and product roadmap

1. Complete a source review and add item-specific references and media attribution.
2. Add the remaining states and union territories using the same schema and data checks.
3. Test on mobile, keyboard-only navigation, and screen-reader-friendly workflows.
4. Expand multilingual support, audio storytelling, and community-informed submissions only with an editorial review process.
5. Evaluate AI answers against a set of representative questions and record groundedness, citation usefulness, latency, and failure cases.

## Responsible use

Cultural practices are diverse and may differ between communities and regions. Treat descriptions as an evolving educational collection, avoid presenting stereotypes as universal facts, respect community knowledge and consent, and clearly distinguish regional reference directories from record-level citations. The AI Guide should acknowledge when the current collection does not support an answer.
