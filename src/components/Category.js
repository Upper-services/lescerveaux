import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Category({ img, title, id }) {
  const router = useRouter();

  return (
    <div
      className="brand group"
      onClick={() =>
        router.push({
          pathname: `/category/${title}`,
          query: { title },
        })
      }
    >
      {/* <Image src={img} layout="fill" objectFit="cover" /> */}
      <h1 className="text-xs m-auto font-semibold">{title}</h1>
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

export default Category;
