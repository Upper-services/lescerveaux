import Head from "next/head";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
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
import { Video, CloudinaryContext } from "cloudinary-react";
import tawkTo from "tawkto-react";

export default function Home({
  categoriesSSR,
  lesplusgrossuccèssurlescerveaux,
  nouveautés,
  mes47trésorsdeguerreDocs,
  tendancesactuelles,
  notresélectionpourvous,
}) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const subscription = useSelector(selectSubscription);

  // const [bookmarksSnapshot] = useCollection(
  //   db.collection("customers").doc(user?.uid).collection("continuewatching")
  // );

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

  // Tawk.to live support
  const tawkToPropertyId = "6150888025797d7a8900e45b";
  const tawkToKey = "1fgh9ae11";

  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, []);

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

          {user && (
            <main className="relative min-h-screen after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] top-[72px]">
              <Slider />
              <Fade bottom>
                <section className="grid grid-cols-3 items-center justify-center md:grid-cols-5 mt-10 gap-6 gap-y-7 px-8 max-w-[1400px] mx-auto">
                  {categoriesSSR.map((doc) => {
                    const { title, img, id } = doc;
                    return (
                      <Category title={title} img={img} key={id} id={id} />
                    );
                  })}
                </section>
              </Fade>

              <div className="relative flex flex-col mt-10 mb-4 pl-5 md:pl-10 lg:pl-24">
                <HomeCollection
                  results={lesplusgrossuccèssurlescerveaux}
                  title="Les Plus Gros Succès sur Les CERVEAUX"
                />
                <HomeCollection title="Nouveautés" results={nouveautés} />
                <HomeCollection
                  results={mes47trésorsdeguerreDocs}
                  title="Les Coups De Coeur de 100LivresEn1Jour"
                />
                <HomeCollection
                  results={tendancesactuelles}
                  title="Tendances Actuelles"
                />
                <HomeCollection
                  results={notresélectionpourvous}
                  title="Notre Sélection pour Vous"
                />
                {/* <HomeCollection
                  results={top10surlapplicationaujourdhui}
                  title="Top 10 sur l'Application Aujourd'hui"
                />
                <HomeCollection
                  results={laboîteàoutilsdelacommunauté}
                  title="La Boîte À Outils de La Communauté"
                />
                <HomeCollection
                  results={lesTresorsDeGuerre}
                  title="Les Trésors De Guerre"
                />{" "} */}
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

  // Les plus gros succès sur Les CERVEAUX
  const lesleçonsvidéosprivéesdufondateur = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("lessecretsde375livres")
    .collection("results")
    .get();

  const lesleçonsvidéosprivéesdufondateurDocs =
    lesleçonsvidéosprivéesdufondateur.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  // Nouveautés
  const percersurtiktok = await db
    .collection("categories")
    .doc("communaute")
    .collection("categoryPageData")
    .doc("mesméthodespourdépasserlemilliond'abonnés")
    .collection("results")
    .doc("percersurtiktok")
    .get();

  const linfluencedesréseauxsociauxenmusculation = await db
    .collection("categories")
    .doc("musculation")
    .collection("categoryPageData")
    .doc("lesnon-ditsdelamusculation")
    .collection("results")
    .doc("l'influencedesréseauxsociauxenmusculation")
    .get();

  const décryptagedelapprochedanslaruedufondateur = await db
    .collection("categories")
    .doc("seduction")
    .collection("categoryPageData")
    .doc("nosmeilleursmomentsenlive")
    .collection("results")
    .doc("décryptagedel'approchedanslaruedufondateur")
    .get();

  const nouveautés = [
    percersurtiktok.data(),
    linfluencedesréseauxsociauxenmusculation.data(),
    décryptagedelapprochedanslaruedufondateur.data(),
  ];

  // Les coups de coeur de 100LivresEn1Jour
  const mes47trésorsdeguerre = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("mes47trésorsdeguerre")
    .collection("results")
    .get();

  const mes47trésorsdeguerreDocs = mes47trésorsdeguerre.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Tendances actuelles
  const commentlindustrieagroalimentairenousempoisonne = await db
    .collection("categories")
    .doc("sante")
    .collection("categoryPageData")
    .doc("mescomplémentsalimentairespréférés")
    .collection("results")
    .doc("commentl’industrieagroalimentairenousempoisonne")
    .get();

  const lesbasesdusommeil = await db
    .collection("categories")
    .doc("sante")
    .collection("categoryPageData")
    .doc("àappliquerdèscettenuit")
    .collection("results")
    .doc("lesbasesdusommeil")
    .get();

  const les5mythesducopywriting = await db
    .collection("categories")
    .doc("vente")
    .collection("categoryPageData")
    .doc("lesindispensablesd'untextequiconvertit")
    .collection("results")
    .doc("les5mythesducopywriting")
    .get();

  const vidéo0avecnadir = await db
    .collection("categories")
    .doc("communaute")
    .collection("categoryPageData")
    .doc("j'étudievosprofilsdeaàz")
    .collection("results")
    .doc("vidéo0avecnadir")
    .get();

  const tendancesactuelles = [
    commentlindustrieagroalimentairenousempoisonne.data(),
    lesbasesdusommeil.data(),
    les5mythesducopywriting.data(),
    vidéo0avecnadir.data(),
  ];

  // Notre sélection pour vous
  const comprendrelesbesoinsfémininpourmieuxséduire = await db
    .collection("categories")
    .doc("seduction")
    .collection("categoryPageData")
    .doc("réussirsespremièresapproches")
    .collection("results")
    .doc("comprendrelesbesoinsfémininpourmieuxséduire")
    .get();

  const orian = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("cequepensentlescerveauxdenadirmessaï")
    .collection("results")
    .doc("orian")
    .get();

  const maitriserlesbasesdelimpôt = await db
    .collection("categories")
    .doc("fiscalite")
    .collection("categoryPageData")
    .doc("lesclichésdel'impôtenfrance")
    .collection("results")
    .doc("maitriserlesbasesdel'impôt")
    .get();

  const lesleviersindispensablesdunepublicitéquifonctionne = await db
    .collection("categories")
    .doc("publicite")
    .collection("categoryPageData")
    .doc("mesmodèlesgagnants")
    .collection("results")
    .doc("lesleviersindispensablesd’unepublicitéquifonctionne")
    .get();

  const louisaxel = await db
    .collection("categories")
    .doc("livres")
    .collection("categoryPageData")
    .doc("cequepensentlescerveauxdenadirmessaï")
    .collection("results")
    .doc("louis-axel")
    .get();

  const notresélectionpourvous = [
    comprendrelesbesoinsfémininpourmieuxséduire.data(),
    orian.data(),
    maitriserlesbasesdelimpôt.data(),
    lesleviersindispensablesdunepublicitéquifonctionne.data(),
    louisaxel.data(),
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
      nouveautés,
      mes47trésorsdeguerreDocs,
      // lescoupsdecoeurde100livresen1jour,
      tendancesactuelles,
      notresélectionpourvous,
      // top10surlapplicationaujourdhui,
      // arattrapermaintenant,
      // lesTresorsDeGuerre: lesTresorsDeGuerreDocs,
    },
  };
}
