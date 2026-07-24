# Editorial Title Gradient Design

## Goal

Apply a green-to-purple text gradient to the primary editorial titles on About
and Uses.

## Scope

The gradient applies only to:

- `Hey, I’m Lucas Lourenço.` / its Portuguese equivalent
- `Tools. Apps. Gear.` / its Portuguese equivalent

Career, category, navigation, Contact, and home hero headings remain unchanged.

## Visual Treatment

The gradient runs horizontally from the existing lime-green accent to a soft
purple. Text keeps `var(--text)` as its fallback color, then uses a clipped
background gradient with transparent text fill.

The two titles share one reusable CSS declaration so their color treatment
stays identical.

## Validation

Tests verify that both selectors receive the shared gradient and that the
existing accent variable is used. Lint, TypeScript, and production build must
continue to pass.
