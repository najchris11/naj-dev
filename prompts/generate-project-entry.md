# Generate a naj-dev.com project entry

You are writing a portfolio entry for this project. It will appear on naj-dev.com's projects page as a JSON object. Your job: explore this repo, draft the entry, ask me about anything you can't verify, then output final JSON.

## Step 1 — Skim the project

Look at, in order of priority:

1. **README** — the stated purpose and any claims already written down.
2. **Manifest/build files** (package.json, build.gradle, requirements.txt, Cargo.toml, etc.) — the real tech stack, not the aspirational one.
3. **Folder structure and main entry points** — what the project actually does, its scale, and the most interesting technical decision in it (a custom algorithm, an unusual integration, a hard constraint that shaped the design).
4. **Commit history** (`git log --oneline | tail -20` and recent commits) — when it started, whether it's still active, and what the arc of the work was.
5. **CI/deploy config** — is it shipped? Where does it run? Real deployment is always worth mentioning.

From this, identify: what it is, who or what it's for, the one most impressive concrete detail, and whether it's finished.

## Step 2 — Draft the entry

Output must match this exact schema:

```ts
{
  title: string;            // required
  description: string;      // required
  image?: string | null;         // filename only, lives in /public/images/
  imageDescription?: string | null;  // alt text for the image
  githubRepo?: string | null;    // full URL, or null if private
  youtubeUrl?: string | null;    // full watch URL if a demo video exists
  techStack?: string[];
  role?: string;
  achievements?: string[];
  status?: string;          // exactly one of: "Completed" | "In Progress" | "Ongoing"
  date: string;             // required
  additionalNotes?: string;
}
```

### Field rules

- **title** — Short and specific. Name the thing, not the category ("Movie Center", not "A Web Application for Movies"). For work/hackathon entries, use the format "Org — Role or Project (Distinction)".
- **description** — 1–2 sentences, aim for under 220 characters. The **first sentence must stand alone**: the site clamps it to two lines in list view, so lead with what it is and who it's for. The second sentence gets the single most impressive concrete detail. No throat-clearing ("This project is...").
- **techStack** — 3–8 items, ordered most-defining first (only the first 5 show on the card). Canonical names: "Next.js" not "nextjs", "Jetpack Compose" not "compose". Frameworks and languages that shaped the project only — not every dependency.
- **role** — Only for team projects: "Fullstack Developer", "Frontend Developer", etc. Omit for solo projects.
- **achievements** — 2–4 bullets, shown as "Highlights" with checkmarks. Each starts with a past-tense verb and contains exactly one concrete detail (a technology decision, a constraint overcome, a scope indicator). Resume register, but readable — no keyword stuffing.
- **status** — "Completed" = done and not returning to it. "In Progress" = actively building toward something. "Ongoing" = maintained/used indefinitely with no end state (servers, this portfolio).
- **date** — "Month YYYY" for short projects, "Month YYYY - Month YYYY" for ranges, "YYYY - Present" only if genuinely still active.
- **image/imageDescription** — If no screenshot exists yet, suggest what to capture (the single screen that best shows the project working). imageDescription is alt text: describe the image, not the project.
- **additionalNotes** — Optional, max 2 sentences. Context or future direction only. If it doesn't add information, omit it.

### Style rules (strict)

- Plain, confident engineering prose. Write like a developer describing their work to another developer, not like marketing copy.
- **Banned words**: leverage, cutting-edge, seamless, robust, innovative, passionate, delve, showcase, empower, elevate, "state-of-the-art".
- No more than one em dash in the whole entry. Vary sentence length.
- Specific beats general, always: "parses Last.fm scrobble history to detect listening patterns" beats "uses APIs to analyze music data".
- **Never invent metrics.** Only use numbers found in the repo, README, or confirmed by me. If a claim seems likely but unverifiable (user counts, performance gains, uptime), ask instead of writing it. A bullet without a number is fine; a bullet with a made-up number is not.

## Step 3 — Ask, then finalize

Before final output, ask me up to 3 questions — only about things you genuinely can't determine from the repo (metrics, whether it's deployed, team vs solo, dates that predate the git history). If there's nothing to ask, skip this.

Then output **only** the final JSON object in a code block, ready to paste into `src/data/projects.json`. No commentary after it.
