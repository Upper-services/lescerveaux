import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import HeaderLinks from "./HeaderLinks";
import Fade from "react-reveal/Fade";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <Fade top>
      <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
        <Image
          src="/images/logo.png"
          alt=""
          width={80}
          height={55}
          objectFit="contain"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {!session ? (
          <button
            className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <>
            <HeaderLinks />
            <div className="relative h-12 w-12 flex cursor-pointer items-center justify-center">
              <img
                src={session.user.image}
                className="h-12 w-12 rounded-full object-cover cursor-pointer ml-auto"
                onClick={signOut}
              />
              <div className="absolute top-12 right-0 bg-[#131313] border-[#979797] border-opacity-[.34] rounded p-2.5 text-sm tracking-wide w-[100px] opacity-0"></div>
            </div>
          </>
        )}
      </header>
    </Fade>
  );
}

export default Header;
