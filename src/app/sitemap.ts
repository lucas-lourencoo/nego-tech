import type { MetadataRoute } from "next";

const siteUrl = "https://www.negotech.com.br";
const languages = ["en", "pt"] as const;
const pages = ["", "/about", "/projects", "/uses", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((language) =>
    pages.map((page) => ({
      url: `${siteUrl}/${language}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/en${page}`,
          "pt-BR": `${siteUrl}/pt${page}`,
        },
      },
    })),
  );
}
