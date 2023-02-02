import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
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
    </Fragment>
  );
}
