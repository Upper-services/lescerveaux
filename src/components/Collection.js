import Thumbnail from "./Thumbnail";

function Collection({ categoryId, title, categoryTitle, results }) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title || categoryTitle}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {results?.map(({ resultId, resultTitle, thumbnailImg }) => (
          <Thumbnail
            categoryTitle={categoryTitle}
            thumbnailImg={thumbnailImg}
            key={resultId}
            title={resultTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default Collection;
