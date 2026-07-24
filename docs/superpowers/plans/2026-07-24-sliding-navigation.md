# Sliding Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an unboxed `LL/` wordmark and a single animated navigation indicator that slides between About and Contact.

**Architecture:** Convert `SiteShell` to a client component, measure the two link elements through refs, and expose the selected link's left offset, width, and visibility as CSS custom properties on the navigation. CSS renders and animates one absolute indicator behind both links.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Node test runner.

## Global Constraints

- Internal destinations remain Next.js `Link` components.
- The active destination remains marked with `aria-current="page"`.
- The indicator returns to the active page after hover.
- Home hides the resting indicator.
- Mobile keeps the fixed bottom navigation.
- Reduced-motion users receive no sliding animation.

---

### Task 1: Add the interaction contract

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`

- [ ] Assert that `SiteShell.tsx` contains `"use client"`, `useRef`, `useState`,
  a `navIndicator`, pointer enter/leave handlers, focus handlers, and
  `aria-current`.
- [ ] Assert that CSS contains `.navIndicator`, transform/width transitions,
  reduced-motion handling, and an unboxed 18px `.wordmark`.
- [ ] Run the focused test and verify failure.

### Task 2: Implement the shared indicator

**Files:**
- Modify: `src/components/Portfolio/SiteShell.tsx`

- [ ] Add `"use client"` and React state/ref imports.
- [ ] Keep refs for the navigation element and both links.
- [ ] Implement `selectIndicator(page)` to read link and nav rectangles and set
  `{ left, width, visible }`.
- [ ] Initialize and resize-sync the active page position in `useLayoutEffect`.
- [ ] Render one `<span aria-hidden className={styles.navIndicator} />` before
  the links.
- [ ] Set `--indicator-left`, `--indicator-width`, and `--indicator-opacity`
  through a typed `CSSProperties` object.
- [ ] On pointer enter/focus select the corresponding link.
- [ ] On pointer leave/blur restore the active page or hide on Home.
- [ ] Run TypeScript and the focused test.

### Task 3: Restyle wordmark and navigation

**Files:**
- Modify: `src/components/Portfolio/styles.module.css`

- [ ] Remove background, border, radius, shadow, padding, and fixed dimensions
  from `.wordmark`; set it to 18px.
- [ ] Remove background, border, radius, shadow, backdrop blur, and overflow
  clipping from `.nav`.
- [ ] Make `.nav` positioned and isolate its stacking context.
- [ ] Position `.navIndicator` absolutely behind links with a subtle
  `var(--surface-hover)` background and rounded shape.
- [ ] Animate left/width/opacity for 220ms.
- [ ] Keep link text at `z-index: 1` and remove the per-link active background.
- [ ] At `prefers-reduced-motion: reduce`, set the indicator transition to none.

### Task 4: Validate interaction and production

**Files:**
- Modify: `src/components/Portfolio/styles.module.css` only for visual fixes.

- [ ] Run `pnpm test`, `pnpm lint`, and `pnpm typecheck`.
- [ ] At 1440×900, hover About and Contact from Home and confirm the indicator
  follows the pointer then hides.
- [ ] On About, hover Contact and confirm pointer leave restores About.
- [ ] At 390×844, repeat the interaction on the bottom menu.
- [ ] Run `pnpm build` and verify Home, About, and Contact still statically
  generate for both locales.
