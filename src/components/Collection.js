import Thumbnail from "./Thumbnail";

function Collection({ categoryId, title, categoryTitle, results }) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title || categoryTitle}</h2>
      <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {results?.map(({ resultId, resultTitle, thumbnailImg }) => (
          // 1920×1080
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
