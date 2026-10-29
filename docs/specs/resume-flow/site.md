# Harden resume PDF route and add regression-verification script for GitHub repo migration

## Acceptance criteria

### A. Hardening src/app/resume.pdf/route.ts

- [ ] Route handler uses `AbortSignal.timeout(5000)` to bound fetch latency
- [ ] Route handler explicitly follows redirects (set `redirect: 'follow'` in fetch options)
- [ ] Route handler validates upstream response body: checks first 4 bytes for `%PDF` magic signature before serving
- [ ] Route handler validates upstream body is at least 10 KB (arbitrary threshold for "non-trivial")
- [ ] On any upstream failure (non-2xx, timeout, missing magic signature, undersized), returns `new Response(…, { status: 502, headers: { 'Cache-Control': 'no-store' } })`
- [ ] Error responses with `no-store` confirm via TypeScript compile (`npx tsc --noEmit`) and visual code review
- [ ] Success responses retain current `Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` header
- [ ] Env var `RESUME_PDF_URL` (server-only, optional, default = `https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf`) allows runtime repointing without code change
- [ ] Route path `/resume.pdf`, content-type `application/pdf`, filename header `christian-coulibaly-resume.pdf` are unchanged
- [ ] Caching design (replaces the route-level `export const revalidate`): the route is `export const dynamic = 'force-dynamic'` with no route-level `revalidate`, so Next never bakes a response (including a failure) into the build or a route cache. Freshness for visitors comes only from the explicit `Cache-Control` headers (success: s-maxage=3600 + stale-while-revalidate; failure: no-store), which the CDN honours. A short code comment states this. Do NOT assert any claim about Vercel route-cache precedence that has not been tested; the empirical check below is the evidence
- [ ] Empirical check, run against `next build && next start`: with RESUME_PDF_URL pointing at a 404 URL, `curl -i /resume.pdf` returns 502 with `Cache-Control: no-store` on two consecutive requests; after restarting without the override it returns 200 with the success headers. Also confirm `npm run build` output lists `/resume.pdf` as dynamic (ƒ), not static

### B. Add scripts/verify-resume-flow.sh

- [ ] Script runs with `bash scripts/verify-resume-flow.sh [BASE_URL]` (BASE_URL defaults to `http://localhost:3000`)
- [ ] Script uses `set -euo pipefail` and exits non-zero on any check failure
- [ ] Script runs without starting a server (designed to run against a running instance or production URL)
- [ ] Check 1: upstream raw URL (`https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf`) returns 200, body starts with `%PDF`, and `pdfinfo` reports exactly 1 page; prints `PASS: upstream PDF valid` or `FAIL: …`
- [ ] Redirects: checks 2, 3 and 4 follow redirects (`curl -L`) because the production apex `https://naj-dev.com` 308-redirects to the canonical `https://www.naj-dev.com`; the final status after redirects must be 200 and the script prints the final URL it landed on. Check 1 and check 5 already follow redirects
- [ ] Check 2: `$BASE_URL/resume.pdf` returns 200 with `Content-Type: application/pdf`, body starts with `%PDF`, `pdfinfo` reports 1 page; when BASE_URL is `http://localhost:3000`, verifies route response bytes match upstream via sha256; prints `PASS: route serves correct PDF` or `FAIL: …`
- [ ] Check 3: `$BASE_URL/resume` returns 200, response body contains an `<iframe` whose `src` is `/resume.pdf` and an `<a` whose `href` is `/resume.pdf` with a `download` attribute (match each independently of attribute order, e.g. grep -o on the tag then grep the attribute); prints `PASS: resume page has iframe and download link` or `FAIL: …`
- [ ] Check 4: `$BASE_URL/`, `/about`, `/projects`, `/contact` each return 200; prints `PASS: portfolio pages accessible` or `FAIL: …` (sitemap.xml and robots.txt are NOT checked)
- [ ] Check 5: Release asset URL `https://github.com/najchris11/resume/releases/latest/download/najchris11_resume.pdf` is retrieved (curl with redirects), body starts with `%PDF`, `pdfinfo` reports 1 page; when `RELEASE_CHECK=warn` (default), prints `WARN: release asset accessible` on success, `WARN: release asset unavailable (expected during migration)` on any failure; when `RELEASE_CHECK=fail`, prints `FAIL: …` on any failure
- [ ] Script accepts `--record <path>` flag: on successful completion, writes JSON file with `{ upstream_sha256: "…", upstream_pages: 1, route_sha256: "…", route_pages: 1, recorded_at: "ISO8601" }` (route fields are recorded for any BASE_URL; only the route-equals-upstream sha256 assertion in check 2 is limited to localhost); enables before/after diff for migration verification
- [ ] npm script `verify:resume` added to package.json; runs `bash scripts/verify-resume-flow.sh "$@"` (passes through BASE_URL and flags)
- [ ] No color codes used; output suitable for piping and log aggregation

