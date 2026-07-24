import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the portfolio exposes typed English and Portuguese content", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /export type Locale = "en" \| "pt"/);
  assert.match(content, /Software Engineer/);
  assert.match(content, /Engenheiro de Software/);
});

test("the hero exposes a localized link to the about page", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /aboutCta: string/);
  assert.match(content, /aboutCta: "More about me"/);
  assert.match(content, /aboutCta: "Saiba mais"/);
});

test("the about page exposes localized career labels", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /career: string/);
  assert.match(content, /aboutTitle: string/);
  assert.match(content, /career: "Career"/);
  assert.match(content, /career: "Carreira"/);
  assert.match(content, /aboutTitle: "Hey, I’m Lucas Lourenço\."/);
  assert.match(content, /aboutTitle: "Oi, eu sou o Lucas Lourenço\."/);
});

test("uses content is typed and localized", async () => {
  const content = await read("src/content/portfolio.ts");

  assert.match(content, /export type UseItem/);
  assert.match(content, /export type UseCategory/);
  assert.match(content, /usesTitle: string/);
  assert.match(content, /usesIntroduction: string/);
  assert.match(content, /uses: UseCategory\[\]/);
  assert.match(content, /Tools\. Apps\. Gear\./);
  assert.match(content, /Ferramentas\. Apps\. Equipamentos\./);
  assert.match(content, /MacBook Pro 14-inch/);
  assert.match(content, /Visual Studio Code/);
  assert.match(content, /NotebookLM/);
});

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

test("the main portfolio has no commercial projects section", async () => {
  const portfolio = await read("src/components/Portfolio/index.tsx");

  assert.doesNotMatch(portfolio, /id="work"|content\.projects|selectedWork/);
  assert.doesNotMatch(portfolio, /content\.nav\.work/);
});

test("the shared navigation uses localized routes and marks the active page", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(shell, /^"use client"/);
  assert.match(shell, /import Link from "next\/link"/);
  assert.match(shell, /useLayoutEffect|useRef|useState/);
  assert.match(shell, /useEffect/);
  assert.match(shell, /navIndicator/);
  assert.match(shell, /onPointerEnter/);
  assert.match(shell, /onPointerLeave/);
  assert.match(shell, /onFocus/);
  assert.match(shell, /aria-current/);
  assert.match(
    shell,
    /const pages = \["about", "projects", "uses", "contact"\]/,
  );
  assert.doesNotMatch(shell, /"experience"/);
  assert.match(shell, /href=\{`\/\$\{content\.locale\}\/\$\{page\}`\}/);
  assert.match(shell, /activePage/);
  assert.match(shell, /alternateLocale/);
  assert.match(shell, /window\.scrollY > 16/);
  assert.match(shell, /addEventListener\("scroll"/);
  assert.match(shell, /styles\.headerScrolled/);
  assert.match(styles, /\.navIndicator/);
  assert.match(styles, /\.header\s*\{[^}]*height:\s*64px/s);
  assert.match(styles, /--indicator-left/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /\.wordmark\s*\{[^}]*font-size:\s*21px/s);
  assert.match(
    styles,
    /\.headerScrolled\s*\{[^}]*background:\s*rgba\(11,\s*11,\s*13,\s*0\.82\)/s,
  );
  assert.match(styles, /\.headerScrolled\s*\{[^}]*border-color:\s*var\(--line\)/s);
  assert.match(styles, /backdrop-filter:\s*blur\(16px\)\s*saturate\(140%\)/);
  assert.match(styles, /@supports\s*\(\(backdrop-filter:\s*blur\(16px\)\)/);
  assert.doesNotMatch(
    styles.match(/\.wordmark\s*\{[^}]*\}/s)?.[0] ?? "",
    /background:|box-shadow:|border:/,
  );
});

