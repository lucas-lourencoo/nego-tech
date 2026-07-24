# Portfolio Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single scrolling portfolio with a full-screen home and localized About, Experience, and Contact pages.

**Architecture:** A locale-aware shared shell renders the fixed header, real route navigation, structured data, and footer. Small page components render the hero and each interior page from the existing typed content, while Next.js route files statically generate `en` and `pt` variants and provide page-specific metadata.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Node test runner.

## Global Constraints

- The home page contains only the fixed header, full-screen hero, circular avatar, LinkedIn action, social links, and localized About link.
- Routes are `/{lang}`, `/{lang}/about`, `/{lang}/experience`, and `/{lang}/contact` for `en` and `pt`.
- The root route continues to redirect to `/en`.
- Navigation uses real localized URLs and `aria-current="page"`.
- The language selector preserves the current page.
- The résumé and commercial-project content remain absent.
- The existing dark theme, green accent, `LL/` wordmark, compact desktop scale, and responsive behavior remain intact.

---

### Task 1: Extend localized content for page navigation

**Files:**
- Modify: `src/content/portfolio.ts`
- Test: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Produces: `PageSlug = "home" | "about" | "experience" | "contact"`
- Produces: `PortfolioContent.hero.aboutCta: string`
- Produces: localized labels already consumed by interior pages

- [ ] **Step 1: Write the failing content contract**

Add:

```js
test("the hero exposes a localized link to the about page", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /aboutCta: string/);
  assert.match(content, /aboutCta: "More about me"/);
  assert.match(content, /aboutCta: "Saiba mais"/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="localized link" tests/portfolio-contract.test.mjs`

Expected: FAIL because `aboutCta` is not defined.

- [ ] **Step 3: Add the localized field**

Extend the hero type:

```ts
hero: {
  kicker: string;
  title: string;
  description: string;
  primaryCta: string;
  aboutCta: string;
};
```

Add `aboutCta: "More about me"` to English and
`aboutCta: "Saiba mais"` to Portuguese.

- [ ] **Step 4: Run the focused test and verify success**

Run: `node --test --test-name-pattern="localized link" tests/portfolio-contract.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/portfolio.ts tests/portfolio-contract.test.mjs
git commit -m "feat: add localized about call to action"
```

### Task 2: Create the shared localized site shell

**Files:**
- Create: `src/components/Portfolio/SiteShell.tsx`
- Create: `src/components/Portfolio/types.ts`
- Modify: `src/components/Portfolio/styles.module.css`
- Test: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Produces: `PageSlug` type
- Produces: `SiteShell({ content, activePage, children, showFooter })`
- Consumes: `PortfolioContent`

- [ ] **Step 1: Write the failing navigation contract**

Add:

```js
test("the shared navigation uses localized routes and marks the active page", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");

  assert.match(shell, /aria-current/);
  assert.match(shell, /`\\/\u0024\\{content\\.locale\\}\\/experience`/);
  assert.match(shell, /`\\/\u0024\\{content\\.locale\\}\\/about`/);
  assert.match(shell, /`\\/\u0024\\{content\\.locale\\}\\/contact`/);
  assert.match(shell, /activePage/);
  assert.match(shell, /alternateLocale/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="shared navigation" tests/portfolio-contract.test.mjs`

Expected: FAIL because `SiteShell.tsx` does not exist.

- [ ] **Step 3: Define the page identifier**

Create `types.ts`:

```ts
export type PageSlug = "home" | "about" | "experience" | "contact";
```

- [ ] **Step 4: Implement the shell**

Create `SiteShell.tsx` with:

```tsx
import type { ReactNode } from "react";
import type { PortfolioContent } from "@/content/portfolio";
import type { PageSlug } from "./types";
import styles from "./styles.module.css";

type Props = {
  content: PortfolioContent;
  activePage: PageSlug;
  children: ReactNode;
  showFooter?: boolean;
};

const pages = ["experience", "about", "contact"] as const;

export default function SiteShell({
  content,
  activePage,
  children,
  showFooter = true,
}: Props) {
  const alternateLocale = content.locale === "en" ? "pt" : "en";
  const suffix = activePage === "home" ? "" : `/${activePage}`;

  return (
    <>
      <header className={styles.header}>
        <a className={styles.wordmark} href={`/${content.locale}`} aria-label="Lucas Lourenço">
          LL<span>/</span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          {pages.map((page) => (
            <a
              key={page}
              href={`/${content.locale}/${page}`}
              aria-current={activePage === page ? "page" : undefined}
            >
              {content.nav[page]}
            </a>
          ))}
        </nav>
        <a
          className={styles.language}
          href={`/${alternateLocale}${suffix}`}
          hrefLang={alternateLocale === "pt" ? "pt-BR" : "en"}
        >
          {content.locale.toUpperCase()} / {alternateLocale.toUpperCase()}
        </a>
      </header>
      <main>{children}</main>
      {showFooter && (
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Lucas Lourenço</p>
          <span>{content.labels.footer}</span>
        </footer>
      )}
    </>
  );
}
```

