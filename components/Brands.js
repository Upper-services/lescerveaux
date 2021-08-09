import Image from "next/image";
import Fade from "react-reveal/Fade";

function Brands() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
      <Fade bottom>
        <div className="brand group">
          <Image
            src="/images/100-Clients.png"
            layout="fill"
            objectFit="cover"
          />
          <video
            autoPlay
            loop
            playsInline
            className="hidden group-hover:inline rounded-lg object-cover"
          >
            <source src="/videos/disney.mp4" type="video/mp4" />
          </video>
        </div>
      </Fade>

      <Fade bottom>
        <div className="brand group">
          <Image src="/images/100-Design.png" layout="fill" objectFit="cover" />
          <video
            autoPlay
            loop
            playsInline
            className="hidden group-hover:inline rounded-lg object-cover"
          >
            <source src="/videos/pixar.mp4" type="video/mp4" />
          </video>
        </div>
      </Fade>

      <Fade bottom>
        <div className="brand group">
          <Image src="/images/100-Livres.png" layout="fill" objectFit="cover" />
          <video
            autoPlay
            loop
            playsInline
            className="hidden group-hover:inline rounded-lg object-cover"
          >
            <source src="/videos/marvel.mp4" type="video/mp4" />
          </video>
        </div>
      </Fade>

      <Fade bottom>
        <div className="brand group">
          <Image
            src="/images/100-Remèdes.png"
            layout="fill"
            objectFit="cover"
          />
          <video
            autoPlay
            loop
            playsInline
            className="hidden group-hover:inline rounded-lg object-cover"
          >
            <source src="/videos/star-wars.mp4" type="video/mp4" />
          </video>
        </div>
      </Fade>

      <Fade bottom>
        <div className="brand group">
          <Image src="/images/100-vidéos.png" layout="fill" objectFit="cover" />
          <video
            autoPlay
            loop
            playsInline
            className="hidden group-hover:inline rounded-lg object-cover"
          >
            <source src="/videos/national-geographic.mp4" type="video/mp4" />
          </video>
        </div>
      </Fade>
    </section>
  );
}

export default Brands;
