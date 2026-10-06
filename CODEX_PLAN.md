# SnapVault portfolio-link plan

## Guardrail

`src/app/resume.pdf/route.ts` has an existing, unrelated local modification. Do not reset, discard, or include it in this work unless its author explicitly asks. Start from a branch/worktree that preserves it.

## Current assessment

- `main` matches `origin/main` apart from the unrelated resume-route edit.
- SnapVault is already the first current project in `src/data/projects.json`, with status `In Progress`, dates `December 2025 - Present`, and a GitHub link.
- The project model exposes GitHub/YouTube links but no live-site URL, so visitors cannot navigate to `https://snapvault.naj-dev.com` from the portfolio.

## Work items

1. Extend the project link model compatibly.
   - Add an optional `liveUrl` (or consistently named `projectUrl`) to the project TypeScript type/schema and JSON data contract.
   - Keep the field optional so existing projects render unchanged.

2. Add SnapVault's live link.
   - Set SnapVault's `liveUrl` to `https://snapvault.naj-dev.com` in `src/data/projects.json`.
   - Preserve its GitHub link and existing current-project status/dates.

3. Render an accessible public destination.
   - In the project card/modal component, render a clearly labelled `Visit site` link when `liveUrl` exists.
   - Use safe external-link behavior consistent with the existing GitHub link and ensure keyboard/screen-reader access.
   - Do not show an empty or disabled control for projects without a live URL.

4. Validate without touching the resume change.
   - Run the repository's lint, typecheck, tests, and production build from a clean writable build-artifact state.
   - Manually verify desktop and mobile presentation of the SnapVault card/modal and that the link opens the canonical site.

## Acceptance criteria

- SnapVault is visibly identified as the current project and offers both GitHub and `Visit site` destinations.
- Other project cards remain unchanged when no live URL is present.
- The unrelated resume-route edit remains intact and excluded from this change.
