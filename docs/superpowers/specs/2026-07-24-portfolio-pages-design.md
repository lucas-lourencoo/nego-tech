# Portfolio Pages Design

## Goal

Transform the portfolio from a single scrolling page into a small bilingual
website with focused pages. The home page becomes a full-screen introduction,
while About, Experience, and Contact receive their own routes.

## Routes

Both supported locales expose the same page structure:

- `/{lang}` — full-screen hero only
- `/{lang}/about` — biography, capabilities, languages, and education
- `/{lang}/experience` — complete professional timeline
- `/{lang}/contact` — concise contact invitation with LinkedIn and email links

The supported language values remain `en` and `pt`. The root route continues to
redirect to `/en`.

## Home Page

The home page contains only:

- the fixed global header;
- the full-viewport hero;
- Lucas's circular pixel-art avatar;
- name, role, and introduction;
- the LinkedIn action;
- social links;
- a localized “More about me” / “Saiba mais” link to the About page.

No About, Experience, Contact, résumé, or commercial-project content appears
below the hero.

## Global Navigation

The existing floating navigation remains visible on every page. Its items
navigate to real localized routes instead of hash anchors. The current page is
identified visually and through `aria-current="page"`.

The language selector preserves the current page when switching languages. For
example, `/en/about` switches to `/pt/about`.

The `LL/` wordmark always links to the home page for the active language.

## Interior Pages

Each interior page uses the same visual system as the home page: dark
background, green accent, compact typography, fixed floating navigation, and
controlled spacing.

Every page starts below the fixed header and has:

- a small green section number;
- a localized page title and optional supporting text;
- the content currently associated with that section;
- enough minimum height to avoid feeling like a fragment;
- a consistent footer.

About includes biography, capabilities, languages, and education. Experience
contains the existing professional timeline and skill tags. Contact contains a
short invitation plus LinkedIn and email actions.

## Component Structure

The shared site shell owns structured data, header, navigation, language
switching, and footer. Page components own only their page-specific content.
Reusable components cover section headings, information lists, and contact
actions.

Portfolio content remains centralized and typed in
`src/content/portfolio.ts`. Route files select the correct locale and render the
appropriate page without duplicating translated content.

## SEO and Accessibility

Each route has localized metadata with a page-specific title and description.
The sitemap includes all English and Portuguese routes. Navigation uses real
links, the active page uses `aria-current`, and existing heading hierarchy,
keyboard behavior, and visible focus styles are preserved.

## Validation

Automated contract tests verify:

- the home page contains no interior-page content;
- all localized routes statically generate;
- navigation uses localized page URLs;
- the language switcher preserves the active page;
- the résumé and commercial-project content remain absent.

The final implementation must pass tests, lint, type checking, and the
production build, followed by responsive inspection of the home and each
interior page.
