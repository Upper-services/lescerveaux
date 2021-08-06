import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  const [session] = useSession();
  console.log(session);

  return (
    <div className="">
      <Head>
        <title>lescerveaux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
