import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/Portfolio/AboutPage";
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
  return isLocale(lang) ? createPortfolioMetadata(lang, "about") : {};
}

export default async function AboutRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <AboutPage content={getPortfolioContent(lang)} />;
}
