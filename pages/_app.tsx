import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
const DefaultLayoutComponent = dynamic(() => import("@/components/layouts"));

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </NextHead>
      <SessionProvider session={session}>
        <DefaultLayoutComponent asPath={router.asPath}>
          <Component {...pageProps} />
        </DefaultLayoutComponent>
      </SessionProvider>
    </>
  );
}
