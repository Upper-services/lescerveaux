import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Collection from "../../components/Collection";
import { selectSubscription, setSubscription } from "../../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDocumentOnce,
  useCollection,
  useDocument,
} from "react-firebase-hooks/firestore";

function Category({ snapshotSSR, categoryPageDataSSR }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { title } = router.query;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/");
      }
    });

    return unsubscribe;
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

  const [snapshot] = useCollection(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .orderBy("timestamp", "asc")
  );

  const [categoryPageData] = useDocument(
    db.collection("categories").doc(title)
  );

  return (
    <div>
      <Head>
        <title> {categoryPageDataSSR.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <>
          <img
            src={categoryPageDataSSR.categoryPageImage}
            // src="/images/testing.jpeg"
            alt=""
            className="min-h-screen absolute inset-0 z-[-1] object-cover opacity-60"
            loading="lazy"
          />

          <Header transparent />
          <main className="">
            <div className="pt-44 lg:pt-[400px] xl:pt-[500px]">
              {snapshotSSR.map((doc) => {
                const { categoryId, categoryTitle } = doc;
                return (
                  <Collection
                    key={categoryId}
                    categoryId={categoryId}
                    categoryTitle={categoryTitle}
                  />
                );
              })}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default Category;

export async function getServerSideProps(context) {
  const { title } = context.query;

  const categoryPageData = await db.collection("categories").doc(title).get();

  const doc = {
    id: categoryPageData.id,
    ...categoryPageData.data(),
  };

  const snapshot = await db
    .collection("categories")
    .doc(title)
    .collection("categoryPageData")
    .orderBy("timestamp", "asc")
    .get();

  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { snapshotSSR: docs, categoryPageDataSSR: doc },
  };
}
