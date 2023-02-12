import { NextFont } from "@next/font";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Roboto } from "@next/font/google";
import "../styles/globals.css";

const roboto: NextFont = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Head>
        <title>BioMaker</title>
        <meta
          name="description"
          content="Generate biographies with BioMaker, you can customise the biography to fit your skills and choice of style."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/JoelKong/BioMaker/main/public/favicon.ico"
        />
      </Head>

      <Component {...pageProps} />
    </main>
  );
}
