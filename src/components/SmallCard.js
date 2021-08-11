import Image from "next/image";

function SmallCard({ img }) {
  return (
    <div className="brand group">
      <Image src={img} layout="fill" objectFit="cover" />
      <video
        autoPlay
        loop
        playsInline
        className="hidden group-hover:inline rounded-lg object-cover"
      >
        <source src="/videos/national-geographic.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default SmallCard;
