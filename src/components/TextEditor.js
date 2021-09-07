import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useCollection, useDocumentOnce } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

function TextEditor({ videoTitle, setShowEditor }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [user] = useAuthState(auth);
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
  );

  // const docId = docsSnapshot?.docs?.filter(
  //   (item) => item.data()?.videoTitle === videoTitle
  // )[0]?.id;

  const [snapshot] = useDocumentOnce(
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
      .doc(docId)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    db.collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("userDocs")
      .doc(user?.email)
      .collection("docs")
      .doc(docId)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        { merge: true }
      );
  };

  const removeDocument = () => {
    db.collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .doc(resultId)
      .collection("userDocs")
      .doc(user?.email)
      .collection("docs")
      .doc(docId)
      .delete();
    setShowEditor(false);
  };

  return (
    <div className="bg-[#F8F9FA]  max-w-md rounded-md overflow-hidden">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto text-black !my-0"
        editorClassName="text-black p-5 bg-white shadow-lg border"
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={removeDocument}>Cancel</button>
      <button onClick={() => setShowEditor(false)}>Save</button>
    </div>
  );
}

export default TextEditor;
