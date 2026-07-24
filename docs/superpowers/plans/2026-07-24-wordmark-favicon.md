# Wordmark and Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the header wordmark as `<LL/>` at 21px, move it 10px right, and use the same identity as the site favicon.

**Architecture:** Update the shared wordmark markup and its isolated CSS size and offset. Add a deterministic App Router SVG icon so the monogram stays sharp at browser-tab sizes without runtime code or a new dependency.

**Tech Stack:** Next.js 16 App Router, CSS Modules, SVG, Node test runner.

## Global Constraints

- Render the wordmark as `<LL/>` and move it by `10px`.
- Set the wordmark to `21px`.
- Favicon uses a near-black square, off-white `LL`, and green symbols.
- Preserve header height, navigation position, language control, and responsive behavior.
- Add no dependency.

---

### Task 1: Add the wordmark offset and LL favicon

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/styles.module.css`
- Create: `src/app/icon.svg`

**Interfaces:**
- Consumes: existing `.wordmark` CSS selector.
- Produces: `font-size: 21px`, `margin-left: 10px`, and a Next.js-discovered root favicon.

- [ ] **Step 1: Add the failing contract**

Append:

```js
test("the LL identity is shared by the header and favicon", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");
  const icon = await read("src/app/icon.svg");
  const wordmark = styles.match(/\.wordmark\s*\{[^}]*\}/s)?.[0] ?? "";

  assert.match(shell, /<span>&lt;<\/span>LL<span>\/&gt;<\/span>/);
  assert.match(wordmark, /margin-left:\s*10px/);
  assert.match(wordmark, /font-size:\s*21px/);
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

Render the wordmark in `SiteShell.tsx` as:

```tsx
<span>&lt;</span>LL<span>/&gt;</span>
```

Then add inside `.wordmark`:

```css
margin-left: 10px;
font-size: 21px;
```

- [ ] **Step 4: Create the favicon**

Create `src/app/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0d"/>
  <text x="5" y="42" fill="#b7ff4a" font-family="monospace" font-size="25" font-weight="700">&lt;</text>
  <text x="19" y="42" fill="#f4f4f1" font-family="monospace" font-size="25" font-weight="700" letter-spacing="-3">LL</text>
  <text x="40" y="42" fill="#b7ff4a" font-family="monospace" font-size="25" font-weight="700">/&gt;</text>
</svg>
```

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

At desktop and mobile widths, confirm the wordmark computes to `21px` and is
10px farther right while the centered navigation is unchanged. Reload `/en`
and confirm the browser requests `/icon.svg`.

- [ ] **Step 7: Leave implementation uncommitted**

Do not create a commit unless the user explicitly asks to publish the change.
