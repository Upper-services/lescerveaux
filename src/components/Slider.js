import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-slick";
import { useRouter } from "next/router";

function Slider({ results }) {
  const router = useRouter();

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="relative overflow-hidden block px-[calc(3.5vw+5px)]">
      <Carousel {...settings} className="carousel">
        {results.map(
          ({
            resultId,
            resultDescription,
            resultPageImage,
            resultTitle,
            thumbnailImg,
            categoryId,
            categoryTitle,
            sliderImg,
          }) => (
            <div
              className="rounded cursor-pointer relative"
              key={resultId}
              onClick={() =>
                router.push({
                  pathname: `/${categoryTitle}`,
                  query: { categoryId, resultId },
                })
              }
            >
              <a className="rounded shadow-2xl cursor-pointer block relative p-1.5 hover:p-0 transition-all duration-300">
                <img
                  // src={sliderImg}
                  src="/images/testing.jpg"
                  alt={resultTitle}
                  className="w-full h-full rounded"
                />
              </a>
            </div>
          )
        )}
      </Carousel>
    </section>
  );
}

export default Slider;
