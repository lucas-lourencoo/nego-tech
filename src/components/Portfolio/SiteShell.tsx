"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PortfolioContent } from "@/content/portfolio";
import CustomCursor from "./CustomCursor";
import type { PageSlug } from "./types";
import styles from "./styles.module.css";

type SiteShellProps = {
  content: PortfolioContent;
  activePage: PageSlug;
  children: ReactNode;
  showFooter?: boolean;
};

const pages = ["about", "projects", "uses", "contact"] as const;
type NavPage = (typeof pages)[number];

type Indicator = {
  left: number;
  width: number;
  visible: boolean;
};

const linkedinUrl = "https://www.linkedin.com/in/lucas-lourenco2802/";

export default function SiteShell({
  content,
  activePage,
  children,
  showFooter = true,
}: SiteShellProps) {
  const alternateLocale = content.locale === "en" ? "pt" : "en";
  const suffix = activePage === "home" ? "" : `/${activePage}`;
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Partial<Record<NavPage, HTMLAnchorElement | null>>>({});
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    visible: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const selectIndicator = useCallback((page?: NavPage) => {
    const nav = navRef.current;
    const link = page ? linkRefs.current[page] : undefined;

    if (!nav || !link) {
      setIndicator((current) => ({ ...current, visible: false }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      visible: true,
    });
  }, []);

  const restoreIndicator = useCallback(() => {
    selectIndicator(activePage === "home" ? undefined : activePage);
  }, [activePage, selectIndicator]);

  useLayoutEffect(() => {
    restoreIndicator();
    window.addEventListener("resize", restoreIndicator);
    return () => window.removeEventListener("resize", restoreIndicator);
  }, [restoreIndicator]);

  useEffect(() => {
    const syncScrolledState = () => setIsScrolled(window.scrollY > 16);
    const initialFrame = window.requestAnimationFrame(syncScrolledState);

    window.addEventListener("scroll", syncScrolledState, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", syncScrolledState);
    };
  }, []);

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) restoreIndicator();
  };

  const navStyle = {
    "--indicator-left": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
    "--indicator-opacity": indicator.visible ? 1 : 0,
  } as CSSProperties;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lucas Lourenço Silva",
    url: `https://www.negotech.com.br/${content.locale}`,
    jobTitle: "Software Engineer",
    image: "https://www.negotech.com.br/51462903.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Campo Grande",
      addressRegion: "MS",
      addressCountry: "BR",
    },
    sameAs: [linkedinUrl, "https://github.com/lucas-lourencoo"],
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "GraphQL",
      "Artificial Intelligence",
    ],
  };

  return (
    <>
      <CustomCursor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : ""
        }`}
      >
        <Link
          className={styles.wordmark}
          href={`/${content.locale}`}
          aria-label="Lucas Lourenço"
        >
          LL<span>/</span>
        </Link>

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="Primary navigation"
          style={navStyle}
          onPointerLeave={restoreIndicator}
          onBlur={handleBlur}
        >
          <span className={styles.navIndicator} aria-hidden="true" />
          {pages.map((page) => (
            <Link
              key={page}
              ref={(element) => {
                linkRefs.current[page] = element;
              }}
              href={`/${content.locale}/${page}`}
              aria-current={activePage === page ? "page" : undefined}
              onPointerEnter={() => selectIndicator(page)}
              onFocus={() => selectIndicator(page)}
            >
              {content.nav[page]}
            </Link>
          ))}
        </nav>

        <Link
          className={styles.language}
          href={`/${alternateLocale}${suffix}`}
          hrefLang={alternateLocale === "pt" ? "pt-BR" : "en"}
          aria-label={
            content.locale === "en"
              ? "Ver portfólio em português"
              : "View portfolio in English"
          }
        >
          {content.locale.toUpperCase()} / {alternateLocale.toUpperCase()}
        </Link>
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
