import Image from "next/image";
import Link from "next/link";
import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";
import TypingName from "./TypingName";
import GitHubActivityCard from "./live-widgets/GitHubActivityCard";
import WeatherCard from "./live-widgets/WeatherCard";

type PortfolioProps = {
  content: PortfolioContent;
};

const linkedinUrl = "https://www.linkedin.com/in/lucas-lourenco2802/";

export default function Portfolio({ content }: PortfolioProps) {
  return (
    <SiteShell content={content} activePage="home" showFooter={false}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroDashboard}>
          <div className={styles.heroMain}>
            <div className={styles.heroContent}>
              <h1 id="hero-title">
                <TypingName text={content.hero.title} />
              </h1>
              <p className={styles.role}>{content.hero.kicker}</p>
              <p className={styles.tagline}>{content.hero.description}</p>
              <div className={styles.heroActions}>
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  {content.hero.primaryCta}
                  <ArrowUpRight />
                </a>
                <Link
                  className={styles.aboutCta}
                  href={`/${content.locale}/about`}
                >
                  {content.hero.aboutCta}
                  <ArrowUpRight />
                </Link>
              </div>
            </div>

            <div className={styles.heroAvatar}>
              <Image
                src="/51462903.png"
                alt="Pixel art portrait of Lucas Lourenço"
                width={460}
                height={460}
                priority
              />
            </div>
          </div>

          <div className={styles.heroWidgets}>
            <GitHubActivityCard copy={content.widgets.github} />
            <WeatherCard
              locale={content.locale}
              copy={content.widgets.weather}
            />
          </div>

          <nav className={styles.heroSocials} aria-label="Social links">
            {content.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </SiteShell>
  );
}
