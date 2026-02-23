/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Inter, Space_Grotesk } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Lucas Lourenço | Desenvolvedor Full-Stack",
  description:
    "Sou Lucas Lourenço, desenvolvedor Full-Stack com mais de 8 anos de experiência criando soluções web modernas e de alta performance.",
  twitter: {
    card: "summary_large_image",
    site: "https://www.negotech.com.br/",
    title: "Lucas Lourenço | Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack com mais de 8 anos de experiência criando soluções web modernas.",
    images: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.negotech.com.br/",
    title: "Lucas Lourenço | Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack com mais de 8 anos de experiência criando soluções web modernas.",
    images: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3756614457960490');
            fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3756614457960490&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
