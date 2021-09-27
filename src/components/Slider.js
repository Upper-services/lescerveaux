import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-slick";

function Slider() {
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
      <Carousel {...settings} className="mt-4 carousel">
        <div className="rounded-3xl cursor-pointer relative">
          <a className="rounded-3xl shadow-2xl cursor-pointer block relative p-1.5 hover:p-0 hover:border-4 hover:border-white/80 transition duration-300">
            <img
              src="/images/Nadir.jpg"
              alt=""
              className="w-full h-full rounded-3xl"
            />
          </a>
        </div>

        <div className="rounded-3xl cursor-pointer relative">
          <a className="rounded-3xl shadow-2xl cursor-pointer block relative p-1.5 hover:p-0 hover:border-4 hover:border-white/80 transition duration-300">
            <img
              src="/images/Robert Greene.jpg"
              alt=""
              className="w-full h-full rounded-3xl"
            />
          </a>
        </div>
      </Carousel>
    </section>
  );
}

export default Slider;
