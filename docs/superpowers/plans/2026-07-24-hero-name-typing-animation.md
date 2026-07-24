# Hero Name Typing Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the homepage name once as stepped typing with a thick green caret that keeps blinking.

**Architecture:** Keep the portfolio page server-rendered and implement the effect with semantic wrapper spans and CSS keyframes. Preserve the heading's full layout width while only clipping the visible text, and disable the effect for reduced motion.

**Tech Stack:** Next.js, React, CSS Modules, Node test runner

## Global Constraints

- Run once in approximately 1.4 seconds.
- Animate only the homepage hero name.
- Preserve the existing hero layout and copy.
- Keep the thick insertion caret blinking after typing completes.
- Show the full name immediately under `prefers-reduced-motion: reduce`.

---

### Task 1: One-shot hero typing animation

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/index.tsx`
- Modify: `src/components/Portfolio/styles.module.css`

**Interfaces:**
- Consumes: `content.hero.title` and the existing `.hero h1` styles.
- Produces: `.typingName`, `.typingNameText`, and `.typingCaret` presentation hooks.

- [ ] **Step 1: Add a failing contract test**

Require the semantic text and decorative caret markup, stepped one-shot keyframes, persistent blinking caret, and reduced-motion overrides.

- [ ] **Step 2: Verify the test fails**

Run `node --test tests/portfolio-contract.test.mjs` and expect the new contract to fail because the typing hooks are absent.

- [ ] **Step 3: Implement the markup and CSS**

Wrap the localized title in a stable-width typing container. Animate the text with stepped `clip-path`, move a thick green caret across the measured container width, then keep it blinking.

- [ ] **Step 4: Verify the result**

Run the contract tests, lint, TypeScript checking, and the production build. Every command must exit with status 0.
