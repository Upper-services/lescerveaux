import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { CheckIcon, PlusIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  selectSubscription,
  setSubscription,
} from "../slices/appSlice";
import data from "../../data.json";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Video from "../components/Video";
import firebase from "firebase";
import Message from "../components/Message";

function Course({ courseData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addedToWatchList, setAddedToWatchlist] = useState(false);
  const [value, setValue] = useState(1);
  const [user, loading] = useAuthState(auth);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value === "") return;

    setMessages([...messages, { message: inputRef.current.value }]);

    db.collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inputRef.current.value,
      email: user.email,
      displayName: user.displayName,
    });

    inputRef.current.value = null;
  };

  console.log(messages);

  return (
    <div>
      <div className="relative">
        <Head>
          <title></title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <section className="relative z-50 overflow-hidden">
          <div>{/* <Image/> */}</div>
          <div className="pl-8 md:pl-16 py-14 pt-28 relative">
            <h1 className="text-3xl md:text-5xl font-semibold mb-8 pl-2">
              {courseData.resultTitle}
            </h1>
            <div className="flex items-center space-x-6 mb-4 pl-2">
              <button className="bg-white uppercase text-xs md:text-[15px] text-black flex items-center justify-center gap-x-2 px-4 py-2 md:px-5 md:py-2.5 font-bold rounded hover:opacity-80 transition duration-200 tracking-wide">
                <img src="/images/play-icon.svg" className="h-6 md:h-7" />
                Play
              </button>
              <button
                className="border-2 border-white rounded-full w-9 h-9 md:w-11 md:h-11 flex items-center justify-center hover:text-black hover:bg-white transition duration-200"
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
                  <CheckIcon className="h-5 md:h-6 text-blue-700" />
                ) : (
                  <PlusIcon className="h-5 md:h-6" />
                )}
              </button>
            </div>
            <p className="mb-8 max-w-5xl text-lg font-medium pl-2">
              Description about the course... Description about the course...
              Description about the course... Description about the course...
              Description about the course... Description about the course...
              Description about the course...
            </p>

            <div className="relative pl-2 flex">
              <div className="flex overflow-x-scroll scrollbar-hide">
                {data.map(({ id, option }) => (
                  <button
                    key={id}
                    onClick={() => setValue(id)}
                    className={`uppercase tracking-widest text-lg mr-9 transition ease-out duration-200 hover:text-white ${
                      id === value
                        ? "text-white font-semibold"
                        : "text-[gray] font-medium"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="hidden md:inline-flex absolute top-10 left-0 w-full max-w-[1360px] h-[3px] bg-[#474953] ml-2"></div>
              <div
                style={{
                  transform: `${
                    value === 2
                      ? "translateX(140px)"
                      : value === 3
                      ? "translateX(258px)"
                      : value === 4
                      ? "translateX(390px)"
                      : ""
                  }`,
                }}
                className={`hidden md:inline-flex absolute rounded-tr-[5px] rounded-tl-[5px] top-10 left-0 h-[3px] bg-white ml-2 ${
                  value === 2
                    ? "w-[90px]"
                    : value === 3
                    ? "w-[100px]"
                    : value === 4
                    ? "w-[125px]"
                    : "w-[110px]"
                }`}
              ></div>
            </div>

            {/* Many thumbnails container */}
            {value === 1 && (
              <div className="flex p-2 space-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide mt-4 md:mt-10">
                {courseData.videos.map(
                  ({ videoId, videoTitle, videoDescription, videoSrc }) => (
                    <Video
                      key={videoId}
                      id={videoId}
                      videoSrc={videoSrc}
                      courseTitle={courseData.resultTitle}
                      videoTitle={videoTitle}
                      videoDescription={videoDescription}
                    />
                  )
                )}
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            )}
            {value === 4 && (
              <div className="mt-4 md:mt-8 p-2 space-y-8 pr-8">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row md:items-center gap-4 max-w-4xl">
                    <input
                      type="text"
                      placeholder="Leave a comment... 🚀"
                      required
                      ref={inputRef}
                      className="bg-[#30343E] sm:w-9/12 rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none placeholder-[#A2A3A6]"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 sm:w-3/12 uppercase text-sm font-semibold tracking-wider py-3 px-6 rounded hover:bg-[#0485ee]"
                    >
                      Comment
                    </button>
                  </div>
                </form>
                <div className="space-y-8">
                  {messages.map(
                    ({ id, message, displayName, email, timestamp }) => (
                      <Message
                        key={id}
                        id={id}
                        message={message}
                        displayName={displayName}
                        email={email}
                        timestamp={timestamp}
                      />
                    )
                  )}
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

export async function getServerSideProps(context) {
  const { title } = context.query;
  const { resultTitle } = context.query;
  const { categoryTitle } = context.query;

  const categoryData = await fetch("https://jsonkeeper.com/b/MVON").then(
    (res) => res.json()
  );

  return {
    props: {
      courseData: categoryData
        .filter((item) => item.title === title)[0]
        .categoryPageData.filter(
          (item) => item.categoryTitle === categoryTitle
        )[0]
        .results.filter((item) => item.resultTitle === resultTitle)[0],
    },
  };
}
