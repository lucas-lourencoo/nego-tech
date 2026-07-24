# Projects Page Design

## Objective

Create a bilingual Projects page inspired by the clean editorial hierarchy of
Zeno Rocha's Projects page. The page should combine Lucas Lourenço's strongest
public GitHub projects with selected client work from the previous portfolio,
without becoming an exhaustive repository directory.

## Routes and Navigation

- Add native Next.js routes at `/en/projects` and `/pt/projects`.
- Add `Projects` / `Projetos` to the shared sliding navigation.
- Preserve the existing locale when navigating and switching languages.
- Mark Projects as the active navigation item on its route.
- Add both routes to the sitemap and portfolio metadata.

## Editorial Structure

The page follows three sections:

1. A compact introduction with a diagonal green-to-purple gradient title:
   - English: `Build. Ship. Repeat.`
   - Portuguese: `Criar. Publicar. Evoluir.`
2. A `Featured Projects` / `Projetos em destaque` grid with four projects.
3. A `Selected Projects` / `Projetos selecionados` archive divided into:
   - `Products & Open Source` / `Produtos e Open Source`
   - `Client Work` / `Trabalhos para clientes`

The archive uses categories rather than years because reliable dates are not
available for all legacy client projects. The hierarchy should feel similar to
the reference without presenting invented chronology.

## Curated Content

### Featured Projects

- Fast Copy
- Upload AI
- Cor de Verano
- Fazendas do Brasil

Each featured item contains:

- Name
- Short localized description
- Category label
- External destination
- Subtle external-link affordance

The selection intentionally mixes product/open-source work and shipped client
work.

### Products and Open Source

Use this concise selection from the public GitHub profile:

- Fast Copy
- Upload AI
- Ignite Call
- Nego Tech
- Ecoleta

Exclude:

- Forks
- Basic course exercises
- Technical hiring tests
- Repositories without enough context or portfolio value
- Near-duplicate learning projects

### Client Work

Curate from the previous portfolio's shipped work:

- Cor de Verano
- Dual Serviços
- AGF Garantidora
- Juventude UP
- Viamaq
- Fazendas do Brasil
- IEDUCAA
- Israel Profético
- Missão Paraguai

Only working, relevant destinations should be published. A project with no
suitable public destination is omitted rather than shown as disabled.

## Data Model and Rendering

- Store all Projects copy and project records in `src/content/portfolio.ts`.
- Keep content typed and localized for English and Portuguese.
- Render from static curated content; do not call the GitHub API at request time
  or in the browser.
- Prefer a product/site URL when a useful live destination exists.
- Otherwise link to the public GitHub repository.
- Open external destinations safely in a new tab.

The static model keeps the page fast, deterministic, and editorially controlled.
GitHub is a source for the initial curation, not a runtime dependency.

## Visual Design

- Reuse the existing page width, dark background, typography, custom cursor,
  glassmorphic header, and footer.
- Match the restrained editorial spacing and hierarchy of the Zeno Rocha
  reference.
- Do not use large screenshots, logo walls, technology badges, filters, search,
  star counts, or repository statistics.
- Featured projects use clean blocks with restrained borders or surface
  contrast, concise copy, and generous but not oversized spacing.
- Archive rows emphasize project names and short descriptions.
- Hover behavior is limited to a subtle color, border, arrow, or vertical
  movement change.
- On mobile, featured items stack into one column and archive links retain
  comfortable touch targets.
- All optional motion respects `prefers-reduced-motion`.

## Metadata and Accessibility

- Add localized page title and description metadata.
- Add locale alternates and canonical URLs using the existing metadata helper.
- Include `/projects` for both locales in the sitemap.
- Use semantic headings, sections, lists, and links.
- Ensure visible keyboard focus and meaningful accessible link names.
- Preserve sufficient contrast for descriptions, category labels, and hover
  states.

## Validation

Add or update contract tests to verify:

- The Projects slug is supported by the shared page types and navigation.
- Both localized routes exist and use native Next.js links.
- Projects content is typed and translated.
- The four featured projects are present.
- The curated archive contains both product/open-source and client-work groups.
- No browser or server runtime GitHub API integration is introduced.
- Metadata and sitemap include the Projects route.
- Navigation preserves locale and marks Projects active.

Run the existing test, lint, typecheck, and production build commands before
completion.

## Out of Scope

- Individual project detail pages
- Automated GitHub synchronization
- Repository filters or search
- CMS integration
- Screenshots or image galleries
- Reintroducing a projects section on the homepage
