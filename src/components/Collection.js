import Thumbnail from "./Thumbnail";

function Collection({ categoryId, title, categoryTitle, results }) {
  return (
    <div className="relative flex flex-col mb-4 pl-5 md:pl-10 lg:pl-20">
      <h2 className="font-semibold text-lg p-2 pb-0">
        {title || categoryTitle}
      </h2>
      <div className="p-2 flex items-center space-x-4 md:space-x-5 overflow-x-scroll scrollbar-hide overflow-y-hidden">
        {results?.map(({ resultId, resultTitle, thumbnailImg }) => (
          // 1920×1080
          <Thumbnail
            categoryTitle={categoryTitle}
            thumbnailImg={thumbnailImg}
            key={resultId}
            resultTitle={resultTitle}
          />
        ))}
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
