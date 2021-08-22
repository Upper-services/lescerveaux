import Image from "next/image";
import { useRouter } from "next/router";

function Thumbnail({ resultId, resultTitle, categoryTitle, thumbnailImg }) {
  const router = useRouter();
  const { title } = router.query;

  return (
    <div
      // className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
      className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
      onClick={() =>
        router.push({
          pathname: `/${title}`,
          query: { categoryTitle, resultTitle },
        })
      }
    >
      <img
        // src={thumbnailImg}
        src="https://hulu-next-js-clone.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FaO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg&w=750&q=75"
        layout="responsive"
        height={1000}
        width={1920}
        className="rounded-lg"
      />
    </div>
  );
}

export default Thumbnail;
