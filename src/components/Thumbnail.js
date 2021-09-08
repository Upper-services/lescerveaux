import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const Thumbnail = forwardRef(
  ({ resultId, resultTitle, categoryId, thumbnailImg, categoryTitle }, ref) => {
    const router = useRouter();
    const { title } = router.query;

    return (
      <div
        className="group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 min-w-[150px] md:min-w-[320px] 2xl:min-w-[290px] space-y-2 max-w-xs"
        onClick={() =>
          router.push({
            pathname: `/${title || categoryTitle}`,
            query: { categoryId, resultId },
          })
        }
        ref={ref}
      >
        <Image
          src={thumbnailImg}
          layout="responsive"
          height={1000}
          width={1920}
          objectFit="cover"
          className="rounded-lg"
          alt={resultTitle}
        />
        <h4 className="font-semibold capitalize text-xs sm:text-sm lg:text-base">
          {resultTitle.toLowerCase()}
        </h4>
      </div>
    );
  }
);

export default Thumbnail;
