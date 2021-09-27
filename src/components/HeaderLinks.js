import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
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

      <Link href="/search">
        <a className="header-link group">
          <SearchIcon className="h-5" />
          <span className="span">Search</span>
        </a>
      </Link>

      <Link href="/watchlist">
        <a className="header-link group">
          <CollectionIcon className="h-5" />
          <span className="span">Watchlist</span>
        </a>
      </Link>

      <Link href="/quotes">
        <a className="header-link group">
          <PencilAltIcon className="h-5" />
          <span className="span">Quotes</span>
        </a>
      </Link>

      <Link href="/faqs">
        <a className="header-link group">
          <QuestionMarkCircleIcon className="h-5" />
          <span className="span">FAQ</span>
        </a>
      </Link>
    </div>
  );
}

export default HeaderLinks;
