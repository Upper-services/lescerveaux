import moment from "moment";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function Message({ id, message, displayName, email, timestamp }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { title } = router.query;
  const { resultId } = router.query;
  const { categoryId } = router.query;

  return (
    <div className="flex justify-between items-center max-w-4xl group">
      <div className="space-y-2">
        <h2 className="font-medium">{message}</h2>
        <div className="flex space-x-3 text-sm text-[gray]">
          <h4 className=" font-medium">{displayName}</h4> <span>/</span>
          <span className="opacity-80">
            {moment(new Date(timestamp?.toDate().toUTCString())).format("lll")}
          </span>
        </div>
      </div>
      {user?.email === email && (
        <button
          className="bg-[red] font-semibold text-xs px-2.5 py-2 uppercase border border-transparent rounded bg-opacity-80 hover:bg-opacity-100 hover:border-[red] ] transition duration-200 tracking-wider"
          onClick={() => {
            db.collection("categories")
              .doc(title)
              .collection("categoryPageData")
              .doc(categoryId)
              .collection("results")
              .doc(resultId)
              .collection("comments")
              .doc(id)
              .delete();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Message;