test("the homepage uses a full-screen personal layout without profile cards", async () => {
  const portfolio = await read("src/components/Portfolio/index.tsx");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.doesNotMatch(portfolio, /identityCard|avatarFrame/);
  assert.match(portfolio, /heroAvatar/);
  assert.match(portfolio, /51462903\.png/);
  assert.match(shell, /<span>&lt;<\/span>LL<span>\/&gt;<\/span>/);
  assert.match(portfolio, /heroActions/);
  assert.doesNotMatch(portfolio, /availability/);
  assert.doesNotMatch(portfolio, /heroFacts|quickHint|Resume\.pdf|resumeCta|Résumé/);
  assert.match(styles, /\.hero\s*\{[^}]*min-height:\s*100svh/s);
  assert.doesNotMatch(
    styles.match(/\.nav\s*\{[^}]*\}/s)?.[0] ?? "",
    /background:|box-shadow:|border:/,
  );
  assert.match(styles, /var\(--accent\)/);
});

test("the homepage renders only the hero and links to about", async () => {
  const home = await read("src/components/Portfolio/index.tsx");

  assert.match(home, /import Link from "next\/link"/);
  assert.match(home, /activePage="home"/);
  assert.match(home, /showFooter=\{false\}/);
  assert.match(home, /content\.locale.*about/s);
  assert.match(home, /content\.hero\.aboutCta/);
  assert.doesNotMatch(home, /content\.experiences|content\.about|content\.education/);
  assert.doesNotMatch(home, /id="experience"|id="about"|id="contact"/);
});

test("the homepage includes localized GitHub activity and desktop-only weather", async () => {
  const home = await read("src/components/Portfolio/index.tsx");
  const github = await read(
    "src/components/Portfolio/live-widgets/GitHubActivityCard.tsx",
  );
  const weather = await read(
    "src/components/Portfolio/live-widgets/WeatherCard.tsx",
  );
  const content = await read("src/content/portfolio.ts");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(home, /GitHubActivityCard/);
  assert.match(home, /WeatherCard/);
  assert.match(home, /content\.widgets\.github/);
  assert.match(home, /content\.widgets\.weather/);
  assert.match(github, /\/api\/github-activity/);
  assert.match(github, /slice\(-371\)/);
  assert.match(weather, /matchMedia\("\(min-width: 761px\)"\)/);
  assert.match(weather, /https:\/\/ipapi\.co\/json\//);
  assert.match(weather, /latitude: -20\.4428/);
  assert.match(weather, /\/api\/weather/);
  assert.match(content, /title: "GitHub activity"/);
  assert.match(content, /title: "Atividade no GitHub"/);
  assert.match(content, /title: "Local weather"/);
  assert.match(content, /title: "Clima local"/);
  assert.match(
    styles,
    /@media \(max-width: 760px\)[\s\S]*\.weatherCard\s*\{[^}]*display:\s*none/,
  );
});

test("live data routes validate and cache their provider requests", async () => {
  const githubRoute = await read("src/app/api/github-activity/route.ts");
  const weatherRoute = await read("src/app/api/weather/route.ts");

  assert.match(
    githubRoute,
    /github-contributions-api\.jogruber\.de\/v4\/lucas-lourencoo\?y=last/,
  );
  assert.match(githubRoute, /revalidate: CACHE_SECONDS/);
  assert.match(githubRoute, /s-maxage=\$\{CACHE_SECONDS\}/);
  assert.match(weatherRoute, /api\.open-meteo\.com\/v1\/forecast/);
  assert.match(weatherRoute, /current: "temperature_2m,weather_code"/);
  assert.match(weatherRoute, /daily: "weather_code,temperature_2m_max"/);
  assert.match(weatherRoute, /forecast_days: "6"/);
  assert.match(weatherRoute, /parseCoordinate\(searchParams\.get\("latitude"\), -90, 90\)/);
  assert.match(weatherRoute, /parseCoordinate\(searchParams\.get\("longitude"\), -180, 180\)/);
  assert.match(weatherRoute, /status: 400/);
  assert.match(weatherRoute, /60 \* 30/);
});

test("the hero name types once with a thick blinking caret and reduced-motion fallback", async () => {
  const home = await read("src/components/Portfolio/index.tsx");
  const typingName = await read("src/components/Portfolio/TypingName.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(home, /import TypingName from "\.\/TypingName"/);
  assert.match(home, /<TypingName text=\{content\.hero\.title\} \/>/);
  assert.match(typingName, /^"use client"/);
  assert.match(typingName, /useEffect/);
  assert.match(typingName, /useState/);
  assert.match(typingName, /Array\.from\(text\)/);
  assert.match(typingName, /setTimeout/);
  assert.match(typingName, /value:\s*`\$\{beforeCedilla\}c`/);
  assert.match(typingName, /delay:\s*400/);
  assert.match(typingName, /value:\s*beforeCedilla/);
  assert.match(typingName, /delay:\s*220/);
  assert.match(typingName, /value:\s*`\$\{beforeCedilla\}ç`/);
  assert.match(typingName, /correctionInterval = 180/);
  assert.match(typingName, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(typingName, /aria-label=\{text\}/);
  assert.match(typingName, /aria-hidden="true"/);
  assert.match(
    styles,
    /\.typingName\s*\{[^}]*min-width:\s*14ch[^}]*height:\s*1em[^}]*inline-flex[^}]*font-family:\s*var\(--font-mono\)[^}]*letter-spacing:\s*0/s,
  );
  assert.match(
    styles,
    /\.hero h1\s*\{[^}]*height:\s*1em[^}]*display:\s*flex[^}]*align-items:\s*center/s,
  );
  assert.match(styles, /\.typingNameText\s*\{[^}]*line-height:\s*1/s);
  assert.match(styles, /@keyframes typingCaretBlink/);
  assert.match(
    styles,
    /\.typingCaret\s*\{[^}]*width:\s*0\.3em[^}]*margin-left:\s*0\.18em[^}]*var\(--accent\)/s,
  );
  assert.match(
    styles,
    /\.typingCaretBlink\s*\{[^}]*typingCaretBlink\s+0\.8s\s+step-end\s+infinite/s,
  );
  assert.doesNotMatch(styles, /typingReveal|typingCaretMove|clip-path:\s*inset/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.typingCaret[\s\S]*display:\s*none/,
  );
});

