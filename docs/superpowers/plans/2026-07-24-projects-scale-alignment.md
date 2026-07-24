# Projects Scale Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match the Projects page scale and content width to the existing Uses page.

**Architecture:** Keep the current Projects markup and data unchanged. Adjust only its isolated CSS rules and strengthen the existing contract test so future changes preserve the shared `800px` editorial width and `48px` desktop title ceiling.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Node test runner.

## Global Constraints

- Projects content width is `800px`, matching Uses.
- Desktop title is `clamp(36px, 3.6vw, 48px)`.
- Introduction remains `16px`.
- Featured projects remain two columns on desktop and one on mobile.
- Preserve content, links, localization, navigation, metadata, gradient, accessibility, and reduced motion.
- Add no dependency.

---

### Task 1: Align the Projects visual scale

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/styles.module.css`

**Interfaces:**
- Consumes: existing `.projectsPage`, `.projectsHeader`, `.featuredProject`, `.featuredSection`, and `.archiveSection` selectors.
- Produces: a Projects layout using the same `800px` editorial width and title scale as Uses.

- [ ] **Step 1: Strengthen the failing Projects style contract**

Add these assertions to the existing test named
`the projects route renders an accessible editorial catalogue`:

```js
const projectsPage =
  styles.match(/\.projectsPage\s*\{[^}]*\}/s)?.[0] ?? "";
const projectsTitle =
  styles.match(/\.projectsHeader h1\s*\{[^}]*\}/s)?.[0] ?? "";

assert.match(
  projectsPage,
  /width:\s*min\(calc\(100% - 48px\),\s*800px\)/,
);
assert.match(
  projectsTitle,
  /font-size:\s*clamp\(36px,\s*3\.6vw,\s*48px\)/,
);
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run:

```bash
node --test --test-name-pattern="projects route" tests/*.test.mjs
```

Expected: FAIL because Projects still uses `1040px` and an `82px` title ceiling.

- [ ] **Step 3: Replace the oversized desktop scale**

Apply these exact values in `src/components/Portfolio/styles.module.css`:

```css
.projectsPage {
  width: min(calc(100% - 48px), 800px);
  margin-inline: auto;
  padding-block: 132px 100px;
}

.projectsHeader {
  max-width: 680px;
  margin-bottom: 72px;
}

.projectsHeader h1 {
  margin: 0;
  color: transparent;
  font-size: clamp(36px, 3.6vw, 48px);
  font-weight: 620;
  line-height: 1.08;
  letter-spacing: -0.045em;
  background: linear-gradient(35deg, var(--accent) 8%, #a78bfa 88%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projectsHeader p {
  max-width: 650px;
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
}

.featuredSection,
.archiveSection {
  margin-top: 64px;
}

.featuredProject {
  min-height: 190px;
  padding: 24px;
}

.featuredProject strong {
  margin-top: 32px;
  font-size: 24px;
}

.featuredProject > svg {
  right: 22px;
  bottom: 22px;
}
```

Keep all other existing properties in these selectors unchanged.

- [ ] **Step 4: Align the mobile container and spacing**

Inside the existing `@media (max-width: 760px)` block, use:

```css
.projectsPage {
  width: min(calc(100% - 40px), 800px);
  padding-block: 112px 100px;
}

.projectsHeader {
  margin-bottom: 56px;
}

.projectsHeader h1 {
  font-size: clamp(34px, 10vw, 44px);
}

.featuredProject {
  min-height: 190px;
}
```

Keep the existing one-column featured grid and mobile project metadata rules.

- [ ] **Step 5: Run automated verification**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: all 21 tests pass, lint and typecheck exit with code 0, and both
Projects routes remain statically generated.

- [ ] **Step 6: Inspect desktop and mobile**

With Playwright, open `/en/projects` and `/pt/projects` at `1440 × 1000` and
`390 × 844`. Verify:

- Projects aligns to the same visual width as Uses.
- Title scale matches Uses and is not clipped.
- Featured cards remain two columns on desktop and one on mobile.
- No horizontal overflow exists.
- Menu and locale switching remain correct.

- [ ] **Step 7: Commit only if the user requests implementation commits**

The current working tree contains the uncommitted portfolio redesign. Do not
create an implementation commit that would mix pre-existing changes unless the
user explicitly asks for it.
