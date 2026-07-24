import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import { getPortfolioContent, isLocale, locales } from "@/content/portfolio";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://www.negotech.com.br";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const content = getPortfolioContent(lang);
  const title =
    lang === "en"
      ? "Lucas Lourenço — Software Engineer"
      : "Lucas Lourenço — Engenheiro de Software";
  const description = content.hero.description;
  const canonical = `${siteUrl}/${lang}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        "pt-BR": `${siteUrl}/pt`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Lucas Lourenço",
      locale: lang === "en" ? "en_US" : "pt_BR",
      images: [
        {
          url: "https://www.negotech.com.br/51462903.png",
          width: 460,
          height: 460,
          alt: "Lucas Lourenço",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.negotech.com.br/51462903.png"],
    },
  };
}

export default async function PortfolioLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
