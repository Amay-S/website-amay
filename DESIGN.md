# Design system: "Glacier"

Calm, precise, light-first. Depth comes from soft layered surfaces and a faint grid, not from glow. Motion guides attention and never blocks reading.

## Color

All tokens live in `src/app/globals.css` as CSS variables, each with an `-rgb` channel twin (`--accent-solid-rgb: 79 70 229`) for alpha blending: `rgb(var(--accent-solid-rgb) / 0.2)`. They are mapped into Tailwind, so use `bg-surface`, `text-fg-muted`, `border-border`, and so on.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#F7F8FA` | `#0A0F1C` | Page |
| `bg-subtle` | `#EEF1F6` | `#0D1424` | Footer, side panels |
| `surface` | `#FFFFFF` | `#111A2E` | Cards |
| `surface-2` | `#F3F5F9` | `#16223B` | Chips, hover |
| `border` / `border-strong` | `#E2E6EE` / `#C9D0DD` | `#213050` / `#33476F` | Hairlines |
| `fg` / `fg-muted` / `fg-subtle` | `#0B1220` / `#45516A` / `#5F6B82` | `#E8EDF6` / `#AAB4C8` / `#8C98B0` | Text |
| `accent` | `#4338CA` | `#A5B4FC` | Links, eyebrows, active text |
| `accent-solid` | `#4F46E5` | `#4F46E5` | Primary buttons (white text) |
| `accent-2` | `#0EA5E9` | `#38BDF8` | Gradient partner only, never body text |
| `accent-soft` | `#EEF0FF` | `#1B2347` | Active pill and stage backgrounds |
| `success` / `warning` | `#047857` / `#A16207` | `#34D399` / `#FBBF24` | Verified / in progress |

- Gradients always blend `accent-solid` to `accent-2` (indigo to sky).
- Every text pair above meets WCAG AA (4.5:1 or better) in both themes.
- Tool and certification logos always sit on `bg-logo-plate` (a soft light plate) in full color, in both themes.
- Theme: follows the OS by default. The toggle saves the choice to `localStorage.theme`. A boot script in `layout.tsx` sets `<html data-theme>` before first paint, so there's no flash.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display | Sora | Headings, numbers |
| Text | Inter | Body |
| Mono | JetBrains Mono | Eyebrows, dates, metadata |

All three are self-hosted via `next/font` with `display: swap`. The fluid scale uses `clamp()`, defined in `@theme`:

`text-display` (name) → `text-h1` → `text-h2` (section titles) → `text-h3` → `text-lead` → body → `text-sm` → `text-micro` (uppercase mono eyebrows).

Keep reading width at 65 to 75 characters (`max-w-[65ch]`).

## Layout

- `Container`: max 76rem (84rem from `2xl`), with fluid gutters. Wide screens get more air, not longer lines.
- `Section`: eyebrow, then `h2`, then an optional intro, then content. There is exactly one `h1` per page.
- Data panels (metrics, focus areas, role detail) use the `.hud` class: corner brackets in the accent color.
- Cards (`cardClass`): `rounded-2xl`, a hairline border, `shadow-sm`. On hover only the border and shadow brighten evenly. No lifting, glare, or spinning borders.

## Motion rules

1. Scroll reveals use `data-reveal`: fade and rise 14px over 380ms, once per element, staggered with `--reveal-i`.
2. The Experience role switcher is static: there's no scroll-driven animation, and it only changes on click or arrow keys.
3. Auto-advancing showcases use `useAutoAdvance` (`src/lib/useAutoAdvance.ts`). Each item shows for 4s. They pause on mouse hover, keyboard focus, when off-screen, or with the visible pause button. Clicking a tab jumps there, and the tour continues from it. The progress bar's CSS animation is the timer, so pausing resumes exactly where it stopped.
4. Animate only `transform` and `opacity`.
5. Under `prefers-reduced-motion`, nothing auto-advances, reveals are off, and everything is visible immediately.
6. Status indicators (Verified, completed pipeline stages) render in their final state, never animated in.

## Content

All content lives in `src/data/portfolioData.json`, so you don't need to edit components to update it.

### Add a project

Append to `projects`:

```json
{
  "id": "kebab-case-id",
  "title": "Full project title",
  "shortTitle": "Tab label (2–3 words)",
  "subtitle": "Category, e.g. Generative AI & RAG",
  "dates": "Sep 2026 or Jan 2026 – Feb 2026",
  "association": "Finomics (or empty)",
  "bullets": ["What you built or did."],
  "result": "Outcome, shown as a highlighted callout (or empty)",
  "tags": ["Python", "Amazon S3"]
}
```

It appears automatically as a new tab in the Projects showcase.

### Add a certification

Put a square logo in `public/images/` (WebP, about 192px). Then add an entry to `certifications.active` (with `credentialUrl`) or to `certifications.inProgress`.

### Hero numbers and PM metrics

`hero.highlights` holds the 4 numbers in the hero proof row. `pmMetrics` feeds the "Delivery by the numbers" dashboard in the Skills section. To show the live certification count, set a metric's value to `"auto:certs"`.

### About text

`hero.about` is an array of paragraphs. The first one renders in full-strength text, the rest in muted text.

## Writing rules

- Use US English, and official product casing (GitHub, PostgreSQL, Next.js).
- Make no placeholder or invented claims. Every number must be traceable to the resume.
