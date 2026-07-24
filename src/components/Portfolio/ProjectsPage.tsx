import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
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
        <header className={styles.projectsHeader}>
          <h1>{projects.title}</h1>
          <p>{projects.introduction}</p>
        </header>

        <section className={styles.featuredSection}>
          <h2>{projects.featuredTitle}</h2>
          <div className={styles.featuredProjects}>
            {projects.featured.map((project) => (
              <a
                className={styles.featuredProject}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
                aria-label={`${project.name} — ${project.category}`}
              >
                <span>{project.category}</span>
                <strong>{project.name}</strong>
                <p>{project.description}</p>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section className={styles.archiveSection}>
          <h2>{projects.archiveTitle}</h2>
          <div className={styles.projectArchive}>
            {projects.groups.map((group) => (
              <section className={styles.projectGroup} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((project) => (
                    <li key={project.name}>
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
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
