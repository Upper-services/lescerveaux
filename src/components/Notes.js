import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import DocumentRow from "./DocumentRow";
import firebase from "firebase";
import { useState } from "react";
import TextEditor from "./TextEditor";
import { useRouter } from "next/router";

function Notes({ courseTitle, videoTitle, setShowNotes }) {
  const [user] = useAuthState(auth);
  // Find the timestamp the doc was created
  const [bookmarksSnapshot] = useCollection(
    db.collection("collections").doc("continuewatching").collection("bookmarks")
  );
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();
  const { title, categoryId, resultId } = router.query;

  const [docsSnapshot] = useCollection(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("userDocs")
      .doc(user?.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = () => {
    db.collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("userDocs")
      .doc(user?.email)
      .collection("docs")
      .add({
        courseTitle: courseTitle,
        videoTitle: videoTitle,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setShowEditor(true);
  };

  return (
    <div className="absolute z-[1000] right-0 top-0">
      {showEditor ? (
        <>
          <TextEditor videoTitle={videoTitle} setShowEditor={setShowEditor} />
        </>
      ) : (
        <>
          <button onClick={createDocument}>Create a new note</button>
          {docsSnapshot?.docs.map((doc) => {
            const id = doc.id;
            const { courseTitle, videoTitle } = doc.data();
            return (
              <DocumentRow
                key={id}
                courseTitle={courseTitle}
                videoTitle={videoTitle}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Notes;
