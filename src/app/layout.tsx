/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Nunito, Roboto } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

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
    "Sou Lucas Lourenço e quero te ajudar com soluções de programação WEB. Vamos começar?",
  twitter: {
    card: "summary_large_image",
    site: "https://www.negotech.com.br/",
    title: "Nego Tech",
    description:
      "Sou Lucas Lourenço e quero te ajudar com soluções de programação WEB. Vamos começar?",
    images: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.negotech.com.br/",
    title: "Nego Tech",
    description:
      "Sou Lucas Lourenço e quero te ajudar com soluções de programação WEB. Vamos começar?",
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
