import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { CheckIcon, PlusIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import data from "../../data.json";
import { auth, db, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Video from "../components/Video";
import firebase from "firebase";
import Message from "../components/Message";
import { useCollection, useDocumentOnce } from "react-firebase-hooks/firestore";
import Notes from "../components/Notes";
import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";
import ReactPlayer from "react-player";

function Course({ resultSSR, resultsSSR }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [user] = useAuthState(auth);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const inputRef = useRef(null);

  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const [showNotes, setShowNotes] = useState(false);

  const { title, resultId, categoryId } = router.query;

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

  const [courseData] = useDocumentOnce(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
  );

  const [realtimeVideos] = useCollection(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("videos")
  );

  const addVideoData = (e) => {
    e.preventDefault();

    if (videoTitle !== "") {
      db.collection("categories")
        .doc(title)
        .collection("categoryPageData")
        .doc(categoryId)
        .collection("results")
        .doc(resultId)
        .collection("videos")
        .add({
          videoThumbnail: videoThumbnail,
          videoTitle: videoTitle,
          videoSrc: videoFile,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
    setVideoThumbnail("");
    setVideoFile("");
    setVideoTitle("");
  };

  // Watchlist
  const [watchListSnapshot] = useCollection(
    db.collection("customers").doc(user?.uid).collection("watchlist")
  );

  const watchlistDocId = watchListSnapshot?.docs.filter(
    (item) => item.data()?.courseId === courseData?.data()?.resultId
  )[0]?.id;

  const addToWatchList = (e) => {
    e.preventDefault();

    db.collection("customers").doc(user?.uid).collection("watchlist").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      courseId: courseData?.data()?.resultId,
      courseTitle: courseData?.data()?.resultTitle,
      thumbnailImg: courseData?.data()?.thumbnailImg,
    });
  };

  const removeFromWatchList = (e) => {
    e.preventDefault();

    db.collection("customers")
      .doc(user?.uid)
      .collection("watchlist")
      .doc(watchlistDocId)
      .delete();
  };

  // Comment Section
  const [commentsSnapshot] = useCollection(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("comments")
      .orderBy("timestamp", "desc")
  );

  const addComment = (e) => {
    e.preventDefault();

    if (inputRef.current.value === "") return;

    db.collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("comments")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        comment: inputRef.current.value,
        email: user.email,
        displayName: user.displayName,
      });

    inputRef.current.value = null;
  };

  // Continue Watching
  const [bookmarksSnapshot] = useCollection(
    db.collection("customers").doc(user?.uid).collection("continuewatching")
  );

  // const videoId = bookmarksSnapshot?.docs
  //   .filter((item) => item.id === bookmarkId)[0]
  //   ?.data().videoId;

  // Suggested Collection
  const [suggestedSnapshot, loading] = useCollection(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
  );

  const handleShowPlayer = () => {
    setLoadingAnimation(true);
    setTimeout(() => {
      setLoadingAnimation(false);
    }, 3000);
    setShowPlayer(true);
  };

  return (
    <div>
      <div className={`relative`}>
        <Head>
          <title>{resultSSR.resultTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && (
          <>
            <img
              src={resultSSR.resultPageImage}
              alt=""
              className="min-h-screen bg-center bg-cover bg-no-repeat bg-fixed absolute inset-0 z-[-1] object-cover opacity-50"
              loading="lazy"
            />

            <Header transparent />

            <section>
              <div className="pl-8 md:pl-16 py-14 pt-52 relative">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 pl-2">
                  {resultSSR.resultTitle}
                </h1>

                <div className="flex items-center space-x-6 mb-4 pl-2">
                  <button
                    className="bg-white uppercase text-xs md:text-[15px] text-black flex items-center justify-center gap-x-2 px-4 py-2 md:px-5 md:py-2.5 font-bold rounded hover:opacity-80 transition duration-200 tracking-wide"
                    onClick={handleShowPlayer}
                  >
                    <img src="/images/play-icon.svg" className="h-6 md:h-7" />
                    Play
                  </button>
                  {showPlayer && (
                    <div>
                      {realtimeVideos?.docs.map((doc) => {
                        const videoId = doc.id;
                        const { videoTitle, videoSrc } = doc.data();

                        return (
                          <div>
                            <Video
                              showPlayer={showPlayer}
                              setShowPlayer={setShowPlayer}
                              key={videoId}
                              id={videoId}
                              videoSrc={videoSrc}
                              courseTitle={courseData?.data().resultTitle}
                              videoTitle={videoTitle}
                              thumbnailImg={courseData?.data().thumbnailImg}
                              showNotes={showNotes}
                              setShowNotes={setShowNotes}
                              loadingAnimation={loadingAnimation}
                              setLoadingAnimation={setLoadingAnimation}
                            />

                            {showNotes && (
                              <Notes
                                id={videoId}
                                courseTitle={courseData?.data().resultTitle}
                                videoTitle={videoTitle}
                                showNotes={showNotes}
                                setShowNotes={setShowNotes}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    className="border-2 border-white rounded-full w-9 h-9 md:w-11 md:h-11 flex items-center justify-center hover:text-black hover:bg-white transition duration-200"
                    // onClick={
                    //   watchlistDocId ? removeFromWatchList : addToWatchList
                    // }
                  >
                    {watchlistDocId ? (
                      <CheckIcon className="h-5 md:h-6 text-blue-700" />
                    ) : (
                      <PlusIcon className="h-5 md:h-6" />
                    )}
                  </button>
                </div>
                <p className="mb-8 max-w-5xl text-lg font-medium pl-2">
                  {resultSSR.resultDescription}
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
                            : "text-white/80 font-medium"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="hidden md:inline-flex absolute top-10 left-0 w-full max-w-[1360px] h-[3px] bg-[#474953] ml-2" />
                  <div
                    style={{
                      transform: `${
                        value === 2
                          ? "translateX(155px)"
                          : value === 3
                          ? "translateX(280px)"
                          : value === 4
                          ? "translateX(410px)"
                          : ""
                      }`,
                    }}
                    className={`hidden md:inline-flex absolute rounded-tr-[5px] rounded-tl-[5px] top-10 left-0 h-[3px] bg-white ml-2 ${
                      value === 2
                        ? "w-[120px]"
                        : value === 3
                        ? "w-[100px]"
                        : value === 4
                        ? "w-[125px]"
                        : "w-[122px]"
                    }`}
                  />
                </div>

                {showPlayer && (
                  <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
                )}

                {/* Many thumbnails container */}
                {value === 1 && (
                  <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide mt-4 md:mt-10">
                    {resultsSSR
                      .filter((doc) => doc.id !== resultId)
                      .map((filteredDoc) => {
                        const {
                          resultId,
                          resultDescription,
                          resultTitle,
                          thumbnailImg,
                        } = filteredDoc;
                        return (
                          <Thumbnail
                            key={resultId}
                            resultId={resultId}
                            categoryId={categoryId}
                            thumbnailImg={thumbnailImg}
                            resultTitle={resultTitle}
                          />
                        );
                      })}
                  </FlipMove>
                )}

                {value === 2 && (
                  <div className="mt-4 md:mt-8 p-2 space-y-8 pr-8">
                    <form
                      onSubmit={addComment}
                      className="flex items-center space-x-8"
                    >
                      <div className="py-8 px-16 rounded-lg space-y-4">
                        <h4 className="font-semibold capitalize">
                          Clique ici pour ajouter 5 étoiles à ce cours
                        </h4>
                        <div className="flex items-center space-x-4 justify-center">
                          <span className="text-2xl cursor-pointer">⭐</span>
                          <span className="text-2xl cursor-pointer">⭐</span>
                          <span className="text-2xl cursor-pointer">⭐</span>
                          <span className="text-2xl cursor-pointer">⭐</span>
                          <span className="text-2xl cursor-pointer">⭐</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row md:items-center gap-4 max-w-4xl flex-grow">
                        <input
                          type="text"
                          placeholder="Leave a comment... 🚀"
                          required
                          ref={inputRef}
                          className="bg-[#30343E] sm:w-9/12 rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none placeholder-[#A2A3A6]"
                        />
                        <button
                          disabled={true}
                          type="submit"
                          className="bg-blue-600 sm:w-3/12 uppercase text-sm font-semibold tracking-wider py-3 px-6 rounded hover:bg-[#0485ee]"
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                    <div className="space-y-8 px-16">
                      {commentsSnapshot?.docs.map((doc) => {
                        const id = doc.id;
                        const { comment, email, displayName, timestamp } =
                          doc.data();
                        return (
                          <Message
                            key={id}
                            id={id}
                            message={comment}
                            displayName={displayName}
                            email={email}
                            timestamp={timestamp}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Course;

export async function getServerSideProps(context) {
  const { title } = context.query;
  const { resultId } = context.query;
  const { categoryId } = context.query;

  const result = await db
    .collection("categories")
    .doc(title)
    .collection("categoryPageData")
    .doc(categoryId)
    .collection("results")
    .doc(resultId)
    .get();

  const results = await db
    .collection("categories")
    .doc(title)
    .collection("categoryPageData")
    .doc(categoryId)
    .collection("results")
    .get();

  const docs = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const doc = {
    id: result.id,
    ...result.data(),
  };

  return {
    props: { resultSSR: doc, resultsSSR: docs },
  };
}
