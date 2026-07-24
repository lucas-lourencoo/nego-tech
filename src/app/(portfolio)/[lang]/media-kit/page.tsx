import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaKitPage from "@/components/Portfolio/MediaKitPage";
import {
  getPortfolioContent,
  isLocale,
  locales,
} from "@/content/portfolio";
import { createPortfolioMetadata } from "@/lib/portfolio-metadata";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? createPortfolioMetadata(lang, "media-kit") : {};
}

export default async function MediaKitRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <MediaKitPage content={getPortfolioContent(lang)} />;
}
