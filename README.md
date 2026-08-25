# OOP Roadmap — NMIMS MPSTME

An interactive companion site for **Object Oriented Programming (702CO0C075)**, built to be
projected/opened during lecture hours instead of static slides. Each topic pairs a plain-English
explanation with real Java code, a real-world analogy, common pitfalls, exam-focused callouts, and
a one-question "quick check" quiz.

Live now: **Unit 1 — Introduction & Foundations** and **Unit 2 — The Four Pillars & Class Modelling**.
Units 3–5 are stubbed on the roadmap and get filled in weekly as the semester progresses.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (CSS-first theme, light/dark)
- **react-router-dom** for routing
- **zustand** (+ `persist`) for progress/quiz state, saved to the browser's `localStorage` —
  no accounts, no backend, state is per-browser as intended for a classroom projector/shared-lab use case
- **framer-motion** for entrance/interaction animation
- **react-syntax-highlighter** (Prism, Java + C++ only, tree-shaken) for code blocks
- **canvas-confetti** for correct-answer celebration

## Adding a new week's content

All content lives in `src/content/`. Nothing else needs to change to add a topic.

1. Open `src/content/unit3.ts` (create it, modelled on `unit1.ts` / `unit2.ts`) and export a
   `Topic[]` array. Each `Topic` has a `blocks: Block[]` (paragraphs, code, callouts, comparison
   tables, headings, diagrams) and a `quiz: QuizQuestion[]`. See `src/lib/types.ts` for the exact
   shape.
2. Wire it into `src/content/units.ts`: import the array, replace the matching stub unit's
   `topics: []` with it, and remove `locked: true`.
3. That's it — the sidebar, progress ring, roadmap map, and routing all pick it up automatically.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploying

This repo is set up to deploy straight to Vercel (framework preset: Vite). Push to the connected
GitHub repository and Vercel will build and deploy automatically.
