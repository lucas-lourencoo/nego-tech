# Hero Name Typing Animation Design

## Goal

Animate “Lucas Lourenço” in the homepage hero as if it were typed once when the page loads.

## Interaction

- Reveal the name character by character in approximately 1.4 seconds.
- Show a thick green insertion caret while the name is being typed.
- Keep the caret blinking continuously after the animation finishes.
- Run the animation only once; do not erase or restart the name.
- Keep the name's final layout space stable so surrounding hero content does not shift.

## Implementation

Use a CSS-only animation on the existing hero heading. Add a dedicated class to the heading so the effect does not apply to other headings. The typing reveal uses a stepped animation sized to the 14 visible characters in “Lucas Lourenço”; a decorative element provides a thick insertion caret that moves with the reveal and then blinks in place.

When `prefers-reduced-motion: reduce` is active, disable both animations and display the complete name immediately without a caret.

## Scope

Do not change the hero copy, typography, colors, spacing, avatar, buttons, or responsive layout. The animation applies only to the homepage name.

## Verification

Extend the portfolio contract test to require the dedicated heading class, stepped one-shot animation, persistent blinking caret, and reduced-motion override. Run the contract tests, lint, TypeScript checking, and the production build.
