import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
  DotsVerticalIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import TrustBox from "./TrustBox";

function HeaderLinks() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const trustBoxRef = useRef(null);

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our trustBoxRef.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(trustBoxRef.current, true);
    }
  }, []);

  return (
    <div className="ml-5 lg:ml-10 flex items-center space-x-6">
      <Link href="/">
        <a className="header-link group flex">
          <HomeIcon className="h-5" />
          <span className="span hidden lg:inline">Home</span>
        </a>
      </Link>

      <Link href="/search">
        <a className="header-link group flex">
          <SearchIcon className="h-5" />
          <span className="span hidden lg:inline">Search</span>
        </a>
      </Link>

      <Link href="/watchlist">
        <a className="header-link group flex">
          <CollectionIcon className="h-5" />
          <span className="span hidden lg:inline">Watchlist</span>
        </a>
      </Link>

      <div className="relative z-50 lg:hidden">
        <a
          className="header-link group"
          ref={ref}
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        >
          <DotsVerticalIcon className="h-5" />
        </a>
        {isComponentVisible && (
          <motion.div
            ref={ref}
            className={`${
              isComponentVisible &&
              "pb-3 absolute top-8 left-0 w-56 p-3 px-4 border-2 border-[#404040] text-white rounded-lg z-[-1] bg-[#131313] space-y-4"
            }`}
            initial={{ height: 0 }}
            animate={
              isComponentVisible
                ? { height: "auto", visibility: "visible" }
                : { height: 0, visibility: "hidden" }
            }
          >
            <Link href="/quotes">
              <a className="header-link group flex">
                <BookOpenIcon className="h-5" />
                <span className="span">Quotes</span>
              </a>
            </Link>
            <Link href="/discord">
              <a className="header-link group flex">
                <img src="/icons/discord-icon.svg" alt="" className="h-4" />
                <span className="span">Discord</span>
              </a>
            </Link>
            <Link href="/notes">
              <a className="header-link group flex">
                <PencilAltIcon className="h-5" />
                <span className="span">Notes</span>
              </a>
            </Link>
          </motion.div>
        )}
      </div>

      {/* <Link href="/faqs">
        <a className="header-link group">
          <QuestionMarkCircleIcon className="h-5" />
          <span className="span">FAQ</span>
        </a>
      </Link> */}

      <Link href="/quotes">
        <a className="header-link group hidden lg:flex">
          <BookOpenIcon className="h-5" />
          <span className="span">Quotes</span>
        </a>
      </Link>
      <Link href="/discord">
        <a className="header-link group hidden lg:flex">
          <img src="/icons/discord-icon.svg" alt="" className="h-4 " />
          <span className="span">Discord</span>
        </a>
      </Link>
      <Link href="/notes">
        <a className="header-link group hidden lg:flex">
          <PencilAltIcon className="h-5" />
          <span className="span">Notes</span>
        </a>
      </Link>

      <TrustBox horizontal />
    </div>
  );
}

export default HeaderLinks;
