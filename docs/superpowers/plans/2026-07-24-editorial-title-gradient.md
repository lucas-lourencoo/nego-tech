# Editorial Title Gradient Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a green-to-purple text gradient to the primary About and Uses page titles.

**Architecture:** Keep the effect entirely in the existing portfolio CSS module and share one declaration between both title selectors. Protect the styling contract with the existing Node test suite.

**Tech Stack:** Next.js, React, CSS Modules, Node test runner

## Global Constraints

- Apply the gradient only to `.editorialPage > h1` and `.usesHeader h1`.
- Run the gradient diagonally from the lower-left to the upper-right using the existing green `var(--accent)` and soft purple `#a78bfa`.
- Preserve a readable `var(--text)` fallback and use clipped text for the gradient.
- Do not change title copy, typography, spacing, or other page elements.

---

### Task 1: Editorial title gradient

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/styles.module.css`

**Interfaces:**
- Consumes: Existing `.editorialPage > h1`, `.usesHeader h1`, `--accent`, and `--text` CSS contracts.
- Produces: A shared green-to-purple clipped-text gradient for both primary editorial titles.

- [ ] **Step 1: Write the failing test**

Add a contract test that reads `styles.module.css`, extracts the shared title rule, and requires `color: var(--text)`, a `45deg` gradient from `var(--accent)` to `#a78bfa`, text clipping, and transparent WebKit text fill.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/portfolio-contract.test.mjs`

Expected: FAIL because the shared title-gradient rule does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Add this shared rule without changing the existing typography declarations:

```css
.editorialPage > h1,
.usesHeader h1 {
  color: var(--text);
  background: linear-gradient(45deg, var(--accent) 0%, #a78bfa 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 4: Run verification**

Run:

```bash
node --test tests/portfolio-contract.test.mjs
npm run lint
npm run typecheck
npm run build
```

Expected: Every command exits with status 0.
