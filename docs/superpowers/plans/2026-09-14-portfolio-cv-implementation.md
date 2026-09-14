# Projects Page + CV Base — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Projects page to Design A (editorial kinetic) and prepare Backend-first CV downloads (ES/EN), with a local Vite preview first.

**Architecture:** Keep existing Vite/React/i18n stack. Scope tokens + typography to the Projects route first via CSS variables and page-local classes; restyle `Projects.tsx` and `ProjectsCardDetail.tsx`; then align CV links and PDFs.

**Tech Stack:** React 18, TypeScript, Tailwind, Framer Motion, i18next, Vite, Cloudflare Pages

## Global Constraints

- No purple/blue/pink gradients on Projects
- Palette: bg `#F7F5F2`/`#121212`, text `#1A1A1A`/`#F2F2F0`, accent `#3D5A45`/`#7A9B82`
- Fonts: Fraunces (titles) + Source Sans 3 (body)
- Motion: staggered enter, hover zoom+underline, detail slide-up
- Hosting remains Cloudflare Pages; local `npm run dev` before claiming done
- Spec: `docs/superpowers/specs/2026-09-14-portfolio-cv-design.md`

---

## File map

| File | Responsibility |
| --- | --- |
| `index.html` / `src/index.css` | Load Fraunces + Source Sans 3; Projects CSS variables |
| `tailwind.config.js` | fontFamily display/body; optional color tokens |
| `src/components/Projects.tsx` | Grid redesign Design A |
| `src/components/ProjectsCardDetail.tsx` | Modal redesign |
| `src/pages/ProjectsPage.tsx` | Helmet copy if needed |
| `public/locales/{es,en}/translation.json` | Projects header copy |
| `src/data/projectsData.json` | Typo fixes |
| `src/components/Experience.tsx` | Bilingual CV download buttons |
| `public/CV_MarcosCorpas_{EN,ES}.pdf` | Replace when content ready |

---

### Task 1: Design tokens + fonts for Projects

**Files:** `index.html`, `src/index.css`, `tailwind.config.js`

- [ ] Add Google fonts Fraunces + Source Sans 3
- [ ] Extend Tailwind with `font-display`, `font-body`, accent colors
- [ ] Add `.projects-surface` CSS variables for light/dark
- [ ] Commit

### Task 2: Redesign Projects grid

**Files:** `src/components/Projects.tsx`, locales, `projectsData.json`

- [ ] Remove gradient background; apply projects-surface
- [ ] Editorial header + restyled sort control
- [ ] Cover-first 1/2-col grid; plain year/status; no rainbow pills
- [ ] Stagger + hover motions
- [ ] Fix “Portoflio” typo; update header copy in i18n
- [ ] Commit

### Task 3: Redesign project detail modal

**Files:** `src/components/ProjectsCardDetail.tsx`

- [ ] Slide-up/fade panel; neutral chips; accent links
- [ ] Commit

### Task 4: Local preview

- [ ] `npm install` && `npm run dev -- --host 0.0.0.0`
- [ ] Verify `/projects` visually (screenshots)
- [ ] Share preview URL with user

### Task 5: CV wiring (after Projects preview OK)

- [ ] Bilingual CV buttons in Experience
- [ ] Update CV PDF content when degree facts confirmed
- [ ] Commit

### Task 6: Build check

- [ ] `npm run build` passes
- [ ] Commit + push + update PR
