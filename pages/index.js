import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [session] = useSession();
  const [userLoggedOut, setUserLoggedOut] = useState(false);
  console.log(session);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>lescerveaux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SignedOut>{!session ? "Loading..." : <div>APP</div>}</SignedOut>
      <SignedIn>APP</SignedIn>
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
