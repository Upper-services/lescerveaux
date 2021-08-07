import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Fade from "react-reveal/Fade";

export default function Home() {
  const [session] = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="item">
        <Head>
          <title>lescerveaux</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />

            <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
              <Slider />
              <Brands />
            </main>
          </>
        )}
      </div>
    </motion.div>
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
