# Editorial About Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge Experience into a compact, editorial About page and reduce the localized site navigation to About and Contact.

**Architecture:** Reuse the existing typed experience content inside `AboutPage`, remove the standalone Experience component and routes, and update navigation, sitemap, metadata, CSS, and contract tests to reflect the three-destination site.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Node test runner.

## Global Constraints

- Home remains a full-screen hero.
- The menu contains only About and Contact.
- About combines biography, avatar, capabilities, languages, education, and career.
- Experience routes are removed in English and Portuguese.
- All internal navigation uses `next/link`.
- The dark theme, green accent, `LL/` wordmark, and circular pixel-art avatar remain.
- The résumé and commercial-project content remain absent.

---

### Task 1: Define the merged About contract

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/content/portfolio.ts`

**Interfaces:**
- Produces: `PortfolioContent.labels.career: string`
- English value: `"Career"`
- Portuguese value: `"Carreira"`

- [ ] Add a failing test asserting localized career labels, a two-item navigation
  array, `content.experiences` inside `AboutPage.tsx`, and absence of
  `ExperiencePage`.
- [ ] Run `pnpm test` and verify the new contract fails.
- [ ] Add `career` to the labels type and both locale objects.
- [ ] Run the focused test and verify the content assertions pass.

### Task 2: Redesign About as an editorial page

**Files:**
- Modify: `src/components/Portfolio/AboutPage.tsx`
- Modify: `src/components/Portfolio/styles.module.css`
- Delete: `src/components/Portfolio/ExperiencePage.tsx`

**Interfaces:**
- `AboutPage({ content: PortfolioContent })` renders all personal and career
  content.

- [ ] Add `next/image` and render `/51462903.png` at 240×240 with a localized
  portrait alt and the existing circular crop.
- [ ] Replace the wide `aboutGrid` composition with:
  `editorialPage → editorialIntro → editorialMeta → career`.
- [ ] Map all `content.experiences` into semantic career articles containing an
  `h3`, company, period, summary, current marker, and skill tags.
- [ ] Set the page column to `min(calc(100% - 48px), 800px)`.
- [ ] Use a 240px/text introduction grid on desktop and one column on mobile.
- [ ] Style supporting information as three compact columns without cards.
- [ ] Style career entries as vertically separated editorial blocks.
- [ ] Run tests, lint, and TypeScript checks.

### Task 3: Remove Experience navigation and routes

**Files:**
- Modify: `src/components/Portfolio/SiteShell.tsx`
- Delete: `src/app/(portfolio)/[lang]/experience/page.tsx`
- Modify: `src/components/Portfolio/types.ts`
- Modify: `src/lib/portfolio-metadata.ts`

**Interfaces:**
- `PageSlug = "home" | "about" | "contact"`
- `pages = ["about", "contact"] as const`

- [ ] Change `PageSlug` and the shell's pages array.
- [ ] Remove Experience metadata.
- [ ] Delete the Experience route and component.
- [ ] Run the focused navigation and route tests.

### Task 4: Update sitemap and route contracts

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Sitemap pages: `["", "/about", "/contact"]`
- Total static localized portfolio routes: six.

- [ ] Replace the sitemap pages array.
- [ ] Assert that About and Contact routes generate metadata.
- [ ] Assert that sitemap source contains no `"/experience"`.
- [ ] Assert that no Experience route/component exists using access checks.
- [ ] Run `pnpm test`.

### Task 5: Validate production and responsive layout

**Files:**
- Modify: `src/components/Portfolio/styles.module.css` only for issues found
  during inspection.

**Interfaces:**
- Validates Tasks 1–4.

- [ ] Run `pnpm test`, `pnpm lint`, and `pnpm typecheck` in parallel.
- [ ] Run `pnpm build` and verify only Home, About, and Contact generate for both
  locales.
- [ ] Inspect `/en/about` and `/pt/about` at 1440×900.
- [ ] Inspect `/en/about` at 390×844 and verify the fixed bottom navigation does
  not cover the final career item or footer.
- [ ] Verify `Resume`, `Résumé`, commercial-project fields, and Experience links
  are absent from `src` and `public`.
