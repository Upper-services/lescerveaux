import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";

function Watchlist() {
  const [user] = useAuthState(auth);
  const [watchListSnapshot] = useCollection(
    db
      .collection("customers")
      .doc(user?.uid)
      .collection("watchlist")
      .orderBy("timestamp", "desc")
  );

  return (
    <div>
      <Head>
        <title>Watchlist</title>
      </Head>

      <section>
        {watchListSnapshot?.docs.map((doc) => {
          const id = doc.id;
          const { courseId, courseTitle, thumbnailImg } = doc.data();
          return <div>{courseTitle}</div>;
        })}
      </section>
    </div>
  );
}

export default Watchlist;
