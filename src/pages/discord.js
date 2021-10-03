import Script from 'next/script'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const WidgetBot = dynamic(
  () => import('@widgetbot/react-embed').then((module) => module.default),
  { ssr: false }
)

function Discord() {
  return (
    <>
      {/* <WidgetBot
        server="886374735146024990"
        channel="886517816386289664"
        className="h-screen w-full"
      /> */}
      <iframe
        src="https://discord.com/widget?id=886374735146024990&theme=dark"
        className="w-full h-screen"
        allowtransparency="true"
        frameborder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </>
  )
}

export default Discord
