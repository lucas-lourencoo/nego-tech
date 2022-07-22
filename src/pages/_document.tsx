import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: sheet.getStyleElement(),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta
            name="title"
            content="Nego Tech | Fullstack Dev - Web Designer"
          />
          <meta
            name="description"
            content="Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.negotech.com.br/" />
          <meta
            property="og:title"
            content="Nego Tech | Fullstack Dev - Web Designer"
          />
          <meta
            property="og:description"
            content="Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?"
          />
          <meta property="og:image" content="/logo.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.negotech.com.br/" />
          <meta
            property="twitter:title"
            content="Nego Tech | Fullstack Dev - Web Designer"
          />
          <meta
            property="twitter:description"
            content="Eu sou Lucas Lourenço, e quero te ajudar com soluções de programação WEB e tecnologia em geral. Vamos começar?"
          />
          <meta property="twitter:image" content="/logo.png"></meta>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Roboto:wght@100;400;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-FXPTBY2QE2`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXPTBY2QE2', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3626015253465428"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
