# Repository Guidelines

## Project Structure & Module Organization

This repository is a bilingual portfolio built with Next.js App Router.

- `src/app/(portfolio)/[lang]/`: localized routes such as `/en/about` and `/pt/projects`.
- `src/components/Portfolio/`: shared page components, navigation, interactions, icons, and the portfolio CSS Module.
- `src/content/portfolio.ts`: typed English and Portuguese copy and structured content.
- `src/lib/`: shared metadata and supporting utilities.
- `public/`: static images, logos, and favicons.
- `tests/portfolio-contract.test.mjs`: repository-level content, routing, accessibility, and architecture contracts.
- `docs/superpowers/`: approved design specifications and implementation plans.

Keep page-specific rendering in focused components. Reuse `SiteShell` for portfolio routes and avoid duplicating localized content inside JSX.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start the local Next.js development server.
- `npm test`: run all Node contract tests.
- `npm run lint`: check Next.js, React, and TypeScript lint rules.
- `npm run typecheck`: run strict TypeScript validation without emitting files.
- `npm run build`: create and validate the production build.
- `npm run start`: serve an existing production build.

Before handing off changes, run test, lint, typecheck, and build.

## Coding Style & Naming Conventions

Use TypeScript and React functional components with two-space indentation. Follow the existing formatter style: double quotes, semicolons, and trailing commas. Name components and component files in PascalCase (`ProjectsPage.tsx`); use camelCase for functions, variables, and CSS Module classes.

Prefer the `@/` path alias for imports from `src`. Keep content types explicit, preserve strict TypeScript compatibility, and use semantic HTML. External links must include `target="_blank"` and `rel="noreferrer"`.

## Testing Guidelines

Tests use `node:test` with `node:assert/strict`. Add focused contract tests to `tests/*.test.mjs` for new routes, localized content, metadata, or UI guarantees. Use descriptive behavior-oriented test names. No numeric coverage threshold is enforced, but every behavior change should include a regression assertion.

## Commit & Pull Request Guidelines

History uses short Conventional Commit-style subjects, such as `feat: add projects page`, `fix: polish navigation`, and `docs: define projects design`. Keep each commit scoped to one concern.

Pull requests should explain the user-visible change, list verification commands, and link relevant issues. Include desktop and mobile screenshots for visual changes. Do not commit secrets, `.env` files, build output, or unrelated working-tree changes.
