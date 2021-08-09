import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Collection from "../components/Collection";
import SmallCard from "../components/SmallCard";

export default function Home({ categoriesData, collectionData }) {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
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
              <section className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
                {categoriesData.map((item) => (
                  <SmallCard img={item.img} />
                ))}
              </section>
              {collectionData.map((item) => (
                <Collection title={item.title} />
              ))}
              {/* SHOW MORE BTN */}

              {/* TMDB API BTN SWITCHER */}
              {/* <div>
                <Collection title="100LivresEn1Jour" />
                <Collection title="100VisuelsEn1Jour" />
                <Collection title="100VidéosEn1Jour" />
                <Collection title="100FansEn1Jour" />
                <Collection title="100ClicsEn1Jour" />
                <Collection title="100PaiementsEn1Jour" />
                <Collection title="100PompesEn1Jour" />
                <Collection title="100RemèdesEn1Jour" />
                <Collection title="100NumérosEn1Jour" />
                <Collection title="SansImpôtsEn1Jour" />
              </div> */}
              {/* SHOW LESS BTN */}
            </main>
          </>
        )}
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const categoriesData = await fetch("https://jsonkeeper.com/b/HMV1").then(
    (res) => res.json()
  );

  const collectionData = await fetch("https://jsonkeeper.com/b/UTDR").then(
    (res) => res.json()
  );

  return {
    props: {
      session,
      categoriesData,
      collectionData,
    },
  };
}
