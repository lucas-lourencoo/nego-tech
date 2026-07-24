import type { Metadata } from "next";
import type { Locale } from "@/content/portfolio";
import type { PageSlug } from "@/components/Portfolio/types";

const siteUrl = "https://www.negotech.com.br";

const metadata = {
  en: {
    home: {
      title: "Lucas Lourenço — Software Engineer",
      description: "Building thoughtful software for complex products.",
    },
    about: {
      title: "About — Lucas Lourenço",
      description:
        "About Lucas Lourenço, his capabilities, languages, and education.",
    },
    projects: {
      title: "Projects — Lucas Lourenço",
      description:
        "Selected products, open-source projects, and client work by Lucas Lourenço.",
    },
    uses: {
      title: "Uses — Lucas Lourenço",
      description:
        "The hardware, software, apps, and AI tools Lucas Lourenço uses every day.",
    },
    contact: {
      title: "Contact — Lucas Lourenço",
      description: "Contact Lucas Lourenço through LinkedIn or email.",
    },
  },
  pt: {
    home: {
      title: "Lucas Lourenço — Engenheiro de Software",
      description: "Construindo software cuidadoso para produtos complexos.",
    },
    about: {
      title: "Sobre — Lucas Lourenço",
      description:
        "Conheça Lucas Lourenço, suas competências, idiomas e formação.",
    },
    projects: {
      title: "Projetos — Lucas Lourenço",
      description:
        "Uma seleção de produtos, projetos open source e trabalhos para clientes de Lucas Lourenço.",
    },
    uses: {
      title: "Uses — Lucas Lourenço",
      description:
        "O hardware, software, os aplicativos e as ferramentas de IA que Lucas Lourenço usa todos os dias.",
    },
    contact: {
      title: "Contato — Lucas Lourenço",
      description:
        "Entre em contato com Lucas Lourenço pelo LinkedIn ou e-mail.",
    },
  },
} as const;

export function createPortfolioMetadata(
  lang: Locale,
  page: PageSlug,
): Metadata {
  const { title, description } = metadata[lang][page];
  const suffix = page === "home" ? "" : `/${page}`;
  const canonical = `${siteUrl}/${lang}${suffix}`;
  const image = `${siteUrl}/51462903.png`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en${suffix}`,
        "pt-BR": `${siteUrl}/pt${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Lucas Lourenço",
      locale: lang === "en" ? "en_US" : "pt_BR",
      images: [{ url: image, width: 460, height: 460, alt: "Lucas Lourenço" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
