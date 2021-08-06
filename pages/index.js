import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import Landing from "../components/Landing";

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

      {!session ? (
        <Landing />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2>User's Email: {session.user.email}</h2>
          <h2>User's Name: {session.user.name}</h2>
        </div>
      )}
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
