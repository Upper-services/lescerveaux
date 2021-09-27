import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/playAnimation.css";

import { Provider as AuthProvider } from "next-auth/client";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import Head from "next/head";

const progress = new ProgressBar({
  size: 4,
  className: "z-50 bg-blue-600",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
