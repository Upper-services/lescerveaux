import Image from "next/image";
import { useRouter } from "next/router";
import HeaderLinks from "./HeaderLinks";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useComponentVisible from "../hooks/useComponentVisible";
import { motion } from "framer-motion";
import Link from "next/link";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";

function Header({ transparent }) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const subscription = useSelector(selectSubscription);
  const [bgTransparent, setBgTransparent] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setBgTransparent(true);
    } else {
      setBgTransparent(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <Fade top>
      <header
        className={`sticky top-0 z-[1000] flex items-center px-6 h-[72px] ${
          transparent
            ? bgTransparent
              ? "bg-[#040714]"
              : "bg-transparent"
            : "bg-[#040714]"
        }`}
      >
        {user && subscription?.status === "active" && (
          <>
            <Image
              src="/images/logo.png"
              alt=""
              width={80}
              height={50}
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
          <div className="ml-auto z-50">
            <Avatar
              ref={ref}
              onClick={() => setIsComponentVisible(!isComponentVisible)}
              className="cursor-pointer !bg-blue-800"
            >
              {user?.displayName?.charAt(0).toUpperCase()}
            </Avatar>
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
                      dispatch(setSubscription(null));
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
