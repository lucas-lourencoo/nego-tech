# Editorial About Page Design

## Goal

Redesign the About page with the compact editorial rhythm of Zeno Rocha's
About page while preserving Lucas Lourenço's visual identity, green accent,
content, and circular pixel-art avatar.

## Information Architecture

The portfolio has three localized destinations:

- `/{lang}` — full-screen home hero
- `/{lang}/about` — personal introduction, supporting information, and career
- `/{lang}/contact` — contact invitation and actions

The Experience navigation item and `/{lang}/experience` routes are removed.
The sitemap contains only Home, About, and Contact routes in English and
Portuguese.

## Navigation

The fixed menu contains only About and Contact. It uses `next/link` for
client-side navigation. The active destination keeps `aria-current="page"`.
The locale switcher preserves the active destination.

The home page's “More about me” / “Saiba mais” action continues to open the
localized About page.

## About Layout

The page uses a centered editorial column with a maximum width close to 800px.
It avoids cards and oversized empty spaces.

Content order:

1. A short, personal page title.
2. A two-column introduction with the circular avatar on the left and the two
   biography paragraphs on the right.
3. Compact supporting blocks for capabilities, languages, and education.
4. A `Career` / `Carreira` heading.
5. A vertical career list containing role, company, period, summary, and
   technical tags for every existing experience.

On mobile, the avatar appears above the introduction. Supporting information
and career items become a single column.

## Visual Direction

The design borrows the reference's narrow reading width, clear hierarchy,
content-first composition, and simple vertical career rhythm. It does not copy
the reference's colors, logo, typography, copy, or component styling.

The portfolio keeps:

- dark background;
- green accent;
- `LL/` wordmark;
- existing fonts;
- compact controls;
- circular pixel-art avatar.

## Content and Accessibility

Add localized labels for `Career` / `Carreira`. Existing experience data is
reused without duplication. The page keeps a single `h1`, followed by `h2`
section headings and `h3` career roles.

The removed Experience URLs are no longer generated or linked. Internal links
remain Next.js `Link` components.

## Validation

Contract tests verify the two-item menu, merged About content, absence of
Experience route generation, and six-entry bilingual sitemap. The final
implementation must pass tests, lint, TypeScript, and production build, then be
inspected at 1440×900 and 390×844.
