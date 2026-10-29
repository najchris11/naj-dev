# Convert resume staging directory to clean public LaTeX template repo

Migrate `/home/hdnchq/Documents/GitHub/resume-template` into a fresh, single-commit public repository template at `najchris11/resume` with master-resume content preserved, privacy guards in place, enhanced tailoring rules, pinned CI workflows, and template-focused documentation.

## Acceptance criteria

- [ ] **master-resume.tex unchanged**: SHA256 = `22c561b9249ea01726092533221128f251bf2cb32710ba4e9983a49fb355f50b`
- [ ] **check.yml builds all root *.tex files dynamically** (not hardcoded list), enforces one-page constraint on master-resume.tex only, fails with ::error:: if PDF missing/empty, uses pinned latex-action SHA + TeX Live 2024
- [ ] **release.yml** pins all third-party `uses:` to commit SHAs with version comments, pins TeX Live 2024, adds post-deploy validation (git ls-tree on resume-builds branch confirms master-resume.pdf exists), fails loudly (::error::) if PDF is missing/empty/not 1 page
- [ ] **Privacy guard** lives in `.github/scripts/privacy-guard.sh` (reads `git ls-files`, exits non-zero if any tracked path matches `job-posting*`, `cover-letter*`, `applications/**`, or `*.pdf`) and is called by both workflows. Locally verifiable: run it in a throwaway clone of the staging repo with a forbidden file staged (must exit 1, naming the file) and on the clean tree (must exit 0)
- [ ] **Both skill copies byte-identical**: `diff .claude/skills/tailor-resume/SKILL.md .agents/skills/tailor-resume/SKILL.md` returns 0
- [ ] **Skill files and edit-prompt.md updated** (both copies): explicit no-fabrication rules (reorder/trim/reword/emphasize only; never invent skills/tools/titles/employers/dates/degrees/metrics/scope/team-size; posting keywords only where experience exists; no hidden/white text or keyword stuffing; missing requirements stated in summary, not claimed); new required output `resume.changes.md` beside resume.tex (for each bullet: master line, what changed, flag for new keywords with evidence); augmented-resume.tex marked optional; output location specified; users directed to move finished resumes to private archive
- [ ] **.gitignore updated**: job-posting.txt, applications/, resume.tex, resume.changes.md, cover-letter*.txt, augmented-resume.tex stay untracked; verify with `git check-ignore [each file]`
- [ ] **README.md rewritten** (no "three files table", no "resume.tex released", no fork instructions): explains template use, how workflows work, external contract (master-resume.pdf at resume-builds branch and release asset must stay stable), tailoring workflow, privacy guard, local build (note: no TeX installed locally, compile-checks CI-only)
- [ ] **Initial commit**: single commit with all files, message reflects conversion (e.g., "feat: init public resume template"); `git ls-files` contains only: .github/scripts/privacy-guard.sh, .claude/skills/tailor-resume/SKILL.md, .agents/skills/tailor-resume/SKILL.md, .github/workflows/check.yml, .github/workflows/release.yml, .gitignore, README.md, edit-prompt.md, master-resume.tex, resume-preamble.tex (no augmented-resume.tex, job-posting.txt, PDFs, or old history)

## Files expected to change

- `.github/scripts/privacy-guard.sh` — new; also add it to the expected `git ls-files` list
- `.github/workflows/check.yml` — dynamic *.tex discovery, privacy guard job, pinned actions, TeX Live 2024, error safety
- `.github/workflows/release.yml` — pinned actions with SHA comments, TeX Live 2024, post-deploy validation, error safety  
- `.claude/skills/tailor-resume/SKILL.md` — enhanced no-fabrication rules, resume.changes.md output, augmented-resume optional, archive migration note
- `.agents/skills/tailor-resume/SKILL.md` — identical updates to .claude/ copy
- `edit-prompt.md` — same enhancements as skill files (rules, resume.changes.md, output location, archive migration)
- `.gitignore` — add job-posting.txt, applications/, resume.tex, resume.changes.md, cover-letter*.txt, augmented-resume.tex
- `README.md` — full rewrite for template audience (usage, workflows, external contracts, privacy, local build)

## Reviewer addenda
- Release behaviour unchanged: any push touching master-resume.tex or the preamble still cuts a release; the first release in the new repo will be v0.0.1, and `releases/latest/download/najchris11_resume.pdf` works once it exists.
- The post-deploy check must read the branch via git (`git fetch origin resume-builds && git ls-tree`), never the raw CDN, which caches for minutes.
- External contract (must hold after the swap): `resume-builds` branch root contains `master-resume.pdf`, one page. The site's verification script (site.md) is the cross-repo test for this.

## Out of scope

- No LICENSE file (owner decision)
- master-resume.tex content unchanged (Christian's real resume, phone, email, job history)
- augmented-resume.tex not committed to this repo (stored in private resume-archive instead)
- No job postings, job-specific tailored resumes, cover letters, or company application names in public repo
- No multi-file build support beyond root directory
- Deployment to actual GitHub repo (this spec is local verification only; separate step will push to najchris11/resume)

## Risks

- Workflows depend on `github.repository_owner` variable and peaceiris/actions-gh-pages; if either changes behavior, deployments may fail silently
- TeX Live version pinning requires maintaining version strings across both workflows (risk of mismatch)
- Privacy guard will not catch all secrets (e.g., URLs in comments); manual review before push still required

## Decisions taken (reviewer defaults, flagged to owner for confirmation)
1. LICENSE: none added now. The owner decides separately (MIT is the usual choice for a template).
2. Contact info: master-resume.tex is not edited, so the real phone and email stay. The owner said the public template keeps his active master resume; changing this later is a one-line edit.
3. augmented-resume.tex: fully optional. The skill uses it if present and silently skips it if absent; it never fails because of it.
4. Repo name: the template takes the name `najchris11/resume` (not a fork, Template repository enabled), created by a separate, owner-supervised step after this work passes local verification.
5. Actions are pinned to full SHAs resolved with `gh api`; TeX Live pinned to 2024 in both workflows via one shared value per file.

## Verification limits
No LaTeX is installed on this machine, so PDF builds are verified only by CI after the first push. Local checks cover YAML validity, pinning, the privacy guard script, skill/prompt content, .gitignore behaviour, file inventory and the master-resume.tex sha256.
