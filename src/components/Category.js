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
          pathname: `/category/${id}`,
        })
      }
    >
      <Image src={img} layout="fill" objectFit="cover" />
    </div>
  );
}

export default Category;
