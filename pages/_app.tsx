import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PageWrapper } from "@/layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageWrapper>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </PageWrapper>
  );
}
