# Sliding Navigation Design

## Goal

Replace the boxed portfolio header controls with a lighter wordmark and a
Zeno-inspired navigation indicator that slides between About and Contact.

## Wordmark

The `LL/` wordmark keeps its green slash but removes its background, border,
rounded container, shadow, and fixed button dimensions. Its text size increases
from 13px to 18px.

## Navigation

The navigation has no enclosing background, border, or shadow. About and
Contact remain Next.js `Link` components.

A single rounded, low-contrast indicator sits behind the links. It:

- rests behind the active page;
- moves behind a link on pointer hover or keyboard focus;
- returns to the active page when the pointer leaves the navigation;
- hides on the home page until a link is hovered or focused;
- animates its position and width with a 220ms easing transition.

The link text stays above the indicator. The active link remains represented by
`aria-current="page"`.

## Responsive Behavior

Desktop navigation remains centered at the top. Mobile navigation remains fixed
near the bottom and uses the same shared indicator across the two equal-width
links.

When `prefers-reduced-motion: reduce` is active, the indicator changes position
without animation.

## Implementation

`SiteShell` becomes a small client component so it can track the hovered/focused
item and measure link geometry. The navigation uses refs and updates CSS custom
properties for indicator position, width, and visibility. External links and
page content remain server-rendered.

## Validation

Tests verify the larger unboxed wordmark, two internal Next.js links, one shared
indicator, hover/focus handlers, active-page fallback, and reduced-motion CSS.
Lint, TypeScript, tests, production build, and desktop/mobile interaction are
validated.
