import { NextFont } from "@next/font";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "@next/font/google";
import "../styles/globals.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <title>BioMaker</title>
        <meta
          name="description"
          content="Generate a professional bio or any other selected themes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </main>
  );
}
