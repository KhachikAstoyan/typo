import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import "@/styles/globals.css";
import { GlobalProvider } from "@/providers/GlobalProvider";
import Router from "next/router";
import "nprogress/nprogress.css";

let progressInterval: NodeJS.Timeout;

Router.events.on(
  "routeChangeStart",
  () => (progressInterval = setInterval(NProgress.start, 200))
);
Router.events.on("routeChangeComplete", () => {
  clearInterval(progressInterval);
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  clearInterval(progressInterval);
  NProgress.done();
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  );
};

export default MyApp;
