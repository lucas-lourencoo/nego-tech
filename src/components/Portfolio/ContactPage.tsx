import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "./icons";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

const linkedinUrl = "https://www.linkedin.com/in/lucas-lourenco2802/";
const githubUrl = "https://github.com/lucas-lourencoo";
const emailUrl = "mailto:lucascelestiano@gmail.com";

export default function ContactPage({ content }: { content: PortfolioContent }) {
  const linkedinLabel = content.socialLinks.find(
    (link) => link.href === linkedinUrl,
  )?.label;
  const githubLabel = content.socialLinks.find(
    (link) => link.href === githubUrl,
  )?.label;
  const emailLabel = content.socialLinks.find((link) =>
    link.href.startsWith("mailto:"),
  )?.label;

  return (
    <SiteShell content={content} activePage="contact">
      <section className={styles.page} aria-labelledby="contact-title">
        <h1 className={styles.srOnly} id="contact-title">
          {content.labels.contact}
        </h1>
        <div className={styles.contactLinksOnly}>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            <LinkedIn />
            {linkedinLabel}
            <ArrowUpRight />
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <GitHub />
            {githubLabel}
            <ArrowUpRight />
          </a>
          <a href={emailUrl}>
            <Mail />
            {emailLabel}
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
