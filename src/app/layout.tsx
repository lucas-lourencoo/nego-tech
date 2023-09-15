import { Nunito, Roboto } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { Metadata } from "next";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const roboto = Roboto({
  weight: ["100", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Nego Tech",
  description:
    "Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?",
  twitter: {
    card: "summary_large_image",
    site: "https://www.negotech.com.br/",
    title: "Nego Tech",
    description:
      "Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?",
    images: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.negotech.com.br/",
    title: "Nego Tech",
    description:
      "Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?",
    images: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${nunito.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
