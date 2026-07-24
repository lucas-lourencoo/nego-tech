# Projects Scale Alignment Design

## Objective

Bring the Projects page back into the portfolio design system by matching the
visual scale and content width used by the Uses page.

## Changes

- Change the Projects content width from `1040px` to `800px`.
- Match the Uses page desktop title scale: `clamp(36px, 3.6vw, 48px)`.
- Match the Uses introduction scale: `16px` text with the same line height and
  top spacing.
- Reduce the header bottom spacing from `88px` to the Uses page rhythm.
- Keep featured projects in two columns on desktop and one column on mobile.
- Reduce featured-card minimum height, padding, project-name size, and internal
  spacing proportionally.
- Reduce section spacing so the complete page feels consistent with About and
  Uses rather than like a separate landing page.
- Preserve the green-to-purple diagonal title gradient, content, links,
  navigation, accessibility, localization, and reduced-motion behavior.

## Responsive Behavior

- Use the same mobile content width as Uses: `min(calc(100% - 40px), 800px)`.
- Preserve the existing mobile title scale and single-column featured grid.
- Prevent horizontal overflow and keep comfortable touch targets.

## Validation

- Update the Projects contract test to assert the `800px` content width and
  `48px` title ceiling.
- Run tests, lint, typecheck, and production build.
- Inspect desktop and mobile Projects pages in both languages.

## Out of Scope

- Changing project selection or copy
- Removing featured cards
- Changing navigation or metadata
- Redesigning About or Uses
