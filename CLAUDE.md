# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Next.js)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio — one route (`app/page.tsx`) that composes all sections vertically:

```
Navbar → Hero → SectionDivider → About → SectionDivider → Projects → SectionDivider → Contact → Footer
```

All components live in `components/`. All are Client Components (`'use client'`).

### Theming

Dual-theme (light/dark) via CSS custom properties on `[data-theme="dark"]` in `app/globals.css`. `ThemeProvider` (`components/ThemeProvider.tsx`) manages state in React context and persists to `localStorage`. The root layout injects an inline script into `<head>` to read `localStorage` before React hydrates, preventing a flash.

**Light:** warm off-white (`#FAFAF7`) + purple accent (`#7C3AED`)  
**Dark:** deep forest green (`#0D1B14`) + sage accent (`#5FA676`)

To add a new themed value, add it to both `:root` and `[data-theme="dark"]` in `globals.css` and reference it with `var(--name)`.

### Animations

Framer Motion throughout. Pattern: `useInView` ref on the section, then `initial`/`animate` toggled by `inView`. `AnimatePresence` is used for tab/accordion transitions in Projects.

`TextScramble` (`components/TextScramble.tsx`) — custom scramble-on-mount text effect, used for section headings.  
`Magnetic` (`components/Magnetic.tsx`) — cursor-follow magnetic pull on hover; wraps the Contact submit button. Disabled automatically on touch devices.  
`DotGrid` (`components/DotGrid.tsx`) — canvas-based animated dot grid used as a background effect.  
`ScrollProgress` (`components/ScrollProgress.tsx`) — thin accent-colored bar at the top tracking scroll position.

### Projects section

Data is a static `PROJECTS` array at the top of `components/Projects.tsx` — no external data source. Each project has a `type: 'web' | 'mobile' | 'game'` that determines tab filtering and the device frame (browser mockup for `web`, phone mockup for `mobile`/`game`).

Desktop layout: left column list + right sticky preview panel. Mobile layout: accordion (both toggled by CSS class injection in a `<style>` tag + `useEffect` media query listener).

To add a project: add an entry to the `PROJECTS` array and drop the screenshot in `public/project/`.

### Contact form

Uses EmailJS (`@emailjs/browser`). Requires three env vars:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Typography

Three font families imported from Google Fonts in `globals.css`:
- `Instrument Serif` — headings/display
- `Sora` — body text
- `JetBrains Mono` — labels, tags, metadata

Fonts are referenced inline via a local `F` constant object in components that need all three (e.g. `Projects.tsx`).
