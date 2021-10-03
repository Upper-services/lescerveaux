import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import TrustBox from './TrustBox'

function HeaderLinks() {
  const ref = useRef(null)

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

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

      <Link href="/discord">
        <a className="header-link group">
          <img src="/icons/discord-icon.svg" alt="" className="h-4" />
          <span className="span">Discord</span>
        </a>
      </Link>

      <TrustBox horizontal />
    </div>
  )
}

export default HeaderLinks
