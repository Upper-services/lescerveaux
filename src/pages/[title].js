import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/Header";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";

function Course({ courseData }) {
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);

  console.log(router.query);

  return (
    <div>
      <div className="relative">
        <Head>
          <title></title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            {/* <Image
                src={}
                layout="fill"
                objectFit="cover"
              /> */}
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold"></h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <PlusIcon className="h-6" />
              </div>

              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>

            <p className="text-xs md:text-sm"></p>
            <h4 className="text-sm md:text-lg max-w-4xl"></h4>
          </div>

          {/* Bg Overlay */}
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}

          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url=""
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Course;

// export async function getServerSideProps(context) {
//   const { title } = context.query;
//   const { resultTitle } = context.query;
//   const { categoryTitle } = context.query;

//   const categoryData = await fetch("https://jsonkeeper.com/b/OITD").then(
//     (res) => res.json()
//   );

//   return {
//     props: {
//       courseData: categoryData
//         .filter((item) => item.title === title)[0]
//         .categoryPageData.filter(
//           (item) => item.categoryTitle === categoryTitle
//         )[0]
//         .results.filter((item) => item.resultTitle === resultTitle)[0]
//         .resultPageData,
//     },
//   };
// }
