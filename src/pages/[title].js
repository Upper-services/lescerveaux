import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { CheckIcon, PlayIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  selectSubscription,
  setSubscription,
} from "../slices/appSlice";
import data from "../../data.json";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Course({ courseData }) {
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const dispatch = useDispatch();
  const [addedToWatchList, setAddedToWatchlist] = useState(false);
  const [value, setValue] = useState(0);
  const [user, loading] = useAuthState(auth);

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

  console.log(router.query);

  return (
    <div>
      <div className="relative">
        <Head>
          <title></title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <section
          className="relative z-50 inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/456A711C19899C881600F6247705E5253EB18C2471D75E5281E1FF6ACB6D2FBA/scale?width=1440&aspectRatio=1.78&format=jpeg)",
          }}
        >
          <div></div>
          <div className="px-16 py-14 relative min-h-[calc(100vh-72px)]">
            <img
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/4A67A42FB16607DAE7E22266D3F00181965178ED1884047C2D982EE7D89D3554/scale?width=1440&aspectRatio=1.78"
              className="h-48 mb-4"
            />
            <div className="mb-6">2021 • Course</div>
            <div className="flex space-x-6 mb-6">
              <button className="bg-white text-black flex items-center justify-center gap-x-2 px-3 py-2 w-36 font-bold rounded hover:opacity-80 transition duration-200">
                <img src="/images/play-icon.svg" className="h-7" />
                Play
              </button>
              <button
                className="border-2 border-white rounded-full w-11 h-11 flex items-center justify-center hover:text-black hover:bg-white transition duration-200"
                // onClick={() => {
                //   dispatch(
                //     addToWatchlist({
                //       courseData,
                //     })
                //   );
                // }}
                onClick={() => setAddedToWatchlist(!addedToWatchList)}
              >
                {addedToWatchList ? (
                  <CheckIcon className="h-7 text-blue-700" />
                ) : (
                  <PlusIcon className="h-7" />
                )}
              </button>
            </div>
            <p className="mb-8 max-w-5xl text-lg font-medium">
              Description about the course... Description about the course...
              Description about the course... Description about the course...
              Description about the course... Description about the course...
              Description about the course...
            </p>

            <div className="relative">
              {data.map((item, index) => (
                <button
                  onClick={() => setValue(index)}
                  className={`${
                    value === index && "text-white"
                  } text-gray-400 mr-7 uppercase font-medium tracking-widest text-lg`}
                >
                  {item.option}
                </button>
              ))}
              {/* Progress */}
              <div className="absolute top-9 left-0 w-full h-0.5 bg-gray-500"></div>
              <div
                style={{ transform: `translateX(calc(${value * 96}px))` }}
                className="absolute rounded-tr-[5px] rounded-tl-[5px] top-9 left-0 w-[90px] h-0.5 bg-white"
              ></div>
            </div>

            {value === 0 && (
              <div>
                <div className="flex space-x-6 mt-8 mb-6 text-sm">
                  <h4 className="font-semibold cursor-pointer">Part 1</h4>
                  <h4 className="font-semibold cursor-pointer text-gray-400">
                    Part 2
                  </h4>
                </div>

                {/* Many thumbnails container */}
                <div className="flex space-x-5 max-w-xl">
                  {/* Dummy Thumbnail 1 */}
                  <div onClick={() => setShowPlayer(true)}>
                    <img
                      src="https://pyxis.nymag.com/v1/imgs/48e/ec9/34da9c4cf5a4469ef3a63d04862446eb4e-the-falcon-and-the-winter-soldier.2x.rsocial.w600.jpg"
                      layout="responsive"
                      height={1000}
                      width={1920}
                      className="rounded-lg cursor-pointer"
                    />
                    {/* Bg Overlay */}
                    {showPlayer && (
                      <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
                    )}

                    <div
                      className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
                        showPlayer ? "opacity-100 z-50" : "opacity-0 z-[-1]"
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
                          url={`https://www.youtube.com/watch?v=IWBsDaFWyTE`}
                          width="100%"
                          height="100%"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                          }}
                          controls={true}
                          playing={showPlayer}
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm my-3">
                      1. Falcon and the winter soldier (45m)
                    </h4>
                    <p className="text-gray-400 font-semibold text-xs">
                      Description about video one. Description about video one.
                      Description about video one.
                    </p>
                  </div>

                  {/* Dummy Thumbnail 2 */}
                  <div>
                    <img
                      src="https://pyxis.nymag.com/v1/imgs/48e/ec9/34da9c4cf5a4469ef3a63d04862446eb4e-the-falcon-and-the-winter-soldier.2x.rsocial.w600.jpg"
                      layout="responsive"
                      height={1000}
                      width={1920}
                      className="rounded-lg cursor-pointer"
                    />
                    {/* Bg Overlay */}
                    {showPlayer && (
                      <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
                    )}

                    <div
                      className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
                        showPlayer ? "opacity-100 z-50" : "opacity-0 z-[-1]"
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
                          url={`https://www.youtube.com/watch?v=IWBsDaFWyTE`}
                          width="100%"
                          height="100%"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                          }}
                          controls={true}
                          playing={showPlayer}
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm my-3">
                      2. Falcon and the winter soldier (37m)
                    </h4>
                    <p className="text-gray-400 font-semibold text-xs">
                      Description about video two. Description about video two.
                      Description about video two.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