test("the shared shell mounts a responsive green custom pointer", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const cursor = await read("src/components/Portfolio/CustomCursor.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(shell, /import CustomCursor from "\.\/CustomCursor"/);
  assert.match(shell, /<CustomCursor \/>/);
  assert.match(cursor, /^"use client"/);
  assert.match(cursor, /useEffect/);
  assert.match(cursor, /useRef/);
  assert.match(
    cursor,
    /finePointerQuery = "\(hover: hover\) and \(pointer: fine\)"/,
  );
  assert.match(cursor, /matchMedia\(finePointerQuery\)/);
  assert.match(cursor, /pointermove/);
  assert.match(cursor, /pointerleave/);
  assert.match(cursor, /\.closest\(/);
  assert.match(cursor, /a, button, \[role="button"\], input, textarea, select/);
  assert.match(styles, /\.customCursor\s*\{[^}]*position:\s*fixed/s);
  assert.match(styles, /\.customCursor\s*\{[^}]*width:\s*14px[^}]*height:\s*14px/s);
  assert.match(
    styles,
    /\.customCursorInteractive\s*\{[^}]*width:\s*28px[^}]*height:\s*28px/s,
  );
  assert.match(
    styles,
    /@media \(hover:\s*hover\) and \(pointer:\s*fine\)[\s\S]*cursor:\s*none/,
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.customCursor[^}]*transition:\s*none/,
  );
});

