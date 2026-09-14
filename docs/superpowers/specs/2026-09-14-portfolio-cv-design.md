# Portfolio + CV refresh — Design Spec

**Date:** 2026-09-14  
**Repo:** `macorman06/mcorpas` (Cloudflare Pages: `mcorpas.pages.dev`)  
**Status:** Awaiting user review

## Goals

1. Make the **Projects** page feel modern and human (editorial + motion), not “AI template”.
2. Produce a **base CV** ready for job applications, aligned with the website.
3. Keep Cloudflare Pages hosting for now; custom domain later.

## Audience & positioning

Primary use: apply to jobs while showcasing personal work.

**Application priority (user-confirmed):**

1. Backend / Python (APIs, data, optimization)
2. Aerospace / aviation tech
3. Full-stack (React + Python)

Per application, Marcos will lightly adapt the CV. The deliverable here is a strong **base CV** (ES + EN) plus a portfolio that supports that story.

## Out of scope (this iteration)

- Buying / wiring a custom domain
- Full visual redesign of Home / Contact (only light consistency if needed for Projects)
- Building automated “CV variants per job” tooling
- Migrating Pages → Workers

---

## Part 1 — Projects page (Design A: editorial cinético)

### Problem

Current Projects UI uses purple/blue/pink gradients, heavy card shadows, colorful status pills, and generic copy — reads as stock AI portfolio.

### Direction (approved)

Editorial kinetic layout: clean hierarchy, cover-first projects, restrained palette, intentional motion.

### Visual system (Projects page)

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#F7F5F2` | `#121212` |
| Text | `#1A1A1A` | `#F2F2F0` |
| Muted text | `#5C5C5C` | `#A3A3A3` |
| Accent | `#3D5A45` (moss) | `#7A9B82` |
| Hairline / border | `#E4E0DA` | `#2A2A2A` |

**Typography**

- Display / titles: **Fraunces**
- Body: **Source Sans 3**
- Avoid Inter, Poppins, Roboto on this page

**Layout**

- Page header: title “Proyectos” / “Projects” + one short human line  
  Example ES: *“Cosas que he construido — de optimización a impresión 3D.”*
- Grid: 1 column mobile, 2 columns desktop
- Each item:
  - Full-bleed cover image (no inset rounded “media card” floating on gradient)
  - Title
  - One-line description
  - Year + status as plain text (not rainbow pills)
- Tech icons / tags only in the detail panel, as neutral chips
- Sort control kept but restyled to match (text button / subtle control, not black SaaS CTA)

**Motion (2–3 intentional)**

1. Staggered fade/slide-in of project items on load
2. Hover: subtle cover scale + title underline using accent
3. Detail open/close: fade + slide-up panel

**Detail panel**

- Same interaction (click card → modal), redesigned:
  - Cover on top
  - Title, year, status (plain)
  - Markdown body readable
  - Tech as neutral chips + optional small icons
  - Links (GitHub / live / Instagram) as text links with accent hover

**Content hygiene (Projects data)**

- Fix typos (e.g. “Portoflio”)
- Keep existing projects; order by date by default
- Ensure Fuel Trip Optimizer remains featured (newest / in progress)

**Explicit non-goals for Projects UI**

- No purple/blue gradient backgrounds
- No glow effects, multi-layer shadows, or rounded-full pill clusters in the hero/grid
- No detached floating badges on covers

---

## Part 2 — CV (base for applications)

### Current issues (from existing PDFs)

- EN vs ES graduation dates disagree (EN expected Jan 2026 / ES Jun 2025); today is Sep 2026 — must resolve real status
- Soft “STRENGTHS” list feels generic (Adaptability / Innovative / Ambitious)
- Fuel Trip Optimizer missing from CV projects
- Website only links **EN** PDF (`Experience.tsx`)
- Positioning still partly “student learning frontend” — weak for Backend #1 target

### Base CV strategy

One **master narrative** optimized for Backend/Python, with aerospace context as domain strength (not the only headline).

**Headline target (EN draft):**  
Aerospace engineer / Backend Python developer — APIs, data, and optimization for aviation operations.

**Structure (1 page)**

1. Contact + links (email, phone, LinkedIn, GitHub, portfolio URL)
2. Short profile (3–4 lines), Backend-first
3. Experience (Cisneria first, quantified where possible)
4. Projects (TFG, Fuel Trip Optimizer, Portfolio; Jesper3D shorter or under interests if space)
5. Skills (Python-heavy; React present but not “learning” apologetic)
6. Education
7. Languages
8. Optional: volunteering one line

**Per-apply adaptation (user-owned)**

- Backend roles: emphasize APIs, SQL, automation, Tail Assigner impact
- Aerospace roles: move education/aviation domain higher; keep Cisneria as applied aviation software
- Full-stack roles: promote React/portfolio/TFG frontend briefly

### Website CV integration

- Offer **both** ES and EN downloads (language-aware if possible: show ES when UI is ES)
- Place download near Experience and optionally in Hero/header for apply convenience
- Keep filenames stable or update links when replacing PDFs  
  `CV_MarcosCorpas_EN.pdf` / `CV_MarcosCorpas_ES.pdf`

### Open facts to confirm before final PDF text

Before locking CV copy, confirm with Marcos:

1. Degree status as of Sep 2026 (graduated? thesis defended? expected date?)
2. Exact Cisneria title and 2–3 measurable outcomes (if available)
3. Preferred phone / location line for applications
4. Whether Private Tutor stays on the base CV (space tradeoff)

---

## Part 3 — Implementation order

1. **Projects page UI** (Design A) — highest visual pain
2. **Align site copy/experience** with Backend-first story (translations + experience section)
3. **CV content** (ES + EN) → generate/replace PDFs → wire bilingual download
4. Light Home consistency only if Projects tokens clash badly with Hero

## Success criteria

- Projects page has no purple/blue AI gradient look
- Motion feels intentional (not noisy)
- Base CV EN + ES downloadable from the site
- Story consistent: Backend Python + aviation domain + selected projects
- Still deploys on Cloudflare Pages from this repo

## Risks

- PDF generation: if no design tool export, use HTML→PDF or provide Markdown source for Marcos to export from his usual CV tool
- Font loading: use `preconnect` + limited weights to avoid slowing Pages
- Dark mode: keep Projects tokens coherent with existing theme toggle
---

## Spec self-review

- No unresolved placeholders beyond the four “confirm with Marcos” CV facts
- Projects visual direction matches approved Design A
- CV priority order matches user (1 Backend, 3 Aerospace, 2 Full-stack)
- Scope excludes domain purchase and full-site redesign
