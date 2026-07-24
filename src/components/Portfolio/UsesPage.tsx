import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

export default function UsesPage({ content }: { content: PortfolioContent }) {
  return (
    <SiteShell content={content} activePage="uses">
      <article className={styles.usesPage}>
        <header className={styles.usesHeader}>
          <h1>{content.labels.usesTitle}</h1>
          <p>{content.labels.usesIntroduction}</p>
        </header>

        <div className={styles.usesCategories}>
          {content.uses.map((category) => (
            <section className={styles.usesCategory} key={category.title}>
              <h2>{category.title}</h2>
              <ul>
                {category.items.map((item) => (
                  <li key={item.name}>
                    <p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.name}
                          <ArrowUpRight />
                        </a>
                      ) : (
                        <strong>{item.name}</strong>
                      )}
                      <span> — {item.description}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
