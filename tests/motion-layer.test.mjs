import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const listSourceFiles = async (dir) => {
  const entries = await readdir(new URL(`../${dir}`, import.meta.url), {
    withFileTypes: true,
  });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return listSourceFiles(path);
      return /\.(tsx?|css)$/.test(entry.name) ? [path] : [];
    }),
  );
  return files.flat();
};

test("motion tooling uses lenis, motion and Tailwind v4 without framer-motion", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const components = JSON.parse(await read("components.json"));
  const postcss = await read("postcss.config.mjs");
  const utils = await read("src/lib/utils.ts");

  assert.ok(packageJson.dependencies.lenis);
  assert.ok(packageJson.dependencies.motion);
  assert.ok(packageJson.devDependencies.tailwindcss);
  assert.equal(packageJson.dependencies["framer-motion"], undefined);
  assert.equal(components.registries["@skiper-ui"], "https://skiper-ui.com/r/{name}.json");
  assert.match(postcss, /@tailwindcss\/postcss/);
  assert.match(utils, /twMerge\(clsx\(inputs\)\)/);

  for (const file of await listSourceFiles("src")) {
    assert.doesNotMatch(await read(file), /from "framer-motion"/, file);
  }
});

test("Tailwind loads without Preflight and the reset lives in the base layer", async () => {
  const globals = await read("src/app/globals.css");

  assert.match(globals, /@import "tailwindcss\/theme\.css" layer\(theme\)/);
  assert.match(globals, /@import "tailwindcss\/utilities\.css" layer\(utilities\)/);
  assert.doesNotMatch(globals, /@import "tailwindcss";/);
  assert.doesNotMatch(globals, /preflight/);
  assert.match(globals, /@layer base\s*\{\s*\*\s*\{/);
  assert.match(globals, /--color-accent: var\(--accent\)/);
  assert.doesNotMatch(globals, /scroll-behavior:\s*smooth/);
});

test("Lenis smooth scroll is mounted once in the layout and pauses with the mobile menu", async () => {
  const layout = await read("src/app/(portfolio)/[lang]/layout.tsx");
  const smoothScroll = await read("src/components/Portfolio/motion/SmoothScroll.tsx");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");

  assert.match(layout, /<SmoothScroll \/>/);
  assert.match(smoothScroll, /^"use client"/);
  assert.match(smoothScroll, /<ReactLenis root/);
  assert.match(smoothScroll, /lenis\/dist\/lenis\.css/);
  assert.doesNotMatch(smoothScroll, /respectReducedMotion:\s*false/);
  assert.match(shell, /useLenis\(\)/);
  assert.match(shell, /lenis\.stop\(\)/);
  assert.match(shell, /lenis\.start\(\)/);
});

test("the shell adds progress, edge blur and rolling nav labels with user reduced-motion", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const progress = await read("src/components/Portfolio/motion/ScrollProgress.tsx");
  const blur = await read("src/components/Portfolio/motion/EdgeBlur.tsx");
  const label = await read("src/components/Portfolio/motion/RollingLabel.tsx");

  assert.match(shell, /<MotionConfig reducedMotion="user">/);
  assert.match(shell, /isScrollablePage && <ScrollProgress \/>/);
  assert.match(shell, /isScrollablePage && <EdgeBlur \/>/);
  assert.match(shell, /<RollingLabel/);
  assert.match(progress, /useScroll\(\)/);
  assert.match(progress, /aria-hidden="true"/);
  assert.match(blur, /ProgressiveBlur/);
  assert.match(blur, /pointer-events-none/);
  assert.match(label, /className="sr-only"/);
  assert.match(label, /aria-hidden="true"/);
});

test("sections reveal on scroll and featured projects use the spotlight card", async () => {
  const reveal = await read("src/components/Portfolio/motion/Reveal.tsx");
  const spotlight = await read("src/components/Portfolio/motion/SpotlightCard.tsx");
  const projects = await read("src/components/Portfolio/ProjectsPage.tsx");
  const about = await read("src/components/Portfolio/AboutPage.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(reveal, /whileInView/);
  assert.match(reveal, /once: true/);
  assert.match(projects, /<SpotlightCard/);
  assert.match(projects, /<Reveal as="li"/);
  assert.match(about, /<Reveal as="article" className=\{styles\.careerItem\}/);
  assert.match(spotlight, /target="_blank"/);
  assert.match(spotlight, /rel="noreferrer"/);
  assert.match(spotlight, /pointerType !== "mouse"/);
  assert.match(styles, /\.featuredProject::before\s*\{[^}]*--spot-x/s);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.featuredProject::before\s*\{\s*transition:\s*none/,
  );
});

test("media kit metrics count up and keep the original text for assistive tech", async () => {
  const countUp = await read("src/components/Portfolio/motion/CountUp.tsx");
  const mediaKit = await read("src/components/Portfolio/MediaKitPage.tsx");

  assert.match(countUp, /NumberFlow/);
  assert.match(countUp, /useInView/);
  assert.match(countUp, /<span className="sr-only">\{value\}<\/span>/);
  assert.match(mediaKit, /<CountUp value=\{metric\.value\}/);
  assert.match(mediaKit, /<CountUp value=\{mediaKit\.highlight\.value\}/);
});

test("the hero background pauses offscreen and respects reduced motion", async () => {
  const background = await read("src/components/Portfolio/motion/HeroBackground.tsx");
  const hero = await read("src/components/Portfolio/index.tsx");

  assert.match(hero, /<HeroBackground \/>/);
  assert.match(background, /prefers-reduced-motion: reduce/);
  assert.match(background, /IntersectionObserver/);
  assert.match(background, /visibilitychange/);
  assert.match(background, /aria-hidden="true"/);
});

test("Skiper UI free components are credited in the footer and on the uses page", async () => {
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const content = await read("src/content/portfolio.ts");

  assert.match(shell, /content\.labels\.motionCredit/);
  assert.match(shell, /href="https:\/\/skiper-ui\.com\/" target="_blank" rel="noreferrer"/);
  assert.match(content, /motionCredit: "Motion components by Skiper UI"/);
  assert.match(content, /motionCredit: "Componentes de animação por Skiper UI"/);
  assert.equal(content.match(/name: "Skiper UI"/g)?.length, 2);
});

test("the preloader runs once per tab session without flashing or blocking", async () => {
  const layout = await read("src/app/(portfolio)/[lang]/layout.tsx");
  const state = await read("src/components/Portfolio/motion/preloaderState.ts");
  const preloader = await read("src/components/Portfolio/motion/Preloader.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(layout, /suppressHydrationWarning/);
  assert.match(
    layout,
    /<script dangerouslySetInnerHTML=\{\{ __html: preloaderBootScript \}\} \/>\s*<Preloader \/>/,
  );
  assert.match(state, /sessionStorage\.getItem/);
  assert.match(state, /prefers-reduced-motion: reduce/);
  assert.match(state, /seen\|\|reduce\?"skip":"active"/);
  assert.match(state, /sessionStorage\.setItem\(preloaderStorageKey, "seen"\)/);
  assert.match(preloader, /^"use client"/);
  assert.match(preloader, /padStart\(3, "0"\)/);
  assert.match(preloader, /lenis\.stop\(\)/);
  assert.match(preloader, /aria-hidden="true"/);
  assert.match(styles, /\.preloader\s*\{[^}]*display:\s*none/s);
  assert.match(
    styles,
    /:global\(html\[data-preloader="active"\]\) \.preloader\s*\{\s*display:\s*grid/,
  );
});

test("the hero waits for the preloader before typing and revealing widgets", async () => {
  const typingName = await read("src/components/Portfolio/TypingName.tsx");
  const shell = await read("src/components/Portfolio/SiteShell.tsx");
  const styles = await read("src/components/Portfolio/styles.module.css");

  assert.match(typingName, /addEventListener\(preloaderDoneEvent, start, \{ once: true \}\)/);
  assert.match(shell, /isMenuOpen \|\| isPreloaderActive\(\)/);
  assert.match(
    styles,
    /:global\(html\[data-preloader="active"\]\) \.heroWidgets > \.liveCard\s*\{\s*animation-play-state:\s*paused/,
  );
});
