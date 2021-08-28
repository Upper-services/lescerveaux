import { ChevronLeftIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import ReactPlayer from "react-player";

function Video({ videoSrc, courseTitle, videoTitle }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowPlayer(true)}
        className="cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 shadow-xl hover:shadow-2xl min-w-[150px] md:min-w-[320px] 2xl:min-w-[290px] max-w-sm"
      >
        <img
          src="https://pyxis.nymag.com/v1/imgs/48e/ec9/34da9c4cf5a4469ef3a63d04862446eb4e-the-falcon-and-the-winter-soldier.2x.rsocial.w600.jpg"
          layout="responsive"
          height={1000}
          width={1920}
          className="rounded-lg cursor-pointer"
        />
        {/* Bg Overlay */}
        {showPlayer && (
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
        )}

        <h4 className="font-semibold text-sm my-2.5">{videoTitle}</h4>
        <p className="text-[gray] font-semibold text-[11px]">
          Description about video one. Description about video one. Description
          about video one.
        </p>
      </div>

      <div
        className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
          showPlayer ? "opacity-100 z-50" : "opacity-0 z-[-1]"
        }`}
      >
        <div className="flex items-center bg-black text-[#f9f9f9] p-3.5">
          <div
            className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
            onClick={() => setShowPlayer(false)}
          >
            <ChevronLeftIcon className="h-8" />
          </div>
          <span className="font-semibold">{courseTitle}</span>
        </div>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={videoSrc}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
            controls={true}
            playing={showPlayer}
          />
        </div>
      </div>
    </>
  );
}

export default Video;
