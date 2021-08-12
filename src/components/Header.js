import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import HeaderLinks from "./HeaderLinks";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [session] = useSession();
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <Fade top>
      <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
        {user && (
          <>
            <Image
              src="/images/logo.png"
              alt=""
              width={80}
              height={55}
              objectFit="contain"
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
            <HeaderLinks />
          </>
        )}

        {!user ? (
          <button
            className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        ) : (
          <button
            className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
            onClick={() => {
              auth.signOut();
              router.push("/");
            }}
          >
            Logout
          </button>
        )}

        <div className="absolute top-12 right-0 bg-[#131313] border-[#979797] border-opacity-[.34] rounded p-2.5 text-sm tracking-wide w-[100px] opacity-0"></div>
      </header>
    </Fade>
  );
}

export default Header;
