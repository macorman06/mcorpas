# Marcos Corpas — Portfolio

Single-page portfolio at **[mcorpas.pages.dev](https://mcorpas.pages.dev)**, deployed by Cloudflare Pages from `main`.

React 18 · TypeScript · Tailwind · Framer Motion · i18next (ES/EN) · Vite.

## Develop

```bash
npm install
npm run dev
```

`npm run build` writes `dist/`; `npm run lint` checks the code.

## Where things live

| What | File |
| --- | --- |
| Texts (ES / EN) | `public/locales/{es,en}/translation.json` |
| Projects | `src/data/projects.ts` |
| Contact links, CV path | `src/data/links.ts` |
| CV (PDF) | `public/CV_MarcosCorpas.pdf` |
| Colours and fonts | `src/index.css`, `tailwind.config.js` |

Routes: `/` is the whole site; `/projects` and `/contact` open it at that section (the CV links to `/projects`). `/es/...` and `/en/...` force a language.

## The portrait that follows the cursor

`src/components/FollowHead.tsx` + `src/lib/headRenderer.ts`. One frontal image on a WebGL mesh: the head turns a few degrees and each iris is repainted and moved inside its eye opening, faster than the head. Falls back to Canvas2D without WebGL, respects `prefers-reduced-motion`, and has a pause button.

Eye positions are calibrated for `public/profile/avatar.webp` in `src/data/avatarHead.ts`. **If you replace the avatar, re-measure those values** (eye openings, iris centres and radius, a sclera sample point), all in 0–1 image coordinates.

## Updating the CV

Replace `public/CV_MarcosCorpas.pdf` keeping the name. Note that the PDF is public: anything in it (phone, email) is visible to everyone.

© Marcos Corpas. All rights reserved.
