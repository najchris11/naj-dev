# Add file-based blog and dev diary to portfolio with two content kinds, filterable discovery, and low-friction authoring

## Goal
Enable Christian to publish long-form technical articles ("posts") and dated short-form dev diary entries ("logs") with minimal friction: MDX files stored in the repo, static generation, full-text search + kind filtering, RSS feed, and SEO support. Posts and logs coexist in one /blog collection with distinct UX for each kind.

## Non-Goals
- No CMS, database, or backend content management
- No comments or user analytics beyond Vercel Analytics (already deployed)
- No newsletter integration in Phase 1
- No draft preview UI or git-log-driven diary stub generation (Phase 3 optional)
- No related-post linking in project modals before Phase 3
- No per-tag archive pages (tags UX is discovery-side filtering only, Phase 2)
- No OG image auto-generation or next/og integration (Phase 3 optional)

## Data Model

### BlogPost TypeScript Type (add to src/app/types.ts)
```typescript
export interface BlogPostFrontmatter {
  title: string;                    // Required; displayed as h1
  date: string;                     // ISO 8601 (YYYY-MM-DD)
  summary: string;                  // Teaser for index; also used as post description metadata
  kind: 'post' | 'log';             // Determines UX: 'post' = long-form, 'log' = dated short entry
  tags?: string[];                  // Optional; comma-separated in frontmatter for discovery
  draft?: boolean;                  // If true, excluded from production builds (npm run build)
  project?: string;                 // Optional; exact `title` of an entry in src/data/projects.json (that file has no slug field; add one in Phase 3 if linking is built)
  cover?: string;                   // Optional; path relative to public/images/ (e.g., "blog/post-slug.jpg")
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;                     // Derived from filename (content/blog/my-post.mdx → "my-post")
  content: string;                  // Raw MDX source (body after frontmatter); compiled at render time by next-mdx-remote/rsc
  readingTime: number;              // Minutes, from the `reading-time` package (computed in the loader, not in frontmatter)
}
```

## File & Route Map

### Content & Data
- `content/blog/*.mdx` — Each file is one post or log; frontmatter in YAML fence; body is MDX
- `src/app/types.ts` — Add `BlogPostFrontmatter` and `BlogPost` interfaces

### Routes (App Router)
- `src/app/blog/page.tsx` — Index: list all non-draft posts+logs, filterable by kind + search
- `src/app/blog/[slug]/page.tsx` — Dynamic: render a post/log, meta tags, OG, structured data (Phase 1: BlogPosting JSON-LD optional)
- `src/app/blog/rss.xml/route.ts` — Route handler: RSS 2.0 feed of published `post` entries only in Phase 1 (logs excluded; see Open Questions)
- `src/lib/blog.ts` — Loader: reads `content/blog`, parses with gray-matter, validates frontmatter, drops drafts, sorts by date. Fails the build on a missing title/date/kind, an unparseable date, or a duplicate slug

### SEO & Discovery
- `src/app/sitemap.ts` — NEW (neither file exists today; the live site 404s on both). Must list the static pages (/, /about, /projects, /resume, /contact) as well as blog entries. Ship the static-pages version first, independent of the blog.
- `src/app/robots.ts` — NEW; allow-all plus a sitemap pointer

### UI Updates
- `src/components/Navbar.tsx` — Add "Blog" link to desktop nav (after Projects) and mobile sheet
- `src/app/page.tsx` — *Phase 2*: Add "Latest Writing" strip showing 3 newest posts below Hero

### Package
- `package.json` — Add dependencies (see Dependencies section)

## Phase 1: MVP (Verifiable by npm run build, npx tsc --noEmit, npm run lint, curl against next start)
- [ ] A `draft: true` file is absent from /blog, the sitemap, RSS and `generateStaticParams`, and GET `/blog/<draft-slug>` returns 404 (`dynamicParams = false`)
- [ ] `npm run build` succeeds; `npx tsc --noEmit` passes strict mode (new BlogPost types used correctly)
- [ ] `npm run lint` passes (no new lint errors in blog code)
- [ ] GET `/blog` returns 200 and lists every non-draft entry, newest first, with a kind badge on each (filtering/search arrive in Phase 2)
- [ ] GET `/blog/[slug]` renders a post/log with title, date, content, readingTime, tags if present
- [ ] `<meta name="og:*">` tags present on post routes (title, description, URL, optional image)
- [ ] GET `/blog/rss.xml` returns 200 with valid RSS 2.0 (test: `curl http://localhost:3000/blog/rss.xml | head -20`)
- [ ] GET `/sitemap.xml` includes /blog/[slug] routes
- [ ] GET `/robots.txt` exists and permits /blog
- [ ] Navbar includes "Blog" link; both desktop and mobile nav render it
- [ ] At least one seed entry exists and renders a fenced code block with syntax highlighting in both light and dark themes (seed content per Open Question 4)
- [ ] A deliberately malformed fixture (missing `date`, or a duplicate slug) makes `npm run build` fail with a message naming the file; remove the fixture afterwards
- [ ] `/sitemap.xml` also lists /, /about, /projects, /resume and /contact

