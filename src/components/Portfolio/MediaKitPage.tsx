import Image from "next/image";
import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import SiteShell from "./SiteShell";
import styles from "./styles.module.css";

const contactLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lucas_lourencoo_/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@lucas_lourenco",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-lourenco2802/",
  },
  {
    label: "GitHub",
    href: "https://github.com/lucas-lourencoo",
  },
];

export default function MediaKitPage({
  content,
}: {
  content: PortfolioContent;
}) {
  const { mediaKit } = content;

  return (
    <SiteShell content={content} activePage="media-kit">
      <article className={styles.mediaKitPage}>
        <header className={styles.mediaKitHeader}>
          <span>{mediaKit.eyebrow}</span>
          <h1>{mediaKit.title}</h1>
          <p>{mediaKit.introduction}</p>
        </header>

        <section className={styles.mediaSection}>
          <div className={styles.mediaSectionHeading}>
            <span>01.</span>
            <h2>{mediaKit.audienceTitle}</h2>
          </div>
          <div className={styles.mediaMetrics}>
            {mediaKit.audience.map((metric) => (
              <a
                href={metric.href}
                target="_blank"
                rel="noreferrer"
                key={metric.label}
              >
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
          <div className={styles.mediaHighlight}>
            <strong>{mediaKit.highlight.value}</strong>
            <span>{mediaKit.highlight.label}</span>
          </div>
        </section>

        <section className={styles.mediaSection}>
          <div className={styles.mediaSectionHeading}>
            <span>02.</span>
            <h2>{mediaKit.videosTitle}</h2>
          </div>
          <div className={styles.mediaVideos}>
            {mediaKit.videos.map((video) => (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                key={video.id}
              >
                <div className={styles.mediaVideoImage}>
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={360}
                    unoptimized
                  />
                </div>
                <span>{video.views}</span>
                <strong>{video.title}</strong>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.mediaSection} ${styles.mediaLinks}`}>
          <div className={styles.mediaSectionHeading}>
            <span>03.</span>
            <h2>{mediaKit.linksTitle}</h2>
          </div>
          <div>
            {contactLinks.map((link) => (
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                key={link.label}
              >
                {link.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
