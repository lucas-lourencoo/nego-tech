import { NextResponse } from "next/server";
import type {
  ContributionDay,
  GitHubActivityResponse,
} from "@/components/Portfolio/live-widgets/types";

const GITHUB_ACTIVITY_URL =
  "https://github-contributions-api.jogruber.de/v4/lucas-lourencoo?y=last";
const CACHE_SECONDS = 60 * 60 * 6;

type ProviderResponse = {
  total?: { lastYear?: number };
  contributions?: ContributionDay[];
};

export async function GET() {
  try {
    const response = await fetch(GITHUB_ACTIVITY_URL, {
      next: { revalidate: CACHE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`GitHub activity returned ${response.status}`);
    }

    const provider = (await response.json()) as ProviderResponse;
    const contributions = Array.isArray(provider.contributions)
      ? provider.contributions.filter(
          (day) =>
            typeof day.date === "string" &&
            Number.isFinite(day.count) &&
            Number.isInteger(day.level) &&
            day.level >= 0 &&
            day.level <= 4,
        )
      : [];

    if (!contributions.length) {
      throw new Error("GitHub activity has no contribution days");
    }

    const payload: GitHubActivityResponse = {
      total: Number.isFinite(provider.total?.lastYear)
        ? Number(provider.total?.lastYear)
        : contributions.reduce((sum, day) => sum + day.count, 0),
      contributions,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 502 },
    );
  }
}
