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

function Category({ categoryPageData, title, categoryPageVideo }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

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
          {categoryPageData.map(({ categoryId, categoryTitle, results }) => (
            <Collection
              categoryId={categoryId}
              categoryTitle={categoryTitle}
              key={categoryId}
              results={results}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default Category;

export async function getServerSideProps(context) {
  const { title } = context.query;

  const categoryData = await fetch("https://jsonkeeper.com/b/3AAM").then(
    (res) => res.json()
  );

  return {
    props: {
      categoryPageVideo: categoryData.filter((item) => item.title === title)[0]
        .video,
      categoryPageData: categoryData.filter((item) => item.title === title)[0]
        .categoryPageData,
      title,
    },
  };
}
