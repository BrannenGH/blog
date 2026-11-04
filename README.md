# hallb blog

Brannen Hall's personal site: a server-rendered React app built with
[Next.js](https://nextjs.org/) (App Router, React Server Components). Pages
render to HTML on the server and ship no client-side JavaScript of their own.

## Requirements

- Node.js 22.12 or newer (`.nvmrc`)
- npm

## Develop

```sh
npm ci
npm run dev        # http://localhost:3000
```

## Build and run

```sh
npm run build
npm start
```

`/projects` shows when each repository was last pushed, read from GitHub's
public API on the server and cached for an hour (incremental static
regeneration). The page renders without it.

| Variable      | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN`| Optional. Raises GitHub's API rate limit.                      |
| `GITHUB_DATA` | Set to `off` to skip GitHub requests (tests, offline builds).  |
| `SITE_URL`    | Public origin for absolute URLs in page metadata. Defaults to Vercel's production URL on Vercel. |

## Test

```sh
npm run lint
npm run typecheck
npm test                 # unit tests (Vitest + Testing Library, jsdom)
npm run build && npm run test:e2e   # Playwright against `next start`
```

End-to-end tests need Chromium: `npx playwright install chromium`. They run
at the 1440 px desktop size, plus a narrow-screen check of the home page.

CI (`.github/workflows/ci.yml`) runs all of the above on every pull request;
`attribution.yml` runs `scripts/check-attribution` (tested by
`scripts/test-check-attribution`), which fails a pull request whose commits,
title or description credit an AI coding agent.

## Layout

- `src/app/` – routes (`/`, `/projects`, `/design`, `/about`), the root layout,
  global tokens (`globals.css`) and self-hosted fonts (`fonts.ts`)
- `src/components/` – shared server components, each with a CSS module
- `src/content/` – page copy and data as typed modules
- `src/lib/github.ts` – the cached GitHub API read
- `public/art/` – woven illustrations and app icons (SVG), exported from the design file
- `tests/unit/`, `tests/e2e/` – Vitest and Playwright suites

## Licence

All rights reserved; see `LICENSE`.