## Phase 2: Diary & Discovery UX (Verifiable by browser test + curl)
- [ ] /blog index shows "kind" filter pills ("All", "Posts", "Logs"), reusing the pill + search pattern from src/app/projects/page.tsx; filtering works (browser check)
- [ ] /blog shows "tags" filter (if tags array present); test by filtering to a known tag
- [ ] /blog implements search (existing pattern from /projects); case-insensitive partial match on title, summary, and tags (client-side; the index passes only frontmatter to the client component, never full bodies)
- [ ] Reading time displayed on index rows and post header (e.g., "8 min read"); logs may omit it
- [ ] Logs sorted by date desc; posts sorted by date desc; both clearly distinguished by kind badge or visual cue
- [ ] Home page (`/`) includes "Latest Writing" section below Hero: 3 newest posts, link to /blog

## Phase 3: Optional Extras (Phase 2 fully complete before starting)
- [ ] Draft preview via Next.js Draft Mode (a query parameter on a statically generated route would force it dynamic)
- [ ] OG image generation via `next/og` (`opengraph-image.tsx` under `src/app/blog/[slug]/`), rendered from title + date; no committed PNGs
- [ ] `git log` automation: script or GitHub Actions to scaffold diary stubs from sibling repo commits
- [ ] Related writing: project modal shows "Related posts" if `project` slug matches

## Dependencies to Add

| Package | Version | Rationale |
|---------|---------|-----------|
| `next-mdx-remote` | pin current major at install time | RSC-compatible MDX rendering; flexible, allows runtime processing of frontmatter; alternative to @next/mdx is @next/mdx (see Open Questions). |
| `gray-matter` | ^4.0.0 | Parse YAML frontmatter from .mdx files; battle-tested, minimal. |
| `rehype-pretty-code` | install-time current | Syntax highlighting for code blocks via Shiki. Use dual light/dark themes (CSS variables) so it follows next-themes. |
| `shiki` | version compatible with the chosen rehype-pretty-code | Highlighter engine. Let the installer resolve the pair; do not hand-pin guesses. |
| `reading-time` | ^1.5.0 | Calculate reading time from markdown; used in blog post metadata. |

**Note**: `@tailwindcss/typography` already in `package.json`; ensure `prose` class applied to MDX content wrapper.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Prettier format check currently fails on 11 files. | Format gate is NOT part of CI; build/typecheck/lint only. New blog code must pass eslint. |
| No test framework (Jest/Vitest). | Acceptance is manual: build, typecheck, lint, curl/browser verification. |
| MDX bundle size or build time. | Start with next-mdx-remote (lightweight); monitor `npm run build` time. |
| Frontmatter parsing errors. | gray-matter handles malformed YAML gracefully; test with invalid files. |
| Draft posts leaked to production. | Filter in `generateStaticParams` (Phase 1) and RSS route (only non-draft). Verify `npm run build` output. |

## Decisions proposed by the reviewer (owner to confirm)
Open Questions 1, 2, 3, 7 and 8 have a recommended default: `/blog`; logs share the collection and route; RSS is posts-only; `next-mdx-remote/rsc`; dual shiki themes following next-themes. Questions 4, 5 and 6 are content calls only the owner can make.

## Out of Scope

- **CMS or backend**: Content is files + JSON; no Strapi, Contentful, etc.
- **Database**: No Postgres, Vercel KV, or similar for drafts, comments, likes.
- **Comments**: Disqus, utterances, giscus, etc. not included.
- **Structured data beyond BlogPosting**: JSON-LD markup is minimal/optional in Phase 1.
- **Tag archive pages**: /blog/tags/[tag] does not exist; tags are filter only (Phase 2).
- **Automatic reading list / bookmark**: No "save for later" feature.
- **Social sharing widgets**: No native share buttons or share count badges.
- **Author bio or byline**: Assumed single author (Christian); no author metadata.
- **Publishing the agent-router or routed-workflow posts**: Whether those side-project blog posts are public is owner's call (see Open Questions).

## Open Questions

1. **URL namespace**: `/blog` or `/writing`? Recommend `/blog` for discoverability (aligns with common convention); flag for owner approval.

2. **Log routes**: Logs and posts coexist at `/blog/[slug]`. Alternative: separate `/log` route for diary entries. Recommend single namespace (simpler, RSS easier); clarify if owner prefers `/diary` or `/log`.

3. **RSS feed**: Include logs or posts only? Logs are frequently-updated; RSS readers expect infrequent updates. Recommend posts-only for Phase 1; logs can be added if separate feed desired.

4. **Sample seed posts**: Should 2 sample MDX files be committed to the repo with draft=false, or added as draft=true for owner to publish? If included, do they showcase real content (SnapVault, HDNCHQ, Chase internship) or generic placeholders?

5. **Related writing in project modal**: Include "Related posts" section in project modal if `project` slug matches (Phase 2)? Requires cross-referencing blog posts by project. Clarify scope and importance.

6. **Publishing agent-router and routed-workflow posts**: Side projects (agent-router, routed-agent-workflow) are in development; should blog posts about them be authored now (draft=true) or left until complete?

7. **MDX library choice**: Next.js 15 offers two paths:
   - `@next/mdx`: native, compiles MDX at build time (simpler, smaller bundle).
   - `next-mdx-remote/rsc`: runtime rendering (more flexible, easier to add future features like drafts).
   Recommend `next-mdx-remote/rsc` for flexibility and to avoid build-time coupling; clarify if simplicity is preferred.

8. **Code highlighting theme**: Shiki supports many themes (nord, dracula, github-light, etc.). Should theme follow `next-themes` (dark/light)? Recommend respecting dark mode parity; clarify preferred theme names.

---

**Spec Author**: spec-distiller (Haiku), reviewed and corrected by orchestrator  
**Created**: 2026-10-06  
**Target Implementation**: Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3 + @tailwindcss/typography
