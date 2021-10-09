// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";

// function Category({ img, title, id }) {
//   const router = useRouter();

//   return (
//     <div className="relative w-[320px] h-[150px]">
//       <Image
//         src="https://res.cloudinary.com/lescerveaux-com/image/private/s--9xLHb51D--/v1633611595/Vide_1_qgpyou.png"
//         layout="fill"
//         objectFit="cover"
//       />
//     </div>

//     // <div
//     //   className="brand group"
//     //   onClick={() =>
//     //     router.push({
//     //       pathname: `/category/${id}`,
//     //     })
//     //   }
//     // >

//     // </div>
//   );
// }

// export default Category;

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
      <video
        autoPlay
        loop
        playsInline
        className="hidden group-hover:inline rounded-lg object-cover"
      >
        <source
          src="https://res.cloudinary.com/lescerveaux-com/video/private/s--TmfQ9AF_--/v1633357080/VENTE-V1_euhb6n.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default Category;