test("about combines personal details and career while contact stays focused", async () => {
  const about = await read("src/components/Portfolio/AboutPage.tsx");
  const contact = await read("src/components/Portfolio/ContactPage.tsx");
  const content = await read("src/content/portfolio.ts");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(about, /activePage="about"/);
  assert.match(about, /next\/image/);
  assert.match(about, /lucas-lourenco-about-bw\.png/);
  assert.match(about, /content\.about/);
  assert.match(about, /content\.education/);
  assert.match(about, /content\.experiences/);
  assert.match(about, /content\.labels\.career/);
  assert.match(content, /export type AboutSegment/);
  assert.match(content, /about: AboutSegment\[\]\[\]/);
  assert.match(content, /highlight:\s*true/);
  assert.doesNotMatch(
    content,
    /text:\s*"scalable web applications",\s*highlight:\s*true/,
  );
  assert.doesNotMatch(
    content,
    /text:\s*"digital products",\s*highlight:\s*true/,
  );
  assert.doesNotMatch(
    content,
    /text:\s*"full software development lifecycle",\s*highlight:\s*true/,
  );
  assert.match(about, /paragraph\.map/);
  assert.match(about, /segment\.highlight/);
  assert.match(about, /styles\.aboutHighlight/);
  assert.match(about, /--highlight-order/);
  assert.match(about, /highlightOrder\+\+/);
  assert.match(
    styles,
    /\.aboutHighlight\s*\{[^}]*background-color:\s*transparent[^}]*linear-gradient\(var\(--accent\),\s*var\(--accent\)\)[^}]*background-size:\s*0%\s*100%[^}]*aboutHighlightReveal\s*350ms/s,
  );
  assert.match(
    styles,
    /animation-delay:\s*calc\(250ms \+ var\(--highlight-order\) \* 180ms\)/,
  );
  assert.match(styles, /@keyframes aboutHighlightReveal/);
  assert.match(styles, /box-decoration-break:\s*clone/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.aboutHighlight\s*\{[^}]*animation:\s*none[^}]*background-size:\s*100%\s*100%/s,
  );
  assert.match(contact, /activePage="contact"/);
  assert.match(contact, /mailto:/);
  assert.match(contact, /github\.com\/lucas-lourencoo/);
  assert.doesNotMatch(contact, /content\.labels\.contactDescription/);

  await assert.rejects(
    read("src/components/Portfolio/ExperiencePage.tsx"),
    /ENOENT/,
  );
});

test("the uses page renders editorial categories and external links", async () => {
  const uses = await read("src/components/Portfolio/UsesPage.tsx");

  assert.match(uses, /activePage="uses"/);
  assert.match(uses, /content\.labels\.usesTitle/);
  assert.match(uses, /content\.labels\.usesIntroduction/);
  assert.match(uses, /content\.uses\.map/);
  assert.match(uses, /target="_blank"/);
  assert.match(uses, /rel="noreferrer"/);
});

test("the projects route renders an accessible editorial catalogue", async () => {
  const route = await read("src/app/(portfolio)/[lang]/projects/page.tsx");
  const page = await read("src/components/Portfolio/ProjectsPage.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(route, /createPortfolioMetadata\(lang, "projects"\)/);
  assert.match(route, /<ProjectsPage content=\{getPortfolioContent\(lang\)\} \/>/);
  assert.match(page, /activePage="projects"/);
  assert.match(page, /const \{ projects \} = content/);
  assert.match(page, /projects\.featured/);
  assert.match(page, /projects\.groups/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(page, /ArrowUpRight/);
  assert.match(styles, /\.projectsPage/);
  assert.match(styles, /\.featuredProjects/);
  assert.match(styles, /\.projectArchive/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.featuredProject/s,
  );

  const projectsPage =
    styles.match(/\.projectsPage\s*\{[^}]*\}/s)?.[0] ?? "";
  const projectsTitle =
    styles.match(/\.projectsHeader h1\s*\{[^}]*\}/s)?.[0] ?? "";

  assert.match(
    projectsPage,
    /width:\s*min\(calc\(100% - 48px\),\s*800px\)/,
  );
  assert.match(
    projectsTitle,
    /font-size:\s*clamp\(36px,\s*3\.6vw,\s*48px\)/,
  );
});

test("projects is integrated into localized navigation and discovery", async () => {
  const types = await read("src/components/Portfolio/types.ts");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const content = await read("src/content/portfolio.ts");
  const metadata = await read("src/lib/portfolio-metadata.ts");
  const sitemap = await read("src/app/sitemap.ts");

  assert.match(
    types,
    /"home"\s*\|\s*"about"\s*\|\s*"projects"\s*\|\s*"uses"\s*\|\s*"contact"/,
  );
  assert.match(
    shell,
    /const pages = \["about", "projects", "uses", "contact"\]/,
  );
  assert.match(content, /projects: "Projects"/);
  assert.match(content, /projects: "Projetos"/);
  assert.match(metadata, /Projects — Lucas Lourenço/);
  assert.match(metadata, /Projetos — Lucas Lourenço/);
  assert.match(sitemap, /"\/projects"/);
});

