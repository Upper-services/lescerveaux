import { HomeIcon, SearchIcon, CollectionIcon } from "@heroicons/react/solid";
import Link from "next/link";

function HeaderLinks() {
  return (
    <div className="ml-10 flex items-center space-x-6">
      <Link href="/">
        <a className="header-link group">
          <HomeIcon className="h-5" />
          <span className="span">Home</span>
        </a>
      </Link>

      <a className="header-link group">
        <SearchIcon className="h-5" />
        <span className="span">Search</span>
      </a>
      <a className="header-link group">
        <CollectionIcon className="h-5" />
        <span className="span">Watchlist</span>
      </a>
    </div>
  );
}

export default HeaderLinks;
