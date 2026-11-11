# Motion Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Lenis smooth scroll, Skiper UI motion components and a hero background without changing the existing design system.

**Architecture:** Tailwind v4 is added without Preflight, alongside the CSS Modules, so shadcn-registry components can be installed. Small client wrappers in `src/components/Portfolio/motion/` hold the effects. Server pages keep rendering markup and mount those wrappers as client islands.

**Tech Stack:** Next.js 16, React 19, CSS Modules, Tailwind v4, motion, Lenis, NumberFlow, Node test runner

## Global Constraints

- Existing CSS Module classes and the values pinned in `tests/portfolio-contract.test.mjs` stay unchanged.
- No `framer-motion` dependency or import.
- Every effect respects `prefers-reduced-motion`.
- External links keep `target="_blank"` and `rel="noreferrer"`.

---

### Task 1: Tooling

**Files:** Modify `package.json`, `src/app/globals.css`. Create `postcss.config.mjs`, `components.json`, `src/lib/utils.ts`.

- [x] Add `lenis`, `motion`, `clsx`, `tailwind-merge`, `lucide-react`, `@number-flow/react`. Add `tailwindcss` and `@tailwindcss/postcss` as dev dependencies.
- [x] Import the Tailwind theme and utilities layers. Move the reset into `@layer base`. Remove `scroll-behavior: smooth`.
- [x] Write `components.json` by hand, with the `@skiper-ui` registry.

### Task 2: Skiper Components

**Files:** Create `src/components/ui/skiper-ui/skiper41.tsx` and `skiper58.tsx`.

- [x] Run `npx shadcn add @skiper-ui/skiper41 @skiper-ui/skiper58`.
- [x] Remove `framer-motion` and rewrite the imports to `motion/react`.
- [x] Give `TextRoll` a controlled `active` prop, a `style` override, an `aria-hidden` duplicate layer and non-breaking spaces.

### Task 3: Shell Effects

**Files:** Create `motion/SmoothScroll.tsx`, `ScrollProgress.tsx`, `EdgeBlur.tsx`, `RollingLabel.tsx`. Modify `SiteShell.tsx` and `[lang]/layout.tsx`.

- [x] Mount Lenis in the layout. Stop it while the mobile menu is open.
- [x] Show the progress bar and edge blur on every page except Home. Roll the nav labels on hover and focus.

### Task 4: Section Effects

**Files:** Create `motion/Reveal.tsx`, `SpotlightCard.tsx`, `CountUp.tsx`, `HeroBackground.tsx`. Modify the Projects, About, Uses, Media Kit and Home components and `styles.module.css`.

- [x] Add reveal on scroll, the spotlight and tilt on featured projects, the count-up on Media Kit metrics, and the canvas hero background.

### Task 5: Contracts and Verification

**Files:** Create `tests/motion-layer.test.mjs`. Modify `src/content/portfolio.ts`.

- [x] Add the Skiper UI credit to the footer and the Uses page.
- [x] Run `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm build`.
- [x] Check desktop and mobile in the browser. Confirm Lenis stops with the menu open, the console has no errors and the metrics use the right locale format.
