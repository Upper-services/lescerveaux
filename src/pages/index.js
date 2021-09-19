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
import HomeCollection from "../components/HomeCollection";
import DOMPurify from "dompurify";

export default function Home({
  categoriesSSR,
  lesplusgrossuccèssurlescerveaux,
  laboîteàoutilsdelacommunauté,
  lescoupsdecoeurde100livresen1jour,
  tendancesactuelles,
  notresélectionpourvous,
  top10surlapplicationaujourdhui,
  arattrapermaintenant,
  lesTresorsDeGuerre,
}) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const subscription = useSelector(selectSubscription);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       if (!subscription) {
  //         router.push("/complete-purchase");
  //       }
  //     } else {
  //       router.push("https://www.lescerveaux.com/");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Testing subscription Active or No
  // const subscription = useSelector(selectSubscription);

  // useEffect(() => {
  //   if (user) {
  //     db.collection("customers")
  //       .doc(user?.uid)
  //       .collection("subscriptions")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach(async (subscription) => {
  //           dispatch(
  //             setSubscription({
  //               role: subscription.data().role,
  //               current_period_end:
  //                 subscription.data().current_period_end.seconds,
  //               current_period_start:
  //                 subscription.data().current_period_start.seconds,
  //               status: subscription.data().status,
  //             })
  //           );
  //         });
  //       });
  //   }
  // }, [user?.uid]);

  // ---------------------------------------------- Test Code Above ---------------------------------------------------------------

  const [categoriesSnapshot] = useCollection(
    db.collection("categories").orderBy("timestamp", "asc")
  );

  // const [bookmarksSnapshot] = useCollection(
  //   db.collection("customers").doc(user?.uid).collection("continuewatching")
  // );

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
    return <Loader />;
  }

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <div className="item">
          <Head>
            <title>Les Cerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          {user && (
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

              <div className="relative flex flex-col mt-24 mb-4 pl-5 md:pl-10 lg:pl-24 space-y-4">
                <HomeCollection
                  results={lesplusgrossuccèssurlescerveaux}
                  title="Les plus gros succès sur Les CERVEAUX"
                />
                <HomeCollection
                  results={lescoupsdecoeurde100livresen1jour}
                  title="Les coups de coeur de 100LivresEn1Jour"
                />
                <HomeCollection
                  results={tendancesactuelles}
                  title="Tendances actuelles"
                />
                <HomeCollection
                  results={notresélectionpourvous}
                  title="Notre sélection pour vous"
                />
                {/* <HomeCollection
                  results={top10surlapplicationaujourdhui}
                  title="Top 10 sur l'application aujourd'hui"
                /> */}
                <HomeCollection
                  results={laboîteàoutilsdelacommunauté}
                  title="La boîte à outils de la communauté"
                />
                <HomeCollection
                  results={lesTresorsDeGuerre}
                  title="Les trésors de guerre"
                />{" "}
              </div>
            </main>
          )}
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const categoriesSnapshot = await db
    .collection("categories")
    .orderBy("timestamp", "asc")
    .get();

  const docs = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Les plus gros succès sur Les CERVEAUX - LIVRES => lesleçonsvidéosprivéesdufondateur
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

  // Nouveautés - LIVRES => 71livresenunevidéo
  const seventyOnelivresenunevidéo = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("71livresenunevidéo")
    .collection("results")
    .doc("74livresenuneseulevidéo")
    .get();

  const nouveautés = [seventyOnelivresenunevidéo.data()];

  // Les coups de coeur de 100LivresEn1Jour - MONTAGE => GRAPHISME => COMMUNAUTE
  const lesprestationsrécentesdAntoine = await db
    .collection("categories")
    .doc("montage")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesd'Antoine")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const lesprestationsrécentesdemarin = await db
    .collection("categories")
    .doc("montage")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdemarin")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const lescoupsdecoeurde100livresen1jour = [
    lesprestationsrécentesdAntoine.data(),
    lesprestationsrécentesdemarin.data(),
  ];

  // Tendances actuelles - SITEWEB => VENTE
  const lesprestationsrécentesdemickaël = await db
    .collection("categories")
    .doc("siteweb")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdemickaël")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const suivipersonnaliséaveclefondateur = await db
    .collection("categories")
    .doc("vente")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdeyounèsettony")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const suivipersonnaliséaveclefondateur2 = await db
    .collection("categories")
    .doc("vente")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdeyounèsettony")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur2")
    .get();

  const tendancesactuelles = [
    lesprestationsrécentesdemickaël.data(),
    suivipersonnaliséaveclefondateur.data(),
    suivipersonnaliséaveclefondateur2.data(),
  ];

  // Notre sélection pour vous - CONQUETES => COIFFURE
  const lesprestationsrécentesdegeoffrey = await db
    .collection("categories")
    .doc("conquetes")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdegeoffrey")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const lesprestationsrécentesdeslimane = await db
    .collection("categories")
    .doc("coiffure")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdeslimane")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const notresélectionpourvous = [
    lesprestationsrécentesdegeoffrey.data(),
    lesprestationsrécentesdeslimane.data(),
  ];

  // Top 10 sur l'application aujourd'hui - NUTRITION
  const lesprestationsrécentesdemorganaldo = await db
    .collection("categories")
    .doc("nutrition")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdemorganaldo")
    .collection("results")
    .get();

  const lesprestationsrécentesdemorganaldoDocs =
    lesprestationsrécentesdemorganaldo.docs.map((doc) => ({
      ...doc.data(),
    }));

  const lesprestationsrécentesdebenoît = await db
    .collection("categories")
    .doc("nutrition")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdebenoît")
    .collection("results")
    .get();

  const lesprestationsrécentesdebenoîtDocs =
    lesprestationsrécentesdebenoît.docs.map((doc) => ({
      ...doc.data(),
    }));

  const top10surlapplicationaujourdhui = [
    lesprestationsrécentesdemorganaldoDocs,
    lesprestationsrécentesdebenoîtDocs,
  ];

  // Parce que vous avez aimé

  // À rattraper maintenant - MUSCULATION
  const lesprestationsrécentesdangel = await db
    .collection("categories")
    .doc("musculation")
    .collection("categoryPageData")
    .doc("lesprestationsrécentesdangel")
    .collection("results")
    .doc("suivipersonnaliséaveclefondateur")
    .get();

  const arattrapermaintenant = [lesprestationsrécentesdangel.data()];

  // La boîte à outils de la communauté - LIVRES
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

  return {
    props: {
      categoriesSSR: docs,
      lesplusgrossuccèssurlescerveaux: lesleçonsvidéosprivéesdufondateurDocs,
      // nouveautés,
      laboîteàoutilsdelacommunauté: lesguidespratiquesdenadirDocs,
      lescoupsdecoeurde100livresen1jour,
      tendancesactuelles,
      notresélectionpourvous,
      top10surlapplicationaujourdhui,
      // arattrapermaintenant,
      lesTresorsDeGuerre: lesTresorsDeGuerreDocs,
    },
  };
}