Move the existing Person JSON-LD script into this component before the header,
retaining the current schema fields.

- [ ] **Step 5: Add active-navigation styling**

Add:

```css
.nav a[aria-current="page"] {
  color: var(--text);
  background: var(--surface-hover);
}
```

- [ ] **Step 6: Run the focused test and verify success**

Run: `node --test --test-name-pattern="shared navigation" tests/portfolio-contract.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/Portfolio/SiteShell.tsx src/components/Portfolio/types.ts src/components/Portfolio/styles.module.css tests/portfolio-contract.test.mjs
git commit -m "feat: add localized portfolio shell"
```

### Task 3: Reduce the home page to the full-screen hero

**Files:**
- Modify: `src/components/Portfolio/index.tsx`
- Modify: `src/components/Portfolio/styles.module.css`
- Test: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Consumes: `SiteShell`, `PortfolioContent`
- Produces: the default `Portfolio` home component

- [ ] **Step 1: Replace the old homepage contract**

Add:

```js
test("the homepage renders only the hero and links to about", async () => {
  const home = await read("src/components/Portfolio/index.tsx");

  assert.match(home, /activePage="home"/);
  assert.match(home, /showFooter=\\{false\\}/);
  assert.match(home, /`\\/\u0024\\{content\\.locale\\}\\/about`/);
  assert.match(home, /content\\.hero\\.aboutCta/);
  assert.doesNotMatch(home, /content\\.experiences|content\\.about|content\\.education/);
  assert.doesNotMatch(home, /id="experience"|id="about"|id="contact"/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="renders only the hero" tests/portfolio-contract.test.mjs`

Expected: FAIL because the home still renders every section.

- [ ] **Step 3: Simplify the home component**

Keep the current hero markup and wrap it with:

```tsx
<SiteShell content={content} activePage="home" showFooter={false}>
  <section className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.heroMain}>
      <div className={styles.heroContent}>
        <h1 id="hero-title">{content.hero.title}</h1>
        <p className={styles.role}>{content.hero.kicker}</p>
        <p className={styles.tagline}>{content.hero.description}</p>
      </div>
    </div>
    <a className={styles.aboutCta} href={`/${content.locale}/about`}>
      {content.hero.aboutCta}
      <ArrowUpRight />
    </a>
  </section>
</SiteShell>
```

Delete the Experience, About, Contact, footer, `SectionHeading`, and `InfoList`
markup from `index.tsx`.

- [ ] **Step 4: Style the About link without crowding the viewport**

Add:

```css
.aboutCta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--muted-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  border-bottom: 1px solid var(--line-strong);
}

.aboutCta:hover {
  color: var(--accent);
}
```

Place it within the existing hero action row so all hero elements still fit at
390×844 and 1440×900.

- [ ] **Step 5: Run the focused test and verify success**

Run: `node --test --test-name-pattern="renders only the hero" tests/portfolio-contract.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Portfolio/index.tsx src/components/Portfolio/styles.module.css tests/portfolio-contract.test.mjs
git commit -m "feat: make portfolio home hero-only"
```

### Task 4: Build the About, Experience, and Contact page components

**Files:**
- Create: `src/components/Portfolio/AboutPage.tsx`
- Create: `src/components/Portfolio/ExperiencePage.tsx`
- Create: `src/components/Portfolio/ContactPage.tsx`
- Create: `src/components/Portfolio/SectionHeading.tsx`
- Modify: `src/components/Portfolio/styles.module.css`
- Test: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Each page consumes `{ content: PortfolioContent }`
- Each page renders `SiteShell` with its matching `activePage`
- `SectionHeading` consumes `{ id: string; index: string; title: string; description?: string }`

- [ ] **Step 1: Write the failing interior-page component contract**

Add:

```js
test("interior page components own their focused content", async () => {
  const about = await read("src/components/Portfolio/AboutPage.tsx");
  const experience = await read("src/components/Portfolio/ExperiencePage.tsx");
  const contact = await read("src/components/Portfolio/ContactPage.tsx");

  assert.match(about, /activePage="about"/);
  assert.match(about, /content\\.about/);
  assert.match(about, /content\\.education/);
  assert.match(experience, /activePage="experience"/);
  assert.match(experience, /content\\.experiences/);
  assert.match(contact, /activePage="contact"/);
  assert.match(contact, /mailto:/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="interior page components" tests/portfolio-contract.test.mjs`

