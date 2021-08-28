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
import { useDocumentOnce } from "react-firebase-hooks/firestore";

function Category() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const { title } = router.query;
  const [categoryPageData, setCategoryPageData] = useState([]);

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
    const snapshot = await db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .get();
    return setCategoryPageData(snapshot.docs.map((doc) => doc.data()));
  }, []);

  const [categoryPageVideo] = useDocumentOnce(
    db.collection("categories").doc(title)
  );

  if (loading) {
    return <div>{/* <p>Initialising User...</p> */}</div>;
  }

  return (
    <div>
      <Head>
        <title>Category </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {user && (
        <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          <div className="pt-44 lg:pt-[400px] xl:pt-[460px]">
            {categoryPageData.map(({ categoryId, categoryTitle }) => (
              <Collection
                categoryId={categoryId}
                categoryTitle={categoryTitle}
                key={categoryId}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default Category;
