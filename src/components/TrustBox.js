import { useEffect, useRef, useState } from "react";
import Review from "./Review";
import Image from "next/image";
import Carousel from "react-slick";

function TrustBox({ carousel, grid, horizontal, reviews, hidden }) {
  const ref = useRef(null);

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      {carousel ? (
        <div
          className={`px-6 md:px-28 md:py-24 flex flex-col md:flex-row md:items-center gap-x-8`}
        >
          <div className="text-center min-w-max">
            <h2 className="font-medium text-lg">Excellent</h2>
            <img
              src="https://www.londonfilmed.com/wp-content/uploads/2021/02/5c73e733fd0819a265904d0c_trustpilot-stars-2018.png"
              alt=""
              className="h-9 object-contain mx-auto"
            />
            <p className="text-xs mt-1 mb-1.5">Sur la base de 160 avis</p>
            <Image
              src="/images/trustpilot.png"
              alt=""
              objectFit="contain"
              width={100}
              height={30}
            />
          </div>

          <div className="relative overflow-hidden block px-[10px)] w-full">
            <Carousel
              {...settings}
              className="carousel review-carousel !relative"
            >
              {reviews.map(({ id, date, text, header, name }) => (
                <Review
                  key={id}
                  date={date}
                  text={text}
                  header={header}
                  name={name}
                />
              ))}
            </Carousel>
          </div>
        </div>
      ) : horizontal ? (
        <div
          className="trustpilot-widget hidden lg:inline"
          ref={ref}
          data-locale="fr-FR"
          data-template-id="5418052cfbfb950d88702476"
          data-businessunit-id="61367b85c22a8c001df9771e"
          data-style-height="25px"
          data-style-width="100%"
          data-theme="dark"
          data-stars="5"
          data-review-languages="fr"
          data-font-family="Poppins"
        >
          <a
            href="https://fr.trustpilot.com/review/lescerveaux.com"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      ) : (
        grid && (
          <div
            className="trustpilot-widget flex-1"
            ref={ref}
            data-locale="fr-FR"
            data-template-id="539adbd6dec7e10e686debee"
            data-businessunit-id="61367b85c22a8c001df9771e"
            data-style-height="700px"
            data-style-width="100%"
            data-theme="dark"
            data-stars="5"
            data-review-languages="fr"
            data-font-family="Poppins"
          >
            <a
              href="https://fr.trustpilot.com/review/lescerveaux.com"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
        )
      )}
    </>
  );
}

export default TrustBox;