Expected: FAIL because the three files do not exist.

- [ ] **Step 3: Extract the shared heading**

Create:

```tsx
import styles from "./styles.module.css";

export default function SectionHeading({
  id,
  index,
  title,
  description,
}: {
  id: string;
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.sectionIndex}>{index}</p>
      <div>
        <h1 id={id}>{title}</h1>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create the Experience page**

Render `SectionHeading` index `01`, `content.labels.experience`,
`content.labels.experienceDescription`, and map `content.experiences` to
articles containing period, current marker, role, company, summary, and mapped
skill tags inside:

```tsx
<SiteShell content={content} activePage="experience">
  <section className={styles.page} aria-labelledby="experience-title">
    <SectionHeading
      id="experience-title"
      index="01"
      title={content.labels.experience}
      description={content.labels.experienceDescription}
    />
    <div className={styles.timeline}>
      {content.experiences.map((experience) => (
        <article className={styles.experience} key={experience.company}>
          <div className={styles.experiencePeriod}>{experience.period}</div>
          <div className={styles.experienceContent}>
            <h2>{experience.role}</h2>
            <p className={styles.company}>{experience.company}</p>
            <p>{experience.summary}</p>
            <div className={styles.tags}>
              {experience.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
</SiteShell>
```

- [ ] **Step 5: Create the About page**

Render `SectionHeading` index `02`, the existing two biography paragraphs,
capabilities, languages, and education inside a `page` section. Keep the
existing list semantics and headings.

- [ ] **Step 6: Create the Contact page**

Render `SectionHeading` index `03`, `contactDescription`, a LinkedIn link, and:

```tsx
<a href="mailto:lucascelestiano@gmail.com">
  {content.socialLinks.find((link) => link.href.startsWith("mailto:"))?.label}
</a>
```

- [ ] **Step 7: Adapt section styling for standalone pages**

Add:

```css
.page {
  width: min(calc(100% - 48px), 1060px);
  min-height: calc(100svh - 84px);
  margin-inline: auto;
  padding-block: 148px 92px;
}

.page .sectionHeading h1 {
  font-size: clamp(32px, 3.8vw, 48px);
  font-weight: 620;
  letter-spacing: -0.05em;
}
```

At `max-width: 760px`, use `width: min(calc(100% - 40px), 1060px)` and
`padding-block: 112px 130px`.

- [ ] **Step 8: Run the focused test and verify success**

Run: `node --test --test-name-pattern="interior page components" tests/portfolio-contract.test.mjs`

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/Portfolio/AboutPage.tsx src/components/Portfolio/ExperiencePage.tsx src/components/Portfolio/ContactPage.tsx src/components/Portfolio/SectionHeading.tsx src/components/Portfolio/styles.module.css tests/portfolio-contract.test.mjs
git commit -m "feat: add focused portfolio page components"
```

### Task 5: Add statically generated localized routes and metadata

**Files:**
- Create: `src/app/(portfolio)/[lang]/about/page.tsx`
- Create: `src/app/(portfolio)/[lang]/experience/page.tsx`
- Create: `src/app/(portfolio)/[lang]/contact/page.tsx`
- Create: `src/lib/portfolio-metadata.ts`
- Modify: `src/app/(portfolio)/[lang]/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Test: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Produces: `createPortfolioMetadata(lang: Locale, page: PageSlug): Metadata`
- Route pages consume the matching page component and `getPortfolioContent`

- [ ] **Step 1: Write the failing route contract**

Add:

```js
test("all localized portfolio pages statically generate with metadata", async () => {
  for (const page of ["about", "experience", "contact"]) {
    const route = await read(`src/app/(portfolio)/[lang]/${page}/page.tsx`);
    assert.match(route, /generateStaticParams/);
    assert.match(route, /generateMetadata/);
    assert.match(route, /getPortfolioContent/);
  }

  const sitemap = await read("src/app/sitemap.ts");
  assert.match(sitemap, /about/);
  assert.match(sitemap, /experience/);
  assert.match(sitemap, /contact/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="all localized portfolio pages" tests/portfolio-contract.test.mjs`

Expected: FAIL because the route files do not exist.

- [ ] **Step 3: Create the metadata helper**

Create a helper containing localized page titles and descriptions:

```ts
export function createPortfolioMetadata(
  lang: Locale,
  page: PageSlug,
): Metadata {
  const localized = {
    en: {
      home: ["Lucas Lourenço — Software Engineer", "Building thoughtful software for complex products."],
      about: ["About — Lucas Lourenço", "About Lucas Lourenço, his capabilities, languages, and education."],
      experience: ["Experience — Lucas Lourenço", "Professional experience and technical background of Lucas Lourenço."],
      contact: ["Contact — Lucas Lourenço", "Contact Lucas Lourenço through LinkedIn or email."],
    },
    pt: {
      home: ["Lucas Lourenço — Engenheiro de Software", "Construindo software cuidadoso para produtos complexos."],
      about: ["Sobre — Lucas Lourenço", "Conheça Lucas Lourenço, suas competências, idiomas e formação."],
      experience: ["Experiência — Lucas Lourenço", "Experiência profissional e trajetória técnica de Lucas Lourenço."],
      contact: ["Contato — Lucas Lourenço", "Entre em contato com Lucas Lourenço pelo LinkedIn ou e-mail."],
    },
  } as const;
  const [title, description] = localized[lang][page];
  const suffix = page === "home" ? "" : `/${page}`;
  const canonical = `${siteUrl}/${lang}${suffix}`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en${suffix}`,
        "pt-BR": `${siteUrl}/pt${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Lucas Lourenço",
      locale: lang === "en" ? "en_US" : "pt_BR",
      images: [{ url: `${siteUrl}/51462903.png`, width: 460, height: 460, alt: "Lucas Lourenço" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/51462903.png`],
    },
  };
}
```

- [ ] **Step 4: Create each interior route**

Each file validates `lang`, exports `generateStaticParams`, exports
`generateMetadata` calling `createPortfolioMetadata`, and returns its matching
component:

```tsx
export default async function AboutRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <AboutPage content={getPortfolioContent(lang)} />;
}
```

Create the Experience route with `ExperiencePage` and page slug `"experience"`;
create the Contact route with `ContactPage` and page slug `"contact"`.

- [ ] **Step 5: Move home metadata to the route**

Export `generateMetadata` from `[lang]/page.tsx` using
`createPortfolioMetadata(lang, "home")`. Remove `generateMetadata` and related
metadata constants from `[lang]/layout.tsx`, leaving font and locale setup.

- [ ] **Step 6: Expand the sitemap**

Generate the Cartesian product of:

```ts
const pages = ["", "/about", "/experience", "/contact"];
const languages = ["en", "pt"];
```

Return eight entries with correct `url`, `lastModified`, `changeFrequency`, and
`priority`, giving home routes the highest priority.

- [ ] **Step 7: Run the focused test and verify success**

Run: `node --test --test-name-pattern="all localized portfolio pages" tests/portfolio-contract.test.mjs`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/app/\(portfolio\)/\[lang\] src/app/sitemap.ts src/lib/portfolio-metadata.ts tests/portfolio-contract.test.mjs
git commit -m "feat: add localized portfolio routes"
```

### Task 6: Validate behavior and production output

**Files:**
- Modify: `src/components/Portfolio/styles.module.css`
- Modify: `tests/portfolio-contract.test.mjs`

**Interfaces:**
- Validates all interfaces produced by Tasks 1–5

- [ ] **Step 1: Run all automated checks**

Run in parallel:

```bash
pnpm test
pnpm lint
pnpm typecheck
```

Expected: all commands exit with code 0 and all contract tests pass.

- [ ] **Step 2: Run the production build**

Run: `pnpm build`

Expected: successful static output listing `/en`, `/pt`, and the six localized
interior routes.

- [ ] **Step 3: Inspect desktop routes**

At 1440×900 inspect `/en`, `/en/about`, `/en/experience`, and `/en/contact`.
Verify the home has no vertical content after its hero, the avatar is circular,
the active navigation state matches each route, and the interior pages have
compact readable spacing.

- [ ] **Step 4: Inspect mobile routes**

At 390×844 inspect the same routes. Verify the bottom navigation does not cover
page actions, the hero fits in one viewport, content remains readable, and the
language switcher preserves the current path.

- [ ] **Step 5: Verify removed content remains absent**

Run:

```bash
rg -n "Resume|Résumé|currículo|open to international|selectedWork|projects" src public
```

Expected: no résumé, availability-sales copy, or commercial-project UI matches.

- [ ] **Step 6: Commit final responsive adjustments**

```bash
git add src/components/Portfolio/styles.module.css tests/portfolio-contract.test.mjs
git commit -m "fix: polish responsive portfolio pages"
```
