# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clean bilingual Projects page that presents four featured projects and a curated archive of public products and client work.

**Architecture:** Keep the project catalogue as typed, localized static content in `src/content/portfolio.ts`, render it through a focused `ProjectsPage` component, and expose it through native App Router routes. Extend the existing shared shell, metadata helper, sitemap, and contract tests without adding dependencies or runtime GitHub requests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, CSS Modules, Node test runner.

## Global Constraints

- Routes are exactly `/en/projects` and `/pt/projects`.
- The gradient titles are exactly `Build. Ship. Repeat.` and `Criar. Publicar. Evoluir.`.
- Featured projects are exactly Fast Copy, Upload AI, Cor de Verano, and Fazendas do Brasil.
- Archive groups are exactly Products & Open Source / Produtos e Open Source and Client Work / Trabalhos para clientes.
- Project data is static and localized; no GitHub API request runs in the browser or during a Next.js request.
- Do not add screenshots, logo walls, technology badges, filters, search, star counts, repository statistics, detail pages, or a homepage projects section.
- External links open in a new tab with `rel="noreferrer"`.
- Optional motion must respect `prefers-reduced-motion`.
- Do not add a new package.

---

## File Structure

- Modify `src/content/portfolio.ts`: define project types and both localized catalogues.
- Create `src/components/Portfolio/ProjectsPage.tsx`: render the editorial Projects page.
- Modify `src/components/Portfolio/styles.module.css`: add isolated Projects layout, responsive, focus, hover, and reduced-motion styles.
- Create `src/app/(portfolio)/[lang]/projects/page.tsx`: expose the localized App Router page and metadata.
- Modify `src/components/Portfolio/types.ts`: add `projects` to the shared page slug.
- Modify `src/components/Portfolio/SiteShell.tsx`: add Projects to the sliding navigation.
- Modify `src/lib/portfolio-metadata.ts`: add localized Projects metadata.
- Modify `src/app/sitemap.ts`: publish both Projects URLs.
- Modify `tests/portfolio-contract.test.mjs`: cover content, rendering, routing, navigation, metadata, sitemap, and the static-data constraint.

### Task 1: Add the typed bilingual project catalogue

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/content/portfolio.ts`

**Interfaces:**
- Produces: `ProjectItem`, `ProjectGroup`, and `ProjectCatalogue` types.
- Produces: `PortfolioContent.projects: ProjectCatalogue`.
- `ProjectCatalogue` has `title`, `introduction`, `featuredTitle`, `archiveTitle`, `featured`, and `groups`.
- `ProjectItem` has `name`, `description`, `category`, and `href`, all strings.

- [ ] **Step 1: Write the failing content contract test**

Append this test to `tests/portfolio-contract.test.mjs`:

```js
test("projects content is typed, localized, and deliberately curated", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /export type ProjectItem/);
  assert.match(content, /export type ProjectGroup/);
  assert.match(content, /export type ProjectCatalogue/);
  assert.match(content, /projects: ProjectCatalogue/);
  assert.match(content, /Build\. Ship\. Repeat\./);
  assert.match(content, /Criar\. Publicar\. Evoluir\./);
  assert.match(content, /featuredTitle: "Featured Projects"/);
  assert.match(content, /featuredTitle: "Projetos em destaque"/);
  assert.match(content, /archiveTitle: "Selected Projects"/);
  assert.match(content, /archiveTitle: "Projetos selecionados"/);

  for (const project of [
    "Fast Copy",
    "Upload AI",
    "Cor de Verano",
    "Fazendas do Brasil",
    "Ignite Call",
    "Nego Tech",
    "Ecoleta",
    "Dual Serviços",
    "AGF Garantidora",
    "Juventude UP",
    "Viamaq",
    "IEDUCAA",
    "Israel Profético",
    "Missão Paraguai",
  ]) {
    assert.match(content, new RegExp(project));
  }

  assert.doesNotMatch(
    content,
    /api\.github\.com|fetch\(["'`]https:\/\/github|stargazers_count/,
  );
  assert.doesNotMatch(
    content,
    /teste-fullstack-dfcom|desafio-nest|pdf-creator-node|Clipy/,
  );
});
```

- [ ] **Step 2: Run the content test and verify it fails**

Run:

```bash
npm test -- --test-name-pattern="projects content"
```

Expected: FAIL because the project types and `PortfolioContent.projects` do not exist.

- [ ] **Step 3: Add the project types and catalogue property**

Add after `UseCategory` in `src/content/portfolio.ts`:

```ts
export type ProjectItem = {
  name: string;
  description: string;
  category: string;
  href: string;
};

