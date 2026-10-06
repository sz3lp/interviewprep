# BOARD READY

Personal GitHub Pages trainer for **Eastside Fire & Rescue** and **Bellingham Fire** entry-level oral boards (screening / speed → oral → leadership / chiefs).

**Live site:** https://sz3lp.github.io/interviewprep/

## Features

- **Scroll Prep** — Shorts-style swipe feed (say it aloud → rate → next). Weak spots rise first.
- **Distill** — Answer ~18 life-story prompts; weave them into your 3 EF&R screening drafts
- Mission Control with dual-department countdowns and readiness score
- Department hubs (mission, values, stations, process, why-draft, flashcards)
- STAR story bank (edit in-repo)
- Question bank with drafts + confidence
- Process-matched simulators (EF&R 7-min screen, 30-min oral with advance prep, BFD 8-min speed, chiefs/leadership)
- Daily battle plan + weak spots
- Progress export/import (localStorage)

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Edit your content

| File | What to change |
|------|----------------|
| `src/content/stories.ts` | STAR stories + “tell me about yourself” |
| `src/content/departments/efr.ts` | EF&R intel + Why EF&R draft |
| `src/content/departments/bfd.ts` | Bellingham intel + Why BFD draft |
| `src/content/questions.ts` | Practice questions |
| `src/content/schedule.ts` | Daily battle plan |

Confidence scores and simulator reps stay in the browser (Settings → export JSON).

## Deploy

Push to GitHub; `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

In the repo settings, set Pages source to **GitHub Actions**.

Hiring windows in the app are labeled from public Fall 2026 postings — always verify against your NTN / department email invite.
