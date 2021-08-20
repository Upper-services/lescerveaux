import Image from "next/image";
import { useRouter } from "next/router";
import HeaderLinks from "./HeaderLinks";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useComponentVisible from "../hooks/useComponentVisible";
import { motion } from "framer-motion";
import Link from "next/link";

function Header() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <Fade top>
      <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-6 h-[72px]">
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
          <div className="ml-auto">
            <img
              src="https://yt3.ggpht.com/ytc/AKedOLQVKtLvxTcroPgQLPJvSf7cVYgfThihxxNd_sFfLg=s900-c-k-c0x00ffffff-no-rj"
              className="rounded-full h-11 w-11 cursor-pointer"
              ref={ref}
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            />
            {isComponentVisible && (
              <motion.div
                ref={ref}
                className={`${
                  isComponentVisible &&
                  "pb-3 absolute top-0 right-0 w-56 p-3 px-5 border-2 border-[#404040] text-[#CACACA] rounded-md z-[-1] bg-[#131313]"
                }`}
                initial={{ height: 0 }}
                animate={
                  isComponentVisible
                    ? { height: "auto", visibility: "visible" }
                    : { height: 0, visibility: "hidden" }
                }
              >
                <h4 className="capitalize absolute right-20 top-5 text-white">
                  {user?.displayName?.split(" ")[0]}
                </h4>
                <hr className="border-[#2A2A2A] mt-14 mb-4" />
                <div className="space-y-4">
                  <Link href="/account">
                    <a className="hover:text-white">Account</a>
                  </Link>
                  <a
                    className="block cursor-pointer hover:text-white"
                    onClick={() => {
                      auth.signOut();
                      router.push("/");
                    }}
                  >
                    Log Out
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </header>
    </Fade>
  );
}

export default Header;
