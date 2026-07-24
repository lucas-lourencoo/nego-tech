# Wordmark and Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the header LL wordmark 10px right and use the same LL identity as the site favicon.

**Architecture:** Keep the shared header markup unchanged and apply an isolated CSS offset. Add a deterministic App Router SVG icon so the monogram stays sharp at browser-tab sizes without runtime code or a new dependency.

**Tech Stack:** Next.js 16 App Router, CSS Modules, SVG, Node test runner.

## Global Constraints

- Move only the `LL/` wordmark by `10px`.
- Favicon uses a near-black square, off-white `LL`, and green `/`.
- Preserve header height, navigation position, language control, and responsive behavior.
- Add no dependency.

---

### Task 1: Add the wordmark offset and LL favicon

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/styles.module.css`
- Create: `src/app/icon.svg`
- Delete: `public/favicon.ico`

**Interfaces:**
- Consumes: existing `.wordmark` CSS selector.
- Produces: `margin-left: 10px` and a Next.js-discovered root favicon.

- [ ] **Step 1: Add the failing contract**

Append:

```js
test("the LL identity is shared by the header and favicon", async () => {
  const styles = await read("src/components/Portfolio/styles.module.css");
  const icon = await read("src/app/icon.svg");
  const wordmark = styles.match(/\.wordmark\s*\{[^}]*\}/s)?.[0] ?? "";

  assert.match(wordmark, /margin-left:\s*10px/);
  assert.match(icon, /<svg/);
  assert.match(icon, />LL</);
  assert.match(icon, /#b7ff4a/i);
  assert.match(icon, /#0b0b0d/i);
});
```

- [ ] **Step 2: Verify the contract fails**

Run:

```bash
node --test --test-name-pattern="LL identity" tests/*.test.mjs
```

Expected: FAIL because `src/app/icon.svg` does not exist.

- [ ] **Step 3: Offset the wordmark**

Add inside `.wordmark`:

```css
margin-left: 10px;
```

- [ ] **Step 4: Create the favicon**

Create `src/app/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0d"/>
  <text x="8" y="42" fill="#f4f4f1" font-family="monospace" font-size="29" font-weight="700" letter-spacing="-3">LL</text>
  <text x="45" y="43" fill="#b7ff4a" font-family="monospace" font-size="27" font-weight="700">/</text>
</svg>
```

Delete `public/favicon.ico` so the legacy icon cannot conflict with the App
Router icon.

- [ ] **Step 5: Validate**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: all commands pass and the production build exposes `/icon.svg`.

- [ ] **Step 6: Inspect in the browser**

At desktop and mobile widths, confirm the wordmark is 10px farther right while
the centered navigation is unchanged. Reload `/en` and confirm the browser
requests `/icon.svg`.

- [ ] **Step 7: Leave implementation uncommitted**

Do not create a commit unless the user explicitly asks to publish the change.
