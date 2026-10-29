# naj-dev

A personal website and portfolio for all tech-related affairs. Built with **Next.js** and **shadcn** for UI components, deployed via **Vercel** and routed through **Cloudflare** for caching and security.

---

## Table of Contents

1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Getting Started](#getting-started)  
5. [Deployment](#deployment)  
6. [Resume flow](#resume-flow)  
7. [Contributing](#contributing)  
8. [License](#license)

---

## Overview

**naj-dev** serves as the central hub for my personal projects, articles, and professional details. The goal is to showcase my portfolio, highlight ongoing work, and demonstrate modern web development practices.

---

## Tech Stack

- **Next.js** – Framework for server-rendered and statically generated React apps.
- **shadcn** – Collection of pre-built, customizable UI components.
- **Vercel** – Deployment platform that integrates seamlessly with Next.js.
- **Cloudflare** – Provides a caching layer and security features like DDoS protection.

---

## Features

- **Responsive Layout** – Mobile-first, adapts to any device.
- **Portfolio Showcase** – Highlights projects and achievements.
- **Optional Blog/Articles** – Share posts or deep-dives into technical topics.
- **Modern UI** – Styled with shadcn components for a sleek design.
- **Cloudflare Integration** – Adds performance boosts and robust security.

---

## Getting Started

1. **Clone the Repository**  
   `git clone https://github.com/YourUsername/naj-dev.git`  
   `cd naj-dev`

2. **Install Dependencies**  
   `npm install`  
   (or `yarn` / `pnpm install`)

3. **Run in Development Mode**  
   `npm run dev`  
   (or `yarn dev` / `pnpm dev`)  

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

---

## Deployment

The project is deployed on **Vercel** (ideal for Next.js). **Cloudflare** is configured as an additional layer for caching and security.

1. **Push** changes to GitHub.
2. **Vercel** builds and deploys automatically from your main branch.
3. **Cloudflare** routes and caches your domain for optimal performance.

---

## Resume flow

The resume is not stored in this repo. `/resume.pdf` fetches it at request time from a separate repo, and `/resume` embeds it in an iframe with a download link.

- **Upstream contract:** `https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf`. The `najchris11/resume` repo must stay public so this URL keeps working without a token.
- **Override:** set the server-only env var `RESUME_PDF_URL` to repoint the route at a different PDF without a code change. It is optional and defaults to the URL above. Restart the server after changing it.
- **Serving:** `/resume.pdf` (`application/pdf`, filename `christian-coulibaly-resume.pdf`) is a dynamic route (`force-dynamic`), not ISR, so nothing is baked in at build time. Successful responses send `Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400`, so the CDN caches them for 1 hour (s-maxage) and may serve stale for up to 1 day (stale-while-revalidate) while it refreshes.
- **Validation:** the route fetches upstream with a 5 second timeout, follows redirects, and only serves the body if it starts with `%PDF` and is at least 10 KB. Any upstream failure (non-2xx, timeout, bad signature, too small) returns `502` with `Cache-Control: no-store`.

### Verifying the resume flow

`scripts/verify-resume-flow.sh` checks the whole flow against a running instance (it never starts a server). It needs `curl`, `pdfinfo` (poppler) and `sha256sum`.

```bash
# localhost: needs a running `npm run build && npm start`
npm run verify:resume

# production
npm run verify:resume https://naj-dev.com
```

It runs five checks:

1. The upstream PDF returns 200, starts with `%PDF` and has exactly 1 page.
2. `<BASE_URL>/resume.pdf` returns 200 as `application/pdf` with a 1-page PDF body. When the host is `localhost`, `127.0.0.1` or `[::1]` (any port), its sha256 must also equal the upstream PDF's; for any other host it is not compared.
3. `<BASE_URL>/resume` contains an `<iframe>` with `src="/resume.pdf"` and an `<a>` with `href="/resume.pdf"` and a `download` attribute.
4. `/`, `/about`, `/projects` and `/contact` return 200.
5. The release asset `https://github.com/najchris11/resume/releases/latest/download/najchris11_resume.pdf` is a 1-page PDF. By default (`RELEASE_CHECK=warn`) this only prints `WARN`; set `RELEASE_CHECK=fail` to make it a failure.

Checks 2-4 follow redirects and print the final URL they landed on; the final status must still be 200. This is why `https://naj-dev.com`, which redirects to `https://www.naj-dev.com`, is a valid production BASE_URL.

The script exits non-zero if any check fails and prints plain `PASS` / `FAIL` / `WARN` lines (no colour codes).

The `--record <path>` flag writes the PDF properties to a JSON file when all checks pass, overwriting any existing file. Use it to capture the state before and after a migration and diff the two (pass flags after `--` when using npm):

```bash
npm run verify:resume -- --record /tmp/resume-before.json
npm run verify:resume https://naj-dev.com -- --record /tmp/resume-prod.json
```

The file contains `upstream_sha256`, `upstream_pages`, `route_sha256`, `route_pages` and `recorded_at`. The route fields are recorded for any BASE_URL.

### Resume repo migration: manual verification sequence

Run these in order when moving the resume repo. Every run should show `PASS` for checks 1-4 and `WARN` for check 5 during the migration window. Use `--record` for runs 1 and 4 and compare them, ignoring `recorded_at`.

Two things to expect:

- Production (`https://naj-dev.com`, which redirects to `https://www.naj-dev.com`) caches the PDF at the CDN for up to 1 hour (`s-maxage=3600`). After the upstream PDF changes, production can lag upstream by up to an hour, so its sha256 may differ from upstream during that time. This is not a failure.
- The script asserts that the route's sha256 equals upstream on localhost only (`localhost`, `127.0.0.1` or `[::1]`, any port). Against production, check 2 only requires a valid one-page `application/pdf`.

1. **Baseline, before any change.** Start `npm run build && npm start`, then `npm run verify:resume -- --record /tmp/resume-before.json`.
2. **After the old repo is renamed** (the old URL should now redirect). Re-run `npm run verify:resume` against localhost and `npm run verify:resume https://naj-dev.com` against production.
3. **After the new repo is created and populated** at the upstream URL above. Re-run both again.
4. **After deploying to Vercel.** Run `npm run verify:resume https://naj-dev.com -- --record /tmp/resume-after.json`, then `diff` the before and after files. `upstream_sha256` should match unless the resume content intentionally changed. `route_sha256` from production may lag upstream for up to an hour (see above); re-run after the cache expires before treating a difference as a problem.

Once the release asset exists, run with `RELEASE_CHECK=fail` to make check 5 strict.

---

## Contributing

1. **Fork** the repository.  
2. **Create a branch** (e.g., `git checkout -b feature/new-component`).  
3. **Commit** your changes (`git commit -m 'Add new component'`).  
4. **Push** to the branch (`git push origin feature/new-component`).  
5. **Open a Pull Request** for review.

---

**Questions or feedback?** Open an issue or reach out anytime!