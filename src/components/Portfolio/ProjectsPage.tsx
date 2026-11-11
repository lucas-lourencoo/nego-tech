import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import Reveal from "./motion/Reveal";
import SpotlightCard from "./motion/SpotlightCard";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

export default function ProjectsPage({
  content,
}: {
  content: PortfolioContent;
}) {
  const { projects } = content;

  return (
    <SiteShell content={content} activePage="projects">
      <article className={styles.projectsPage}>
        <Reveal as="header" className={styles.projectsHeader}>
          <h1>{projects.title}</h1>
          <p>{projects.introduction}</p>
        </Reveal>

        <section className={styles.featuredSection}>
          <h2>{projects.featuredTitle}</h2>
          <div className={styles.featuredProjects}>
            {projects.featured.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.08}>
                <SpotlightCard
                  className={styles.featuredProject}
                  href={project.href}
                  ariaLabel={`${project.name} — ${project.category}`}
                >
                  <span>{project.category}</span>
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                  <ArrowUpRight />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.archiveSection}>
          <h2>{projects.archiveTitle}</h2>
          <div className={styles.projectArchive}>
            {projects.groups.map((group) => (
              <Reveal as="section" className={styles.projectGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((project, index) => (
                    <Reveal as="li" key={project.name} delay={index * 0.05}>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>
                          <strong>{project.name}</strong>
                          <small>{project.description}</small>
                        </span>
                        <span className={styles.projectMeta}>
                          {project.category}
                          <ArrowUpRight />
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
