import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Thumbnail from "./Thumbnail";

function Collection({ categoryId, categoryTitle }) {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { title } = router.query;

  useEffect(async () => {
    const snapshot = await db
      .collection("categories")
      .doc(title)
      .collection("categoryPageData")
      .doc(categoryId)
      .collection("results")
      .get();
    return setResults(snapshot.docs.map((doc) => doc.data()));
  }, []);

  return (
    <div className="relative flex flex-col mb-4 pl-5 md:pl-10 lg:pl-20">
      <h2 className="font-semibold text-lg p-2 pb-0">{categoryTitle}</h2>
      <div className="p-2 flex items-center space-x-4 md:space-x-5 overflow-x-scroll scrollbar-hide overflow-y-hidden">
        {results?.map(
          ({
            resultId,
            resultTitle,
            thumbnailImg,
            resultDescription,
            resultPageImage,
          }) => (
            // 1920×1080
            <Thumbnail
              categoryId={categoryId}
              thumbnailImg={thumbnailImg}
              resultId={resultId}
              key={resultId}
              resultTitle={resultTitle}
              resultDescription={resultDescription}
              resultPageImage={resultPageImage}
            />
          )
        )}
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    </div>
  );
}

export default Collection;
