import FlipMove from 'react-flip-move'
import Thumbnail from './Thumbnail'

function HomeCollection({ results, title }) {
  return (
    <div>
      <h2 className="font-bold text-base sm:text-lg lg:text-2xl pb-0 ">
        {title}
      </h2>
      <FlipMove className="flex p-2 gap-x-5 overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {results.map(
          ({
            resultId,
            resultDescription,
            resultPageImage,
            resultTitle,
            thumbnailImg,
            categoryId,
            categoryTitle,
          }) => (
            <Thumbnail
              key={resultId}
              categoryTitle={categoryTitle}
              resultId={resultId}
              categoryId={categoryId}
              thumbnailImg={thumbnailImg}
              resultTitle={resultTitle}
            />
          )
        )}
      </FlipMove>
    </div>
  )
}

export default HomeCollection
