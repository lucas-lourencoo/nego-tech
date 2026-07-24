"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioContent } from "@/content/portfolio";
import { ArrowUpRight } from "../icons";
import styles from "../styles.module.css";
import type {
  ContributionDay,
  GitHubActivityResponse,
} from "./types";

type GitHubActivityCardProps = {
  copy: PortfolioContent["widgets"]["github"];
};

const githubUrl = "https://github.com/lucas-lourencoo";
const activityProviderUrl =
  "https://github-contributions-api.jogruber.de/v4/lucas-lourencoo?y=last";
const activityCacheKey = "portfolio-github-activity";

function contributionTitle(day: ContributionDay) {
  return `${day.date}: ${day.count}`;
}

export default function GitHubActivityCard({
  copy,
}: GitHubActivityCardProps) {
  const [activity, setActivity] = useState<GitHubActivityResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const cached = window.localStorage.getItem(activityCacheKey);
    if (cached) {
      try {
        const cachedActivity = JSON.parse(cached) as GitHubActivityResponse;
        queueMicrotask(() => setActivity(cachedActivity));
      } catch {
        window.localStorage.removeItem(activityCacheKey);
      }
    }

    const requestActivity = async () => {
      const response = await fetch("/api/github-activity", {
        signal: controller.signal,
      });
      if (response.ok) return response.json() as Promise<GitHubActivityResponse>;

      const fallback = await fetch(activityProviderUrl, {
        signal: controller.signal,
      });
      if (!fallback.ok) throw new Error("GitHub activity failed");
      const provider = (await fallback.json()) as {
        total: { lastYear: number };
        contributions: ContributionDay[];
      };
      return {
        total: provider.total.lastYear,
        contributions: provider.contributions,
      };
    };

    requestActivity()
      .then((data) => {
        setActivity(data);
        setFailed(false);
        window.localStorage.setItem(activityCacheKey, JSON.stringify(data));
      })
      .catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          !cached
        ) {
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  const contributions = useMemo(
    () => activity?.contributions.slice(-371) ?? [],
    [activity],
  );

  return (
    <a
      className={`${styles.liveCard} ${styles.githubCard}`}
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={copy.title}
    >
      <div className={styles.liveCardHeader}>
        <span>{copy.title}</span>
        <ArrowUpRight size={14} />
      </div>

      {failed ? (
        <p className={styles.widgetMessage}>{copy.unavailable}</p>
      ) : (
        <>
          <p className={styles.githubTotal}>
            {activity ? (
              <>
                <strong>{activity.total}</strong>{" "}
                {activity.total === 1
                  ? copy.contribution
                  : copy.contributions}
              </>
            ) : (
              <span className={styles.widgetLoading} aria-hidden="true" />
            )}
          </p>

          <div className={styles.contributionViewport}>
            <div className={styles.contributionGraph} aria-hidden="true">
              {contributions.length
                ? contributions.map((day) => (
                    <span
                      key={day.date}
                      className={styles.contributionDay}
                      data-level={day.level}
                      title={contributionTitle(day)}
                    />
                  ))
                : Array.from({ length: 154 }, (_, index) => (
                    <span
                      key={index}
                      className={`${styles.contributionDay} ${styles.contributionPlaceholder}`}
                    />
                  ))}
            </div>
          </div>

          <div className={styles.contributionLegend} aria-hidden="true">
            <span>{copy.less}</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <i key={level} data-level={level} />
            ))}
            <span>{copy.more}</span>
          </div>
        </>
      )}
    </a>
  );
}
