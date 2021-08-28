import Head from "next/head";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { motion } from "framer-motion";
import Collection from "../components/Collection";
import Category from "../components/Category";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Fade from "react-reveal/Fade";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Plans from "../components/Plans";
import router from "next/router";
import Link from "next/link";

export default function Home({ categoriesData, collectionData }) {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const [showPlans, setShowPlans] = useState(false);
  const [categories, setCategories] = useState([]);

  // User redirects to landing page team where they choose to signup or login
  // useEffect(() => {
  //   if (!user) {
  //     router.push("https://lescerveaux.com/");
  //   }
  // }, [user]);

  // Testing subscription Active or No
  const subscription = useSelector(selectSubscription);

  useEffect(() => {
    if (user) {
      db.collection("customers")
        .doc(user?.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            dispatch(
              setSubscription({
                role: subscription.data().role,
                current_period_end:
                  subscription.data().current_period_end.seconds,
                current_period_start:
                  subscription.data().current_period_start.seconds,
                status: subscription.data().status,
              })
            );
          });
        });
    }
  }, [user?.uid]);

  // ---------------------------------------------- Test Code Above ---------------------------------------------------------------

  useEffect(async () => {
    const snapshot = await db.collection("categories").get();
    return setCategories(snapshot.docs.map((doc) => doc.data()));
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

  if (loading) {
    return <div>{/* <p>Initialising User...</p> */}</div>;
  }

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <div className="item">
          <Head>
            <title>lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          {user && subscription?.status === "active" && (
            <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
              <Slider />
              <Fade bottom>
                <section className="grid grid-cols-3 items-center justify-center md:grid-cols-6 mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
                  {categories.map(({ title, img, id, video }) => (
                    <Category title={title} img={img} key={id} id={id} />
                  ))}
                </section>
              </Fade>

              {/* {collectionData.map((item) => (
                <Collection
                  title={item.title}
                  key={item.id}
                  images={item.images}
                />
              ))} */}
            </main>
          )}
        </div>
      </motion.div>
    </>
  );
}
