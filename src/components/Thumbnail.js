import Image from "next/image";
import { useRouter } from "next/router";

function Thumbnail({ resultId, resultTitle, categoryTitle, thumbnailImg }) {
  const router = useRouter();
  const { title } = router.query;

  console.log(title);

  return (
    <div
      className="group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 shadow-xl hover:shadow-2xl min-w-[150px] md:min-w-[320px] 2xl:min-w-[290px]"
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
        className="rounded-lg"
      />
    </div>
  );
}

export default Thumbnail;
