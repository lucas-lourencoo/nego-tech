import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nego Tech</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
