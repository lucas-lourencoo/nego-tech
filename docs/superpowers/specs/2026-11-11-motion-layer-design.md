# Motion Layer Design

## Goal

Make the portfolio feel more dynamic with smooth scrolling, scroll-driven feedback and a few hover details. The effects come from Lenis and Skiper UI (free components) and keep the current dark editorial look.

## Tooling

Tailwind v4 is added through `@tailwindcss/postcss` so Skiper UI components can be installed with `npx shadcn add @skiper-ui/skiperNN`. Tailwind loads only its theme and utilities layers. Preflight is left out so existing styles stay the same. The global reset moves into `@layer base`, because an unlayered `* { padding: 0 }` would override Tailwind utilities. Design tokens are exposed to Tailwind as `--color-*` through `@theme inline`.

`motion` is the animation library. `framer-motion` stays banned. Skiper files that import `framer-motion` are switched to `motion/react` after install. Skiper sources live in `src/components/ui/skiper-ui/`. Portfolio wrappers live in `src/components/Portfolio/motion/`.

## Smooth Scroll

Lenis is mounted once in the localized layout, with `lerp: 0.1` and `anchors: true`. On a route change it jumps to the top, unless the URL has a hash. It stops while the mobile menu is open. Lenis's default `respectReducedMotion` stays on. Native `scroll-behavior: smooth` is removed.

## Shell Effects

These two effects show on every page except Home, which is a single screen:

- **Progress bar:** a 2px lime bar fixed at the top of the viewport. It is driven by `useScroll` with a spring, and adapted from skiper89.
- **Edge blur:** a progressive blur on the bottom edge of the viewport, from skiper41. It fades out over the last 10% of the page so the footer stays sharp.

**Nav labels:** they roll letter by letter on hover and focus (skiper58 `TextRoll`, which now accepts a controlled `active` prop). The visible roll is `aria-hidden`, and an `sr-only` copy keeps the link's accessible name. Spaces render as non-breaking spaces so "Media Kit" keeps its gap.

**Reduced motion:** the shell wraps everything in `MotionConfig reducedMotion="user"`.

## Sections

- **Reveal:** headers, project cards, archive rows, Uses categories and About career items fade in and lift 24px once, when they enter the viewport. Each one has a short stagger.
- **Featured projects:**
  - A radial lime glow follows the pointer, using `--spot-x` and `--spot-y`.
  - The card tilts up to 4°, using `--tilt-x` and `--tilt-y`.
  - Both respond to mouse only and are written straight to CSS variables, with no React renders.
  - Reduced motion removes the transform and the transition.
- **Media Kit metrics:** they count up from zero with NumberFlow when they enter the viewport, using the page locale's number format. The original string stays as `sr-only` text.

## Hero Background

A canvas dot field sits behind the hero:

- The dots swell along slow sine waves and blend from lime to violet.
- They glow near the pointer.
- A radial mask fades the field out toward the edges.

It pauses when it is offscreen and when the tab is hidden. With reduced motion it draws a single static frame. An OriginKit component can replace it later, inside `HeroBackground.tsx`.

## Preloader

The preloader is an original design, made because the Skiper UI preloaders are Premium:

- The `<LL/>` wordmark sits in the centre.
- A lime mono counter runs from 000 to 100 over 1.6s, with a hairline progress line below it.
- The curtain then lifts (`y: -100%`, 0.85s).

It shows once per tab session. An inline boot script runs before first paint and sets `html[data-preloader]`:

- `active`: the first visit in the session. The overlay shows only in this state.
- `skip`: the session has already seen it, or the visitor prefers reduced motion.

Visitors without JS never see the overlay, because the attribute is never set.

While it is active:

- Lenis is stopped.
- The hero widget reveal is paused.
- The name typing waits for the `preloader:done` event.

When it finishes, it stores `ll-preloader=seen` in sessionStorage.

## Attribution

The free Skiper UI license requires credit:

- The footer links "Motion components by Skiper UI".
- Skiper UI and Lenis are listed under Coding on the Uses page, in both locales.
