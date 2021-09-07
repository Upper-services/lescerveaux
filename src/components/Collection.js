import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Thumbnail from "./Thumbnail";

function Collection({ categoryId, categoryTitle }) {
  const router = useRouter();
  const { title } = router.query;

  const [resultsSnapshot] = useCollectionOnce(
    db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
  );

  return (
    <div className="relative flex flex-col mb-4 pl-5 md:pl-10 lg:pl-20">
      <h2 className="font-semibold text-base sm:text-lg lg:text-xl p-2 pb-0">
        {categoryTitle}
      </h2>
      <div className="p-2 flex items-center space-x-4 md:space-x-5 overflow-x-scroll scrollbar-hide overflow-y-hidden">
        {resultsSnapshot?.docs.map((doc) => {
          const id = doc.id;
          const {
            resultTitle,
            resultId,
            thumbnailImg,
            resultDescription,
            resultPageImage,
          } = doc.data();
          return (
            <Thumbnail
              categoryId={categoryId}
              thumbnailImg={thumbnailImg}
              resultId={resultId}
              key={id}
              resultTitle={resultTitle}
              resultDescription={resultDescription}
              resultPageImage={resultPageImage}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
