import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <NextHead>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </NextHead>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
