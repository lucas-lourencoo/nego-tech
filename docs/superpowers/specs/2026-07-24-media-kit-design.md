# Media Kit Design

## Goal

Add a bilingual media kit for brands and content partnerships. The page
positions Lucas as a hybrid creator whose professional center is technology,
with music, faith, and daily life providing personal context. It must remain
distinct from the career-focused About page.

## Content

The page opens with a concise `Media Kit` hero and first-person introduction.
It then presents rounded, manually maintained audience signals:

- Instagram: 1.3K+ followers
- YouTube: 300+ subscribers
- LinkedIn: 600+ connections
- GitHub: 100+ stars
- Most popular YouTube video: 10K+ views

Content pillars are technology and development, music and faith, and everyday
life. Available partnership formats are limited to Instagram posts/stories and
dedicated or integrated YouTube videos.

The page includes three popular YouTube videos with official thumbnails,
titles, rounded view counts, and external links. It ends with simple email,
Instagram, and LinkedIn contact links.

The page must not include a résumé, pricing, invented campaign results,
previous brand partnerships, availability language, or recruiter-focused
career detail.

## Visual Direction

Use the existing 800px editorial scale, dark palette, green accent, and
green-to-purple title gradient. The hero has no large portrait. Social metrics
form a compact link grid inspired by Biro's media kit. Numbered sections and
subtle dividers borrow the clarity of Bero's commercial overview without
copying its sales-heavy tone.

Partnership formats render as editorial rows. Popular videos use a two-column
desktop grid and a single mobile column. Hover states use the existing green
border and external-arrow language. Mobile body text stays at 16–17px.

## Architecture

Create `MediaKitPage.tsx` and localized `/en/media-kit` and `/pt/media-kit`
routes with static metadata and static generation. Add typed media-kit content
to `src/content/portfolio.ts`. Integrate `Media Kit` as the fifth page in the
desktop navigation and mobile hamburger menu.

Metrics and video metadata remain static and rounded. No scraping, runtime
social APIs, environment variables, or new dependencies are required.

## Verification

Contract tests cover bilingual content, localized routes, navigation, external
links, static video data, and the continued absence of résumé links. Validate
the page at 1440×1000 and 390×844, then run test, lint, typecheck, and build.
