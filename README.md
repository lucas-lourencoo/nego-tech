# Lucas Lourenço — Portfolio

Personal portfolio for Lucas Lourenço, a full-stack software engineer based in
Campo Grande, Brazil.

[View the live website](https://www.negotech.com.br)

## About

The portfolio presents my experience, projects, tools, and contact links through
a bilingual English and Portuguese experience. It is built with the Next.js App
Router and statically generates both locales.

Main routes:

- `/en` and `/pt` — home
- `/[lang]/about` — profile and professional experience
- `/[lang]/projects` — selected products, open-source work, and client projects
- `/[lang]/uses` — hardware, software, and everyday tools
- `/[lang]/contact` — contact links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- Node.js test runner
- ESLint

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

```bash
npm test          # Run contract tests
npm run lint      # Run ESLint
npm run typecheck # Validate TypeScript
npm run build     # Create a production build
npm run start     # Serve the production build
```

Before submitting changes, run test, lint, typecheck, and build.

## Project Structure

```text
src/app/(portfolio)/[lang]/  Localized App Router pages
src/components/Portfolio/   Shared UI and page components
src/content/portfolio.ts     Typed English and Portuguese content
src/lib/                     Metadata and shared utilities
public/                      Images and static assets
tests/                       Content and architecture contract tests
```

See [AGENTS.md](./AGENTS.md) for detailed contribution guidelines.

## License

The source code is available for reference. Personal content, branding, and
images remain the property of Lucas Lourenço.