export type ProjectGroup = {
  title: string;
  items: ProjectItem[];
};

export type ProjectCatalogue = {
  title: string;
  introduction: string;
  featuredTitle: string;
  archiveTitle: string;
  featured: ProjectItem[];
  groups: ProjectGroup[];
};
```

Add this property to `PortfolioContent`:

```ts
projects: ProjectCatalogue;
```

- [ ] **Step 4: Add the exact English catalogue**

Add `projects` to the English content object before `socialLinks`:

```ts
projects: {
  title: "Build. Ship. Repeat.",
  introduction:
    "A selection of products, open-source experiments, and client work I have brought to life.",
  featuredTitle: "Featured Projects",
  archiveTitle: "Selected Projects",
  featured: [
    {
      name: "Fast Copy",
      description: "A minimal browser extension for copying the current URL with a shortcut.",
      category: "Browser extension",
      href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
    },
    {
      name: "Upload AI",
      description: "An AI workflow that transcribes videos and turns them into useful content.",
      category: "AI product",
      href: "https://github.com/lucas-lourencoo/upload-ai-web",
    },
    {
      name: "Cor de Verano",
      description: "A polished digital storefront for a Brazilian fashion brand.",
      category: "Client work",
      href: "https://www.cordeverano.com.br/",
    },
    {
      name: "Fazendas do Brasil",
      description: "A digital experience built for discovering rural properties across Brazil.",
      category: "Client work",
      href: "https://www.fazendasdobrasil.com.br/",
    },
  ],
  groups: [
    {
      title: "Products & Open Source",
      items: [
        {
          name: "Fast Copy",
          description: "Minimal browser extension for copying URLs faster.",
          category: "Browser extension",
          href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
        },
        {
          name: "Upload AI",
          description: "AI-assisted video transcription and content generation.",
          category: "AI product",
          href: "https://github.com/lucas-lourencoo/upload-ai-web",
        },
        {
          name: "Ignite Call",
          description: "A scheduling experience for sharing availability and booking time.",
          category: "Web app",
          href: "https://ignite-call-chi-eight.vercel.app",
        },
        {
          name: "Nego Tech",
          description: "The open-source code behind this portfolio.",
          category: "Portfolio",
          href: "https://github.com/lucas-lourencoo/nego-tech",
        },
        {
          name: "Ecoleta",
          description: "A platform connecting people with recyclable waste collection points.",
          category: "Web app",
          href: "https://github.com/lucas-lourencoo/nlw-ecoleta",
        },
      ],
    },
    {
      title: "Client Work",
      items: [
        { name: "Cor de Verano", description: "Fashion e-commerce experience.", category: "Commerce", href: "https://www.cordeverano.com.br/" },
        { name: "Dual Serviços", description: "Institutional service company website.", category: "Website", href: "https://www.dualservicosterceirizados.com.br/" },
        { name: "AGF Garantidora", description: "Institutional platform for financial guarantees.", category: "Website", href: "https://www.agfgarantidora.com.br/" },
        { name: "Juventude UP", description: "Digital home for a youth community.", category: "Community", href: "https://www.juventudeup.com.br/" },
        { name: "Viamaq", description: "Product and company website for agricultural machinery.", category: "Website", href: "https://viamaqtratores.com.br/" },
        { name: "Fazendas do Brasil", description: "Rural property discovery experience.", category: "Marketplace", href: "https://www.fazendasdobrasil.com.br/" },
        { name: "IEDUCAA", description: "Digital presence for an education initiative.", category: "Education", href: "https://www.ieducaa.org/" },
        { name: "Israel Profético", description: "Content platform for a faith-based project.", category: "Content", href: "https://www.israelprofetico.com.br/" },
        { name: "Missão Paraguai", description: "Mission project website and information hub.", category: "Nonprofit", href: "https://missaoparaguai.com.br/" },
      ],
    },
  ],
},
```

- [ ] **Step 5: Add the exact Portuguese catalogue**

Add the same URLs and project names to the Portuguese content object, using:

```ts
projects: {
  title: "Criar. Publicar. Evoluir.",
  introduction:
    "Uma seleção de produtos, experimentos open source e trabalhos para clientes que tirei do papel.",
  featuredTitle: "Projetos em destaque",
  archiveTitle: "Projetos selecionados",
  featured: [
    {
      name: "Fast Copy",
      description: "Uma extensão minimalista para copiar a URL atual usando um atalho.",
      category: "Extensão de navegador",
      href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
    },
    {
      name: "Upload AI",
      description: "Um fluxo com IA que transcreve vídeos e os transforma em conteúdo útil.",
      category: "Produto com IA",
      href: "https://github.com/lucas-lourencoo/upload-ai-web",
    },
    {
      name: "Cor de Verano",
      description: "Uma vitrine digital refinada para uma marca brasileira de moda.",
      category: "Trabalho para cliente",
      href: "https://www.cordeverano.com.br/",
    },
    {
      name: "Fazendas do Brasil",
      description: "Uma experiência digital para descobrir propriedades rurais pelo Brasil.",
      category: "Trabalho para cliente",
      href: "https://www.fazendasdobrasil.com.br/",
    },
  ],
  groups: [
    {
      title: "Produtos e Open Source",
      items: [
        { name: "Fast Copy", description: "Extensão minimalista para copiar URLs mais rápido.", category: "Extensão", href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn" },
        { name: "Upload AI", description: "Transcrição de vídeo e geração de conteúdo assistidas por IA.", category: "Produto com IA", href: "https://github.com/lucas-lourencoo/upload-ai-web" },
        { name: "Ignite Call", description: "Experiência de agenda para compartilhar horários e marcar conversas.", category: "Aplicação web", href: "https://ignite-call-chi-eight.vercel.app" },
        { name: "Nego Tech", description: "O código open source por trás deste portfólio.", category: "Portfólio", href: "https://github.com/lucas-lourencoo/nego-tech" },
        { name: "Ecoleta", description: "Plataforma que conecta pessoas a pontos de coleta de recicláveis.", category: "Aplicação web", href: "https://github.com/lucas-lourencoo/nlw-ecoleta" },
      ],
    },
    {
      title: "Trabalhos para clientes",
      items: [
        { name: "Cor de Verano", description: "Experiência de e-commerce de moda.", category: "Comércio", href: "https://www.cordeverano.com.br/" },
        { name: "Dual Serviços", description: "Site institucional para uma empresa de serviços.", category: "Site", href: "https://www.dualservicosterceirizados.com.br/" },
        { name: "AGF Garantidora", description: "Plataforma institucional para garantias financeiras.", category: "Site", href: "https://www.agfgarantidora.com.br/" },
        { name: "Juventude UP", description: "Casa digital para uma comunidade de jovens.", category: "Comunidade", href: "https://www.juventudeup.com.br/" },
        { name: "Viamaq", description: "Site de produtos e da empresa de máquinas agrícolas.", category: "Site", href: "https://viamaqtratores.com.br/" },
        { name: "Fazendas do Brasil", description: "Experiência para descoberta de propriedades rurais.", category: "Marketplace", href: "https://www.fazendasdobrasil.com.br/" },
        { name: "IEDUCAA", description: "Presença digital para uma iniciativa de educação.", category: "Educação", href: "https://www.ieducaa.org/" },
        { name: "Israel Profético", description: "Plataforma de conteúdo para um projeto cristão.", category: "Conteúdo", href: "https://www.israelprofetico.com.br/" },
        { name: "Missão Paraguai", description: "Site e central de informações de um projeto missionário.", category: "Terceiro setor", href: "https://missaoparaguai.com.br/" },
      ],
    },
  ],
},
```

- [ ] **Step 6: Run the content test and typecheck**

Run:

```bash
npm test -- --test-name-pattern="projects content"
npm run typecheck
```

Expected: the Projects content test passes and TypeScript exits with code 0.

- [ ] **Step 7: Commit the catalogue**

```bash
git add src/content/portfolio.ts tests/portfolio-contract.test.mjs
git commit -m "feat: add curated projects content"
```

### Task 2: Render the Projects route and responsive editorial layout

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Create: `src/components/Portfolio/ProjectsPage.tsx`
- Create: `src/app/(portfolio)/[lang]/projects/page.tsx`
- Modify: `src/components/Portfolio/styles.module.css`
- Modify: `src/components/Portfolio/types.ts`
- Modify: `src/lib/portfolio-metadata.ts`

**Interfaces:**
- Consumes: `PortfolioContent.projects: ProjectCatalogue` from Task 1.
- Produces: `ProjectsPage({ content }: { content: PortfolioContent })`.
- Produces: localized static route params and metadata call for page slug `projects`.
- Extends: `PageSlug` and the localized metadata record with `projects`.

- [ ] **Step 1: Write the failing route and component contract test**

Append:

```js
test("the projects route renders an accessible editorial catalogue", async () => {
  const route = await read("src/app/(portfolio)/[lang]/projects/page.tsx");
  const page = await read("src/components/Portfolio/ProjectsPage.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(route, /createPortfolioMetadata\(lang, "projects"\)/);
  assert.match(route, /<ProjectsPage content=\{getPortfolioContent\(lang\)\} \/>/);
  assert.match(page, /activePage="projects"/);
  assert.match(page, /content\.projects\.featured/);
  assert.match(page, /content\.projects\.groups/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(page, /ArrowUpRight/);
  assert.match(styles, /\.projectsPage/);
  assert.match(styles, /\.featuredProjects/);
  assert.match(styles, /\.projectArchive/);
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.featuredProject/s,
  );
});
```

- [ ] **Step 2: Run the route test and verify it fails**

Run:

```bash
npm test -- --test-name-pattern="projects route"
```

Expected: FAIL because the route and `ProjectsPage.tsx` do not exist.

- [ ] **Step 3: Create the Projects page component**

Create `src/components/Portfolio/ProjectsPage.tsx`:

```tsx
import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

export default function ProjectsPage({
  content,
}: {
  content: PortfolioContent;
}) {
  const { projects } = content;

  return (
    <SiteShell content={content} activePage="projects">
      <article className={styles.projectsPage}>
        <header className={styles.projectsHeader}>
          <h1>{projects.title}</h1>
          <p>{projects.introduction}</p>
        </header>

        <section className={styles.featuredSection}>
          <h2>{projects.featuredTitle}</h2>
          <div className={styles.featuredProjects}>
            {projects.featured.map((project) => (
              <a
                className={styles.featuredProject}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
                aria-label={`${project.name} — ${project.category}`}
              >
                <span>{project.category}</span>
                <strong>{project.name}</strong>
                <p>{project.description}</p>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section className={styles.archiveSection}>
          <h2>{projects.archiveTitle}</h2>
          <div className={styles.projectArchive}>
            {projects.groups.map((group) => (
              <section className={styles.projectGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((project) => (
                    <li key={project.name}>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>
                          <strong>{project.name}</strong>
                          <small>{project.description}</small>
                        </span>
                        <span className={styles.projectMeta}>
                          {project.category}
                          <ArrowUpRight />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
```

- [ ] **Step 4: Create the localized App Router page**

Create `src/app/(portfolio)/[lang]/projects/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsPage from "@/components/Portfolio/ProjectsPage";
import {
  getPortfolioContent,
  isLocale,
  locales,
} from "@/content/portfolio";
import { createPortfolioMetadata } from "@/lib/portfolio-metadata";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? createPortfolioMetadata(lang, "projects") : {};
}

export default async function ProjectsRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ProjectsPage content={getPortfolioContent(lang)} />;
}
```

- [ ] **Step 5: Add the Projects slug and localized metadata**

Change `src/components/Portfolio/types.ts` to:

```ts
export type PageSlug =
  | "home"
  | "about"
  | "projects"
  | "uses"
  | "contact";
```

Add to the English metadata object in `src/lib/portfolio-metadata.ts`:

```ts
projects: {
  title: "Projects — Lucas Lourenço",
  description:
    "Selected products, open-source projects, and client work by Lucas Lourenço.",
},
```

Add to the Portuguese metadata object:

```ts
projects: {
  title: "Projetos — Lucas Lourenço",
  description:
    "Uma seleção de produtos, projetos open source e trabalhos para clientes de Lucas Lourenço.",
},
```

- [ ] **Step 6: Add the isolated Projects styles**

Append these rules before the existing responsive media queries in
`src/components/Portfolio/styles.module.css`:

```css
.projectsPage {
  width: min(100% - 48px, 1040px);
  margin: 0 auto;
  padding: 148px 0 96px;
}

.projectsHeader {
  max-width: 760px;
  margin-bottom: 88px;
}

.projectsHeader h1 {
  margin: 0;
  color: transparent;
  font-size: clamp(46px, 7vw, 82px);
  line-height: 0.98;
  letter-spacing: -0.065em;
  background: linear-gradient(35deg, var(--accent) 8%, #b46cff 88%);
  background-clip: text;
  -webkit-background-clip: text;
}

.projectsHeader p {
  max-width: 650px;
  margin: 30px 0 0;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.75;
}

.featuredSection,
.archiveSection {
  margin-top: 80px;
}

.featuredSection > h2,
.archiveSection > h2 {
  margin: 0 0 28px;
  color: var(--text);
  font-size: 24px;
  letter-spacing: -0.035em;
}

.featuredProjects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.featuredProject {
  position: relative;
  min-height: 230px;
  padding: 28px;
  overflow: hidden;
  color: var(--text);
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.025);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.featuredProject:hover,
.featuredProject:focus-visible {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
  background: rgba(255, 255, 255, 0.045);
}

.featuredProject > span {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.featuredProject strong {
  display: block;
  margin-top: 46px;
  font-size: 28px;
  letter-spacing: -0.04em;
}

.featuredProject p {
  max-width: 390px;
  margin: 12px 36px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.featuredProject > svg {
  position: absolute;
  right: 26px;
  bottom: 26px;
}

.projectArchive {
  display: grid;
  gap: 64px;
}

.projectGroup h3 {
  margin: 0 0 12px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.projectGroup ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.projectGroup li {
  border-bottom: 1px solid var(--line);
}

.projectGroup li:first-child {
  border-top: 1px solid var(--line);
}

.projectGroup a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-height: 94px;
  padding: 18px 2px;
  color: var(--text);
  text-decoration: none;
}

.projectGroup a > span:first-child {
  display: grid;
  gap: 5px;
}

.projectGroup strong {
  font-size: 18px;
}

.projectGroup small {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.projectMeta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transition: color 160ms ease;
}

.projectGroup a:hover .projectMeta,
.projectGroup a:focus-visible .projectMeta {
  color: var(--accent);
}

@media (max-width: 720px) {
  .projectsPage {
    width: min(100% - 32px, 1040px);
    padding: 120px 0 72px;
  }

  .projectsHeader {
    margin-bottom: 64px;
  }

  .projectsHeader h1 {
    font-size: clamp(42px, 14vw, 62px);
  }

  .featuredProjects {
    grid-template-columns: 1fr;
  }

  .featuredProject {
    min-height: 210px;
  }

  .projectGroup a {
    align-items: flex-start;
  }

  .projectMeta {
    font-size: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .featuredProject,
  .projectMeta {
    transition: none;
  }

  .featuredProject:hover,
  .featuredProject:focus-visible {
    transform: none;
  }
}
```

If the file already has matching media queries, merge these selectors into
those blocks rather than duplicating identical query declarations.

- [ ] **Step 7: Run the route test, lint, and typecheck**

Run:

```bash
npm test -- --test-name-pattern="projects route"
npm run lint
npm run typecheck
```

Expected: the Projects route test passes; lint and typecheck exit with code 0.

- [ ] **Step 8: Commit the rendered page**

```bash
git add 'src/app/(portfolio)/[lang]/projects/page.tsx' \
  src/components/Portfolio/ProjectsPage.tsx \
  src/components/Portfolio/styles.module.css \
  src/components/Portfolio/types.ts \
  src/lib/portfolio-metadata.ts \
  tests/portfolio-contract.test.mjs
git commit -m "feat: render projects catalogue"
```

### Task 3: Integrate Projects into navigation, metadata, and sitemap

**Files:**
- Modify: `tests/portfolio-contract.test.mjs`
- Modify: `src/components/Portfolio/SiteShell.tsx`
- Modify: `src/content/portfolio.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Extends: `PortfolioContent.nav` with `projects: string`.
- Extends: sitemap pages with `"/projects"`.

- [ ] **Step 1: Write the failing integration contract test**

Append:

```js
test("projects is integrated into localized navigation and discovery", async () => {
  const types = await read("src/components/Portfolio/types.ts");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const content = await read("src/content/portfolio.ts");
  const metadata = await read("src/lib/portfolio-metadata.ts");
  const sitemap = await read("src/app/sitemap.ts");

  assert.match(types, /"home" \| "about" \| "projects" \| "uses" \| "contact"/);
  assert.match(shell, /const pages = \["about", "projects", "uses", "contact"\]/);
  assert.match(content, /projects: "Projects"/);
  assert.match(content, /projects: "Projetos"/);
  assert.match(metadata, /Projects — Lucas Lourenço/);
  assert.match(metadata, /Projetos — Lucas Lourenço/);
  assert.match(sitemap, /"\/projects"/);
});
```

- [ ] **Step 2: Run the integration test and verify it fails**

Run:

```bash
npm test -- --test-name-pattern="projects is integrated"
```

Expected: FAIL because navigation and the sitemap do not yet include Projects.

- [ ] **Step 3: Extend the shared navigation**

In `src/components/Portfolio/SiteShell.tsx`, change:

```ts
const pages = ["about", "uses", "contact"] as const;
```

to:

```ts
const pages = ["about", "projects", "uses", "contact"] as const;
```

In `PortfolioContent`, change the `nav` type to:

```ts
nav: { about: string; projects: string; uses: string; contact: string };
```

Add `projects: "Projects"` to English navigation and
`projects: "Projetos"` to Portuguese navigation between About and Uses.

- [ ] **Step 4: Update the existing navigation assertion**

In the existing test named
`the shared navigation uses localized routes and marks the active page`, replace:

```js
assert.match(shell, /const pages = \["about", "uses", "contact"\]/);
```

with:

```js
assert.match(
  shell,
  /const pages = \["about", "projects", "uses", "contact"\]/,
);
```

- [ ] **Step 5: Add Projects to the sitemap**

Change the page list in `src/app/sitemap.ts` to:

```ts
const pages = ["", "/about", "/projects", "/uses", "/contact"] as const;
```

- [ ] **Step 6: Run integration tests and static checks**

Run:

```bash
npm test -- --test-name-pattern="projects is integrated|projects route"
npm run lint
npm run typecheck
```

Expected: both Projects tests pass; lint and typecheck exit with code 0.

- [ ] **Step 7: Commit the integration**

```bash
git add src/components/Portfolio/SiteShell.tsx \
  src/content/portfolio.ts \
  src/app/sitemap.ts \
  tests/portfolio-contract.test.mjs
git commit -m "feat: integrate projects navigation"
```

### Task 4: Validate production behavior and visual quality

**Files:**
- Modify only if validation exposes a Projects-specific defect:
  `src/components/Portfolio/ProjectsPage.tsx`
- Modify only if validation exposes a Projects-specific defect:
  `src/components/Portfolio/styles.module.css`
- Modify only if validation exposes a contract gap:
  `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Consumes: completed Projects page from Tasks 1–3.
- Produces: a production-build-verified responsive page with working navigation
  and external links.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit with code 0, and the build output includes static
routes for `/[lang]/projects`.

- [ ] **Step 2: Start the development server**

Run:

```bash
npm run dev
```

Expected: Next.js reports a ready local URL with no compilation error.

- [ ] **Step 3: Inspect both locales at desktop and mobile widths**

Using Playwright, open:

- `http://localhost:3000/en/projects`
- `http://localhost:3000/pt/projects`

Check at `1440 × 1000` and `390 × 844`:

- Gradient title is not clipped.
- Four featured projects render in two columns on desktop and one on mobile.
- Archive groups and all selected projects are readable.
- Header navigation indicator moves to and restores Projects correctly.
- Language switching preserves `/projects`.
- Keyboard focus is visible on every project link.
- External project links open a new tab.
- No horizontal overflow appears.

- [ ] **Step 4: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`, reload `/en/projects`, and verify that
featured cards do not translate on hover while all content remains visible.

- [ ] **Step 5: Fix only defects found by validation and rerun checks**

For any concrete defect, first add the smallest relevant assertion to
`tests/portfolio-contract.test.mjs`, verify it fails, patch only the
Projects-specific component or style, then run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: the new regression assertion and full suite pass.

- [ ] **Step 6: Commit validation fixes if any files changed**

If validation required changes:

```bash
git add src/components/Portfolio/ProjectsPage.tsx \
  src/components/Portfolio/styles.module.css \
  tests/portfolio-contract.test.mjs
git commit -m "fix: polish projects page"
```

If no files changed, do not create an empty commit.
