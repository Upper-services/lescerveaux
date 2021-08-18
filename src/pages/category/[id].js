import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Collection from "../../components/Collection";

function Category({ categoryPageData, title, categoryPageVideo }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>{/* <p>Initialising User...</p> */}</div>;
  }

  console.log(categoryPageData);
  console.log(categoryPageVideo);

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

  const categoryData = await fetch("https://jsonkeeper.com/b/CDO5").then(
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
