import Image from "next/image";
import { useRouter } from "next/router";

function Thumbnail({ resultId, resultTitle, categoryTitle, thumbnailImg }) {
  const router = useRouter();
  const { title } = router.query;

  return (
    <div
      className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
      onClick={() =>
        router.push({
          pathname: `/${title}`,
          query: { categoryTitle, resultTitle },
        })
      }
    >
      <img
        src={thumbnailImg}
        width={330}
        height={210}
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}

export default Thumbnail;
