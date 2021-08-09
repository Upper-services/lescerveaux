import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
