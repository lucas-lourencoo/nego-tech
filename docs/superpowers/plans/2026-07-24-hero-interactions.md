# Hero Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a deliberate `C` correction to the name animation and a responsive green custom pointer.

**Architecture:** Model the typing animation as timed text frames inside the existing client component. Add a focused custom-pointer client component to the shared shell, using pointer events and direct transform updates to avoid React renders on every movement.

**Tech Stack:** Next.js, React, CSS Modules, Node test runner, Playwright

## Global Constraints

- Type `c`, pause 400ms, erase, pause 220ms, type `ç`, wait 180ms, then continue.
- Blink the caret only after the correct full name is visible.
- Keep the measured hero geometry stable throughout typing.
- Use a 10px accent-green pointer that grows to 28px on interactive controls.
- Keep native pointer behavior on touch and coarse-pointer devices.
- Remove transitions under reduced motion.

---

### Task 1: Deliberate typing correction

**Files:**
- Modify: `src/components/Portfolio/TypingName.tsx`
- Modify: `tests/portfolio-contract.test.mjs`

- [ ] Add a failing contract for timed frames containing `C`, 250ms, deletion, 120ms, and `ç`.
- [ ] Run the contract suite and confirm failure.
- [ ] Replace character-count intervals with sequential timeout frames.
- [ ] Run tests, lint, and TypeScript.

### Task 2: Custom green pointer

**Files:**
- Create: `src/components/Portfolio/CustomCursor.tsx`
- Modify: `src/components/Portfolio/SiteShell.tsx`
- Modify: `src/components/Portfolio/styles.module.css`
- Modify: `tests/portfolio-contract.test.mjs`

- [ ] Add a failing contract for fine-pointer detection, transform updates, interactive target detection, 10px/28px styles, and reduced motion.
- [ ] Run the contract suite and confirm failure.
- [ ] Mount the pointer once in the shell and implement pointer listeners with cleanup.
- [ ] Add responsive and accessible CSS.
- [ ] Run the complete test, lint, typecheck, and build suite.
- [ ] Verify typing geometry and pointer sizes in Playwright.
