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
| `SITE_URL`    | Public origin for canonical URLs, the sitemap and share tags, read at build time. Defaults to Vercel's production URL on Vercel, else `https://hallb.vercel.app`. |

## Container image

`Containerfile` builds Next's standalone server on Node (Alpine), run as an
unprivileged user on port 3000:

```sh
podman build -t blog -f Containerfile .
podman run --rm -p 3000:3000 blog
scripts/smoke-image blog    # serves every page, 404s and optimised images, not as root
```

The image takes `SITE_URL` as a build argument
(`--build-arg SITE_URL=https://example.org`); Release passes the
repository variable `SITE_URL`.

`.next/` in the container is the server's cache of regenerated pages and
optimised images; it can be discarded at any time.

## Release

Every push to `main` runs CI (`release.yml` calls `ci.yml`), then builds the
image, smoke-tests it and publishes `ghcr.io/brannengh/blog:latest` and
`:sha-<commit>`. The server follows `:latest` itself (Podman auto-update),
so a green push to `main` is a deploy.

## Test

```sh
npm run lint
npm run typecheck
npm test                 # unit tests (Vitest + Testing Library, jsdom)
npm run build && npm run test:e2e   # Playwright against `next start`
```

End-to-end tests need Chromium: `npx playwright install chromium`. They run
at the 1440 px desktop size, plus a narrow-screen check of the home page.

CI (`.github/workflows/ci.yml`) runs all of the above on every pull request,
plus a build and smoke test of the container image;
`attribution.yml` runs `scripts/check-attribution` (tested by
`scripts/test-check-attribution`), which fails a pull request whose commits,
title or description credit an AI coding agent.

## Search engines

Every page has a canonical URL, a description, and Open Graph and Twitter
tags (`src/lib/metadata.ts`); the share image is the headshot
(`public/opengraph-image.jpg`). `/robots.txt` and `/sitemap.xml` are generated
from `src/app/robots.ts` and `src/app/sitemap.ts`, and the home, projects and
about pages carry schema.org JSON-LD (`src/lib/structured-data.ts`). The 404
page is `noindex`.

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
