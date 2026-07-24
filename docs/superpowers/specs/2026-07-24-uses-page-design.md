# Uses Page Design

## Goal

Add a bilingual editorial Uses page inspired by Zeno Rocha's content structure,
using Lucas Lourenço's real setup and tools. Add GitHub to the Contact page.

## Routes and Navigation

Add `/{lang}/uses` for English and Portuguese. The global menu becomes About,
Uses, and Contact. All destinations remain Next.js `Link` components and share
the existing sliding indicator.

The locale switcher preserves `/uses`. The sitemap adds `/en/uses` and
`/pt/uses`.

## Page Layout

Uses follows the same centered 800px editorial column as About:

1. Localized title: `Tools. Apps. Gear.` / `Ferramentas. Apps. Equipamentos.`
2. A short introduction describing the page as a living list.
3. Four vertical categories.
4. Items presented as simple editorial lines with linked names and short,
   natural comments.

There are no cards, product images, affiliate language, prices, or promotional
claims.

## Content

### Desk / Setup

- MacBook Pro 14-inch with M5 and 16GB RAM
- AOC 144Hz monitor
- Logitech M190 mouse
- Gaming chair
- Redragon Zeus X over-ear headset

### Coding / Desenvolvimento

- Visual Studio Code
- Min Dark
- JetBrains Mono
- iTerm2
- Fish shell

### Apps / Aplicativos

- Discord
- Google Workspace
- Notion
- Figma
- Pencil

### Services & AI / Serviços e IA

- GitHub
- Vercel
- Docker
- ChatGPT
- Claude
- Codex
- NotebookLM

Each locale receives concise original comments explaining how the item fits
Lucas's workflow. External links use official product or project pages, open in
a new tab, and include safe `rel` attributes.

## Data Model

Add typed `UseCategory` and `UseItem` structures to the centralized portfolio
content. Each item includes `name`, `description`, and optional `href`.

Localized page labels include title, introduction, and category names. English
and Portuguese item descriptions live beside their respective locale content.

## Contact

Contact displays only three links: LinkedIn, GitHub, and Email. GitHub uses the
existing profile URL and matches the current large-link visual treatment.

## SEO and Accessibility

Uses receives localized route metadata, canonical URLs, language alternates,
Open Graph metadata, and sitemap entries. The page uses one `h1`, category
`h2` headings, semantic lists, descriptive external-link labels, visible focus
states, and the existing reduced-motion navigation behavior.

## Validation

Contract tests verify localized Uses content, the three-item menu, static route
generation, sitemap inclusion, official links, and GitHub in Contact. Tests,
lint, TypeScript, production build, and desktop/mobile layouts must pass.
