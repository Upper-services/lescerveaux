import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import { auth, db, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Video from "../components/Video";
import firebase from "firebase";
import { useCollection, useDocumentOnce } from "react-firebase-hooks/firestore";
import Notes from "../components/Notes";
import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import {
  ThumbUpIcon as ThumbUpIconOutline,
  ShareIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon } from "@heroicons/react/solid";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";

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

  return (
    <div>
      <div className={`relative`}>
        <Head>
          <title>{resultSSR.resultTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && (
          <>
            <Header transparent />

            <section>
              <div className="px-8 md:px-10 pt-24 relative flex flex-col md:flex-row justify-between gap-y-6">
                <div className="space-y-4">
                  {realtimeVideos?.docs.map((doc) => {
                    const videoId = doc.id;
                    const { videoTitle, videoSrc } = doc.data();

                    return (
                      <div className="">
                        <Video
                          key={videoId}
                          id={videoId}
                          videoSrc={videoSrc}
                          courseTitle={courseData?.data().resultTitle}
                          videoTitle={videoTitle}
                          thumbnailImg={courseData?.data().thumbnailImg}
                          showNotes={showNotes}
                          setShowNotes={setShowNotes}
                        />

                        {/* {showNotes && (
                          <Notes
                            id={videoId}
                            courseTitle={courseData?.data().resultTitle}
                            videoTitle={videoTitle}
                            showNotes={showNotes}
                            setShowNotes={setShowNotes}
                          />
                        )} */}
                      </div>
                    );
                  })}
                  <div className="flex flex-col md:flex-row space-y-2 justify-between md:items-center">
                    <h1 className="font-semibold capitalize">
                      {resultSSR.resultTitle.toLowerCase()}
                    </h1>
                    <div className="flex space-x-4 items-center">
                      <button className="flex space-x-1.5">
                        <ThumbUpIconOutline className="h-6" />
                        {/* <ThumbUpIcon className="h-6" /> */}
                        <span className="font-medium">24</span>
                      </button>
                      <button className="flex items-center space-x-1.5">
                        <WatchLaterOutlinedIcon />
                        <span className="font-medium uppercase text-sm">
                          Watchlist
                        </span>
                      </button>
                      <button className="flex items-center space-x-1.5">
                        <ShareIcon className="h-5" />
                        <span className="font-medium uppercase text-sm">
                          Share
                        </span>
                      </button>

                      <button>
                        <MoreHorizRoundedIcon />
                      </button>
                    </div>
                  </div>

                  <hr />
                  <Notes />
                  <hr />
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

                {/* Many thumbnails container */}
                <div className="flex flex-col items-center space-y-4 -my-2">
                  <h4 className="uppercase font-semibold tracking-widest">
                    Suggested
                  </h4>
                  <FlipMove className="p-2 space-y-5 overflow-x-hidden overflow-y-scroll h-screen scrollbar-hide">
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
                            resultPage
                            key={resultId}
                            resultId={resultId}
                            categoryId={categoryId}
                            thumbnailImg={thumbnailImg}
                            resultTitle={resultTitle}
                          />
                        );
                      })}
                  </FlipMove>
                </div>
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