### Global gates and negative tests (run before and after the change)

- [ ] `npx tsc --noEmit`, `npm run lint` and `npm run build` all pass; the pre-change baseline of each is recorded first so any regression is attributable
- [ ] Negative test: start a throwaway server (python3 -m http.server or a 5-line node script on another port) that returns HTML 200 for `/resume.pdf`; `bash scripts/verify-resume-flow.sh http://localhost:<port>` must exit non-zero and print `FAIL` for check 2 (proves the script can fail)
- [ ] Positive run: `next start` on :3000, then `bash scripts/verify-resume-flow.sh` exits 0 with PASS for checks 1-4
- [ ] Existing behaviour unchanged: `/resume` page markup, `/resume.pdf` content-type, filename header and a one-page body are identical to the pre-change baseline

### C. Document resume flow in README.md

- [ ] Add a new "Resume flow" section (does not replace existing sections)
- [ ] Section states: upstream contract is `https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf`, kept public; env var `RESUME_PDF_URL` allows override; route serves at `/resume.pdf` as a dynamic route whose responses the CDN caches for 1 hour (s-maxage) with 1-day stale-while-revalidate (it is not ISR)
- [ ] Section explains how to run verification script: `npm run verify:resume` for localhost (expects running `next start`), and `npm run verify:resume https://naj-dev.com` for production
- [ ] Section notes that `--record` flag captures PDF properties for migration verification

### D. Manual verification sequence (owner run-through, not code)

- [ ] Document (in README or as a separate MIGRATION.md) exact sequence: (1) baseline run of `verify:resume` against localhost pre-swap, (2) after old repo renamed (old URL redirects), re-run against localhost and prod, (3) after new repo created and populated, re-run, (4) after deploy to Vercel, re-run against production (`https://naj-dev.com`, which redirects to www); all runs should show `PASS` for checks 1–4 and `WARN` for check 5 during migration window. Production caches the PDF at the CDN for up to 1 hour (s-maxage=3600), so after the upstream changes the production sha256 may differ from upstream for up to an hour; the script asserts sha equality only on localhost, and the run-through must say so rather than treat a lagging production hash as a failure

## Files expected to change

- `src/app/resume.pdf/route.ts` — add timeout, redirect handling, %PDF validation, size check, no-store on error, env var support, revalidation comment
- `scripts/verify-resume-flow.sh` — new file, bash verification script with 5 checks + --record flag
- `package.json` — add `verify:resume` npm script in scripts section
- `README.md` — add "Resume flow" section documenting upstream contract, env var, and script usage

## Out of scope

- No changes to wip branch (`origin/wip` GitHub-API-plus-token approach is superseded; do not merge)
- No token support in hardened route (repo remains public; token env var from wip is rejected)
- No blog, no sitemap.xml, no robots.txt assertions in verification script
- No unit test framework (site has no test runner; verification is end-to-end via shell script)
- No monitoring/alerting integration; script outputs are human-inspected logs
- Shared Vercel egress rate limits to raw.githubusercontent.com are not a risk (GitHub's raw CDN has high free tier and treats portfolio PDF downloads as negligible load)

## Decisions taken (reviewer)
10 KB minimum is hardcoded (the current PDF is about 80 KB); `--record` overwrites; check 5 output goes to stdout; timeout is 5 s.

## Open questions

- Should the 10 KB size threshold be configurable via env var, or is a hardcoded minimum acceptable? (Spec assumes hardcoded; can be reconsidered if future PDF is larger.)
- Does the owner want `--record` output to append to an existing file for multi-run diffs, or overwrite? (Spec assumes overwrite; can be adjusted per owner preference.)
- Should Check 5 (release asset) print to stderr or stdout, or have a separate log line? (Spec assumes stdout for consistency with other checks; logs can be filtered by status.)
- Is 5-second timeout sufficient for raw.githubusercontent.com from Vercel's edge regions, or should it be 10 seconds? (Spec assumes 5s as conservative; can be tuned post-implementation if timeouts occur in practice.)
