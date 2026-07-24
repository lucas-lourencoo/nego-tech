# Wordmark and Favicon Design

## Objective

Strengthen the `<LL/>` identity by aligning the header wordmark and browser favicon.

## Header

- Render the wordmark as `<LL/>` and move it `10px` to the right.
- Set the wordmark to `21px`.
- Preserve its typography, colors, link, and responsive behavior.
- Do not move the centered navigation or language switcher.

## Favicon

- Replace the legacy favicon with a square `<LL/>` monogram.
- Use a near-black background matching the portfolio.
- Render `LL` in off-white and `<`, `/`, and `>` in the green accent.
- Keep the composition bold and simple enough to remain recognizable at 16px.
- Provide the favicon through the existing Next.js App Router metadata flow.

## Validation

- Confirm the wordmark offset at desktop and mobile widths.
- Confirm the computed wordmark size is `21px`.
- Confirm the favicon is served by the application.
- Run tests, lint, typecheck, and build.

## Out of Scope

- Changing the LL typography or header height
- Moving the navigation or language control
- Creating a broader logo system
