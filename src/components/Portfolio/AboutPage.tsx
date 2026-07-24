import Image from "next/image";
import type { CSSProperties } from "react";
import type { PortfolioContent } from "@/content/portfolio";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

export default function AboutPage({ content }: { content: PortfolioContent }) {
  let highlightOrder = 0;

  return (
    <SiteShell content={content} activePage="about">
      <article className={styles.editorialPage}>
        <h1>{content.labels.aboutTitle}</h1>

        <section className={styles.editorialIntro} aria-label={content.labels.about}>
          <Image
            src="/lucas-lourenco-about-bw.png"
            alt={
              content.locale === "pt"
                ? "Retrato em preto e branco de Lucas Lourenço"
                : "Black and white portrait of Lucas Lourenço"
            }
            width={1254}
            height={1254}
            priority
          />
          <div className={styles.editorialLead}>
            {content.about.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>
                {paragraph.map((segment, segmentIndex) => {
                  if (!segment.highlight) {
                    return <span key={segmentIndex}>{segment.text}</span>;
                  }

                  const order = highlightOrder++;

                  return (
                    <mark
                      className={styles.aboutHighlight}
                      key={segmentIndex}
                      style={
                        { "--highlight-order": order } as CSSProperties
                      }
                    >
                      {segment.text}
                    </mark>
                  );
                })}
              </p>
            ))}
          </div>
        </section>

        <section className={styles.editorialMeta}>
          <InfoList
            title={content.labels.capabilities}
            items={content.capabilities}
          />
          <InfoList title={content.labels.languages} items={content.languages} />
          <div className={styles.editorialInfo}>
            <h2>{content.labels.education}</h2>
            <ul>
              {content.education.map((item) => (
                <li key={`${item.school}-${item.period}`}>
                  <strong>{item.degree}</strong>
                  <span>{item.school}</span>
                  <small>{item.period}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.career} aria-labelledby="career-title">
          <h2 id="career-title">{content.labels.career}</h2>
          <div className={styles.careerList}>
            {content.experiences.map((experience, index) => (
              <article className={styles.careerItem} key={experience.company}>
                <h3>{experience.role}</h3>
                <p className={styles.careerCompany}>
                  {experience.company}
                  {index === 0 && <small>{content.labels.current}</small>}
                </p>
                <p className={styles.careerPeriod}>{experience.period}</p>
                <p className={styles.careerSummary}>{experience.summary}</p>
                <div className={styles.tags}>
                  {experience.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.editorialInfo}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
