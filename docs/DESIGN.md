# Portfolio Design Summary

## Overview

A single-page portfolio for Sam Lansoy — full-stack developer, mobile developer, and UI/UX designer. Built with Next.js 16, React 19, and Framer Motion. Features light/dark theme with carefully tuned color palettes.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **UI:** React 19, Framer Motion 12
- **Styling:** CSS custom properties (CSS variables), inline styles
- **Email:** EmailJS for contact form
- **Fonts:** Instrument Serif (headings), Sora (body), JetBrains Mono (monospace accents)

## Design System

### Color Palette

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FAFAF7` (warm off-white) | `#0D1B14` (deep forest) |
| `--accent` | `#7C3AED` (purple) | `#5FA676` (muted green) |
| `--text` | `#18181B` | `#E4E0D7` |
| `--text-mid` | `#52525B` | `#A3AA9E` |
| `--text-muted` | `#A1A1AA` | `#5E6E5C` |

### Typography

- **Headings:** Instrument Serif, italic, clamp-based fluid sizing (4rem-8rem for hero, 2rem-3.2rem for sections)
- **Body:** Sora, weight 300-400, 0.85-0.95rem
- **Code/Labels:** JetBrains Mono, 0.6-0.78rem, uppercase with letter-spacing for labels

### Spacing

- Section padding: `7rem` vertical, `clamp(1.5rem, 6vw, 5rem)` horizontal
- Max content width: 900px (general), 1100px (projects)
- Consistent gap scales: 0.5rem, 1rem, 2rem, 3rem

## Page Sections

### 1. Hero (`components/Hero.tsx`)
- Typewriter effect: name characters appear one by one with blinking cursor
- Roles and bio fade in after typing completes
- GitHub and email links with icon + monospace labels
- **Dot grid background** (`components/DotGrid.tsx`): canvas-based grid that responds to mouse movement with parallax and proximity glow. Hidden on touch devices.

### 2. About (`components/About.tsx`)
- Two-column layout: bio text (left) + stats (right)
- **Animated stats counter**: numbers count up from 0 on scroll with easeOutQuart
- GitHub CTA button with magnetic hover effect and glow
- Includes Skills sub-section

### 3. Skills (`components/Skills.tsx`)
- Notebook/paper aesthetic: lined background, red margin line, noise grain overlay
- Typewriter-style reveal: clip-path animation reveals each tech category
- Hover interactions: individual skill items lift, line cursor blinks
- Categories: Languages, Frameworks & Libraries, Tools & Platforms

### 4. Projects (`components/Projects.tsx`)
- Tabbed filtering: Web, Mobile, Games
- **Desktop:** Split layout — project list (left) with sticky preview panel (right)
- **Mobile:** Accordion rows that expand to show project details
- Device frames: browser chrome for web projects, phone frame for mobile/games
- **3D tilt effect**: device frames tilt toward cursor on hover with perspective transform and dynamic shadow
- Each project shows: title, year, description, tech stack, overview, highlights, role, GitHub link

### 5. Contact (`components/Contact.tsx`)
- Two-column: info text (left) + form (right)
- EmailJS integration for form submission
- Success/error states with "send another" option
- Submit button with magnetic hover effect and glow

### 6. Footer (`components/Footer.tsx`)
- Minimal: name (serif italic) + copyright (monospace)

## Interactive Enhancements

### Scroll Progress Bar (`components/ScrollProgress.tsx`)
- 2px accent-colored bar fixed to top of viewport
- Fills left-to-right based on scroll position using `scaleX` transform

### Section Dividers (`components/SectionDivider.tsx`)
- Gradient lines between sections that animate from center outward on scroll
- Uses Framer Motion `useInView` for trigger

### Text Scramble (`components/TextScramble.tsx`)
- Section headings ("About Me", "Projects", "Let's talk.") scramble through random characters before resolving
- Triggered once on scroll into view
- Character set: `!<>-_\/[]{}=+*^?#________`

### Magnetic Cursor (`components/Magnetic.tsx`)
- Wrapper component that makes children subtly pull toward cursor on hover
- Applied to: nav links, GitHub button, contact submit button
- Configurable strength (default 0.3)
- Disabled on touch devices

### Animated Count-Up (in `About.tsx`)
- Stats animate from 0 to target value with easeOutQuart easing
- 1.8s duration with staggered delays per stat

### 3D Tilt (in `Projects.tsx` `DeviceFrame`)
- Device frames tilt toward cursor position (max 5 degrees)
- Shadow shifts in opposite direction for realism
- Smooth transition back to flat on mouse leave

## Theme System

- `ThemeProvider` (`components/ThemeProvider.tsx`): React context providing `theme` and `toggleTheme`
- `ThemeToggle` (`components/ThemeToggle.tsx`): animated sun/moon SVG toggle
- Persistence via `localStorage`
- Flash prevention via inline `<script>` in `layout.tsx`
- All colors use CSS custom properties, toggled via `[data-theme="dark"]`

## Responsive Breakpoints

- `640px`: mobile nav (hamburger menu), single-column About grid
- `700px`: single-column Contact form
- `767px`: mobile project accordion replaces split layout

## File Structure

```
app/
  layout.tsx          # Root layout, ThemeProvider, fonts
  page.tsx            # Home page composition
  globals.css         # CSS variables, resets, keyframes
components/
  Navbar.tsx          # Fixed nav with scroll detection
  Hero.tsx            # Hero section with typewriter
  About.tsx           # About + stats with count-up
  Skills.tsx          # Notebook-style tech stack
  Projects.tsx        # Tabbed project showcase
  Contact.tsx         # Contact form with EmailJS
  Footer.tsx          # Minimal footer
  ThemeProvider.tsx    # Theme context
  ThemeToggle.tsx     # Animated theme switch
  TextScramble.tsx    # Scramble text effect
  ScrollProgress.tsx  # Scroll progress bar
  SectionDivider.tsx  # Animated divider lines
  Magnetic.tsx        # Magnetic hover wrapper
  DotGrid.tsx         # Canvas dot grid background
hooks/
  useMagnetic.ts      # Magnetic effect hook (unused, Magnetic.tsx preferred)
```
