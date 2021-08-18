import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

function HeaderLinks() {
  return (
    <div className="hidden ml-10 md:flex items-center space-x-6">
      <Link href="/">
        <a className="header-link group">
          <HomeIcon className="h-4" />
          <span className="span">Home</span>
        </a>
      </Link>

      <a className="header-link group">
        <SearchIcon className="h-4" />
        <span className="span">Search</span>
      </a>
      <a className="header-link group">
        <PlusIcon className="h-4" />
        <span className="span">Watchlist</span>
      </a>
      <a className="header-link group">
        <StarIcon className="h-4" />
        <span className="span">Originals</span>
      </a>
      <a className="header-link group">
        <img src="/images/movie-icon.svg" alt="" className="h-5" />
        <span className="span">Movies</span>
      </a>
      <a className="header-link group">
        <img src="/images/series-icon.svg" alt="" className="h-5" />
        <span className="span">Series</span>
      </a>
    </div>
  );
}

export default HeaderLinks;
