import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/components/Portfolio/ContactPage";
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
  return isLocale(lang) ? createPortfolioMetadata(lang, "contact") : {};
}

export default async function ContactRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ContactPage content={getPortfolioContent(lang)} />;
}
