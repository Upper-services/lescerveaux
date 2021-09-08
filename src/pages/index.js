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
import { useCollection } from "react-firebase-hooks/firestore";
import Loader from "../components/Loader";
import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";

export default function Home({
  collectionData,
  categoriesSSR,
  lesTresorsDeGuerre,
  lesleçonsvidéosprivéesdufondateur,
  seventyOnelivresenunevidéo,
  lesguidespratiquesdenadir,
}) {
  console.log(lesTresorsDeGuerre);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);

  // User redirects to landing page team where they choose to signup or login
  // useEffect(() => {
  //   if (!user) {
  //     router.push("https://lescerveaux.com/");
  //   }
  // }, [user]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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

  const [categoriesSnapshot] = useCollection(
    db.collection("categories").orderBy("timestamp", "asc")
  );

  const [bookmarksSnapshot] = useCollection(
    db.collection("customers").doc(user?.uid).collection("continuewatching")
  );

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

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <div className="item">
          <Head>
            <title>Les Cerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          {user && (subscription?.status === "active" || "trialing") && (
            <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] top-[72px]">
              <Slider />
              <Fade bottom>
                <section className="grid grid-cols-3 items-center justify-center md:grid-cols-6 mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
                  {categoriesSSR.map((doc) => {
                    const { title, img, id } = doc;
                    return (
                      <Category title={title} img={img} key={id} id={id} />
                    );
                  })}
                </section>
              </Fade>

              <div className="relative flex flex-col mt-24 mb-4 pl-5 md:pl-10 lg:pl-24">
                <h2 className="font-semibold text-base sm:text-lg lg:text-xl p-2 pb-0">
                  Les plus gros succès sur Les CERVEAUX
                </h2>
                <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                  {lesleçonsvidéosprivéesdufondateur.map(
                    ({
                      resultId,
                      resultDescription,
                      resultPageImage,
                      resultTitle,
                      thumbnailImg,
                    }) => (
                      <Thumbnail
                        key={resultId}
                        categoryTitle="livres"
                        resultId={resultId}
                        categoryId="lesleçonsvidéosprivéesdufondateur"
                        thumbnailImg={thumbnailImg}
                        resultTitle={resultTitle}
                      />
                    )
                  )}
                </FlipMove>
                <br />
                <br />

                <h2 className="font-semibold text-base sm:text-lg lg:text-xl p-2 pb-0">
                  Nouveautés
                </h2>
                <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                  {seventyOnelivresenunevidéo.map(
                    ({
                      resultId,
                      resultDescription,
                      resultPageImage,
                      resultTitle,
                      thumbnailImg,
                    }) => (
                      <Thumbnail
                        key={resultId}
                        categoryTitle="livres"
                        resultId={resultId}
                        categoryId="lestrésorsdeguerre"
                        thumbnailImg={thumbnailImg}
                        resultTitle={resultTitle}
                      />
                    )
                  )}
                </FlipMove>
                <br />
                <br />

                <h2 className="font-semibold text-base sm:text-lg lg:text-xl p-2 pb-0">
                  La boîte à outils de la communauté
                </h2>
                <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                  {lesguidespratiquesdenadir.map(
                    ({
                      resultId,
                      resultDescription,
                      resultPageImage,
                      resultTitle,
                      thumbnailImg,
                    }) => (
                      <Thumbnail
                        key={resultId}
                        categoryTitle="livres"
                        resultId={resultId}
                        categoryId="lesguidespratiquesdenadir"
                        thumbnailImg={thumbnailImg}
                        resultTitle={resultTitle}
                      />
                    )
                  )}
                </FlipMove>

                <br />
                <br />

                <h2 className="font-semibold text-base sm:text-lg lg:text-xl p-2 pb-0">
                  Les trésors de guerre
                </h2>
                <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                  {lesTresorsDeGuerre.map(
                    ({
                      resultId,
                      resultDescription,
                      resultPageImage,
                      resultTitle,
                      thumbnailImg,
                    }) => (
                      <Thumbnail
                        key={resultId}
                        categoryTitle="livres"
                        resultId={resultId}
                        categoryId="lestrésorsdeguerre"
                        thumbnailImg={thumbnailImg}
                        resultTitle={resultTitle}
                      />
                    )
                  )}
                </FlipMove>

                {collectionData.map((item) => (
                  <h2
                    className="font-semibold my-8 text-lg p-2 pb-0"
                    key={item.title}
                  >
                    {item.title}
                  </h2>
                ))}
              </div>
            </main>
          )}
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const collectionData = await fetch("https://jsonkeeper.com/b/RV7Y").then(
    (res) => res.json()
  );

  const categoriesSnapshot = await db
    .collection("categories")
    .orderBy("timestamp", "asc")
    .get();

  const docs = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lesTresorsDeGuerre = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("lestrésorsdeguerre")
    .collection("results")
    .get();

  const lesTresorsDeGuerreDocs = lesTresorsDeGuerre.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lesleçonsvidéosprivéesdufondateur = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("lesleçonsvidéosprivéesdufondateur")
    .collection("results")
    .get();

  const lesleçonsvidéosprivéesdufondateurDocs =
    lesleçonsvidéosprivéesdufondateur.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  const seventyOnelivresenunevidéo = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("71livresenunevidéo")
    .collection("results")
    .get();

  const seventyOnelivresenunevidéoDocs = seventyOnelivresenunevidéo.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  // Les coups de coeur de 100LivresEn1Jour - MONTAGE => GRAPHISME => COMMUNAUTE

  // Tendances actuelles - SITEWEB => VENTE

  // Notre sélection pour vous - CONQUETES => COIFFURE

  // Top 10 sur l'application aujourd'hui - NUTRITION

  // Parce que vous avez aimé

  // À rattraper maintenant - MUSCULATION

  const lesguidespratiquesdenadir = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("lesguidespratiquesdenadir")
    .collection("results")
    .get();

  const lesguidespratiquesdenadirDocs = lesguidespratiquesdenadir.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  // Les trésors de guerre

  return {
    props: {
      categoriesSSR: docs,
      lesTresorsDeGuerre: lesTresorsDeGuerreDocs,
      lesleçonsvidéosprivéesdufondateur: lesleçonsvidéosprivéesdufondateurDocs,
      seventyOnelivresenunevidéo: seventyOnelivresenunevidéoDocs,
      lesguidespratiquesdenadir: lesguidespratiquesdenadirDocs,
      collectionData,
    },
  };
}
