import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";
const DefaultLayoutComponent = dynamic(() => import("@/components/layouts"));

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </NextHead>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DefaultLayoutComponent asPath={router.asPath}>
              <Component {...pageProps} />
            </DefaultLayoutComponent>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