test("the main editorial titles share a green-to-purple gradient", async () => {
  const styles = await read("src/components/Portfolio/styles.module.css");
  const titleGradient =
    styles.match(/\.editorialPage > h1,\s*\.usesHeader h1\s*\{[^}]*\}/s)?.[0] ??
    "";

  assert.match(titleGradient, /color:\s*var\(--text\)/);
  assert.match(
    titleGradient,
    /linear-gradient\(45deg,\s*var\(--accent\)\s*0%,\s*#a78bfa\s*100%\)/,
  );
  assert.match(titleGradient, /background-clip:\s*text/);
  assert.match(titleGradient, /-webkit-background-clip:\s*text/);
  assert.match(titleGradient, /-webkit-text-fill-color:\s*transparent/);
});

test("localized routes statically generate both supported languages", async () => {
  const page = await read("src/app/(portfolio)/[lang]/page.tsx");
  const layout = await read("src/app/(portfolio)/[lang]/layout.tsx");

  assert.match(page, /generateStaticParams/);
  assert.match(page, /getPortfolioContent/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /alternates/);
  assert.match(layout, /openGraph/);
});

test("all localized portfolio pages statically generate with metadata", async () => {
  for (const page of ["about", "projects", "uses", "contact"]) {
    const route = await read(`src/app/(portfolio)/[lang]/${page}/page.tsx`);
    assert.match(route, /generateStaticParams/);
    assert.match(route, /generateMetadata/);
    assert.match(route, /getPortfolioContent/);
  }

  const sitemap = await read("src/app/sitemap.ts");
  assert.match(sitemap, /about/);
  assert.match(sitemap, /uses/);
  assert.match(sitemap, /contact/);
  assert.doesNotMatch(sitemap, /experience/);

  await assert.rejects(
    read("src/app/(portfolio)/[lang]/experience/page.tsx"),
    /ENOENT/,
  );
});

test("root navigation defaults to the English portfolio", async () => {
  const rootPage = await read("src/app/(redirect)/page.tsx");

  assert.match(rootPage, /redirect\(["']\/en["']\)/);
});

test("SEO discovery files and structured data are present", async () => {
  const sitemap = await read("src/app/sitemap.ts");
  const robots = await read("src/app/robots.ts");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");

  assert.match(sitemap, /\/en/);
  assert.match(sitemap, /\/pt/);
  assert.match(robots, /sitemap/);
  assert.match(shell, /application\/ld\+json/);
  assert.match(shell, /"Person"/);
});

test("advertising tracking and the old client-only architecture are removed", async () => {
  const rootLayout = await read("src/app/(portfolio)/[lang]/layout.tsx");
  const packageJson = JSON.parse(await read("package.json"));

  assert.doesNotMatch(rootLayout, /fbq|facebook|Meta Pixel/i);
  assert.equal(packageJson.dependencies["styled-components"], undefined);
  assert.equal(packageJson.dependencies["framer-motion"], undefined);
  assert.equal(packageJson.dependencies["react-scroll"], undefined);
  assert.equal(packageJson.dependencies["@radix-ui/react-navigation-menu"], undefined);
});

test("the LL identity is shared by the header and favicon", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");
  const icon = await read("src/app/icon.svg");
  const wordmark = styles.match(/\.wordmark\s*\{[^}]*\}/s)?.[0] ?? "";

  assert.match(shell, /<span>&lt;<\/span>LL<span>\/&gt;<\/span>/);
  assert.match(wordmark, /margin-left:\s*10px/);
  assert.match(wordmark, /font-size:\s*21px/);
  assert.match(icon, /<svg/);
  assert.match(icon, />LL</);
  assert.match(icon, /#b7ff4a/i);
  assert.match(icon, /#0b0b0d/i);
});
