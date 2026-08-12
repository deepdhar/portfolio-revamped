# Deep Dhar — Portfolio

A premium, editorial personal portfolio built with Next.js, TypeScript, GSAP, Three.js, and Lenis smooth scroll.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for utility styling, native CSS for design tokens
- **GSAP + ScrollTrigger** for the motion system
- **Lenis** for smooth scrolling, wired into ScrollTrigger's raf loop
- **Three.js** for the hero's generative particle field (no React Three Fiber — raw Three for tighter perf control)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

This project is Vercel-ready out of the box — no environment variables required.

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). Click Deploy.

## Project structure

```
app/
  page.tsx             Homepage — hero + work index (single-screen landing, like the reference)
  info/page.tsx         About + Experience + Contact (separate route, not stacked on the homepage)
  layout.tsx            Root layout: preloader, nav, status bar, fonts
components/
  navigation/          Minimal scroll-aware nav + persistent bottom status bar
  hero/                Hero (headline + tagline; the work index renders inside it)
  projects/            WorkIndex (list) + WorkRow (video-hover row, index-style)
  about/               Editorial About section (lives on /info)
  experience/          Scroll-driven timeline (lives on /info)
  contact/             Footer / contact section
  cursor/              Custom cursor (desktop only, fine-pointer + no-reduced-motion)
  transitions/         Preloader (0→100%) + Lenis smooth-scroll provider
  webgl/               Three.js particle field
lib/
  animations/          Reusable GSAP helpers (fadeIn, revealOnScroll, splitTextReveal, etc.)
  motion/              Centralized motion config (durations, eases, stagger)
  utils/               Small shared utilities
data/                  Content: experience.ts, projects.ts
public/media/work/     Drop your real project media here (see below)
```

## Adding your project media

Each project row shows a hover-preview video. Drop your own files here, matching each project's slug:

```
public/media/work/concierge/featured.mp4
public/media/work/media-gallery/featured.mp4
public/media/work/super-app/featured.mp4
public/media/work/ai-workflow/featured.mp4
```

Then in `data/projects.ts`, set `mediaReady: true` on that project's entry so the component switches from the placeholder to the actual `<video>` tag. MP4, muted, no audio track needed — it autoplays/loops on hover and is paused otherwise. If you'd rather use a static image, swap the file extension and update `mediaType` accordingly (image rendering isn't wired into `WorkRow.tsx` yet — ask if you want that added).

## Design notes

- **Architecture**: single-screen homepage (name + tagline + full work index, no separate "scroll to see projects" section) with About/Experience moved to `/info` — this mirrors segerman.dev's structure of "hero doubles as the project index" + a separate info route, built with original layout code and your own content.
- **Preloader**: a 0→100% counter gates the first paint, then slides away — same beat as the reference, original implementation.
- **Palette**: near-black background (`#0a0a0a`), warm off-white foreground (`#f4f2ec`), single soft periwinkle accent (`#a8bdff`).
- **Type**: Space Grotesk (display), Inter Tight (body), JetBrains Mono (labels/metadata).
- **Signature element**: the hero's particle field traces sparse connecting lines and drifts toward the cursor.
- **Accessibility**: `prefers-reduced-motion` skips the preloader wait, disables Lenis and the particle field, and reduces all GSAP tweens to near-zero duration. Custom cursor is disabled on touch/coarse-pointer devices.
- **Content**: `data/experience.ts` and `data/projects.ts` are the single source of truth.

## Editing content

- **Experience**: `data/experience.ts`
- **Projects**: `data/projects.ts`
- **Hero copy**: `components/hero/Hero.tsx`
- **About statement**: `components/about/About.tsx`
- **Contact email**: search for `dhar2017.slg@gmail.com` in `components/navigation/Navigation.tsx` and `components/contact/Contact.tsx`
