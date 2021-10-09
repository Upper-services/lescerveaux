import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const Thumbnail = forwardRef(
  (
    {
      resultId,
      resultTitle,
      categoryId,
      thumbnailImg,
      categoryTitle,
      resultPage,
    },
    ref
  ) => {
    const router = useRouter();
    const { title } = router.query;

    return (
      <div
        className={`group cursor-pointer transition duration-200 ease-in transform min-w-[200px] sm:min-w-[350px] sm:hover:scale-105 ${
          !resultPage && "w-[150px] md:w-[320px] 2xl:w-[290px]"
        } max-w-xs`}
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
          height={1000}
          width={1920}
          objectFit="cover"
          className="rounded"
          alt={resultTitle}
        />
        <h4 className="font-medium capitalize truncate text-[17px]">
          {resultTitle?.toLowerCase()}
        </h4>
      </div>
    );
  }
);

export default Thumbnail;
