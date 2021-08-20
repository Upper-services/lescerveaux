import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <section className="relative shadow-2xl max-w-screen-2xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="">
          <img
            loading="lazy"
            src="/images/slider-1.jpg"
            alt=""
            className="max-h-[330px] object-cover"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="/images/slider-2.jpg"
            alt=""
            className="max-h-[330px] object-cover"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="/images/slider-3.jpg"
            alt=""
            className="max-h-[330px] object-cover"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="/images/slider-4.jpeg"
            alt=""
            className="max-h-[330px] object-cover"
          />
        </div>
      </Carousel>
    </section>
  );
}

export default Slider;
