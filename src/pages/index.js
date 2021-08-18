import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import { useState } from "react";
import Slider from "../components/Slider";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Collection from "../components/Collection";
import Category from "../components/Category";
import { useRouter } from "next/router";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home({ categoriesData, collectionData }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

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

  if (loading) {
    return <div>{/* <p>Initialising User...</p> */}</div>;
  }

  console.log(categoriesData);

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <div className="item">
          <Head>
            <title>lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />
          {user && (
            <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
              <Slider />
              <section className="grid grid-cols-3 items-center justify-center md:grid-cols-6 mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
                {categoriesData.map(({ title, img, id }) => (
                  <Category title={title} img={img} key={id} id={id} />
                ))}
              </section>
              {collectionData.map((item) => (
                <Collection
                  title={item.title}
                  key={item.id}
                  images={item.images}
                />
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
          )}
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const categoriesData = await fetch("https://jsonkeeper.com/b/CDO5").then(
    (res) => res.json()
  );

  const collectionData = await fetch("https://jsonkeeper.com/b/UPWR").then(
    (res) => res.json()
  );

  return {
    props: {
      categoriesData,
      collectionData,
    },
  };
}
