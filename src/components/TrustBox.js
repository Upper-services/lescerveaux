import { useEffect, useRef } from 'react'

function TrustBox({ carousel, grid, horizontal }) {
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
    <>
      {carousel ? (
        <div className="px-28 py-24">
          <div
            className="trustpilot-widget"
            ref={ref}
            data-locale="fr-FR"
            data-template-id="53aa8912dec7e10d38f59f36"
            data-businessunit-id="61367b85c22a8c001df9771e"
            data-style-height="140px"
            data-style-width="100%"
            data-theme="dark"
            data-stars="5"
            data-review-languages="fr"
            data-font-family="Poppins"
          >
            <a
              href="https://fr.trustpilot.com/review/lescerveaux.com"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
        </div>
      ) : horizontal ? (
        <div
          className="trustpilot-widget"
          ref={ref}
          data-locale="fr-FR"
          data-template-id="5418052cfbfb950d88702476"
          data-businessunit-id="61367b85c22a8c001df9771e"
          data-style-height="25px"
          data-style-width="100%"
          data-theme="dark"
          data-stars="5"
          data-review-languages="fr"
          data-font-family="Poppins"
        >
          <a
            href="https://fr.trustpilot.com/review/lescerveaux.com"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      ) : (
        grid && (
          <div
            className="trustpilot-widget flex-1"
            ref={ref}
            data-locale="fr-FR"
            data-template-id="539adbd6dec7e10e686debee"
            data-businessunit-id="61367b85c22a8c001df9771e"
            data-style-height="700px"
            data-style-width="100%"
            data-theme="dark"
            data-stars="5"
            data-review-languages="fr"
            data-font-family="Poppins"
          >
            <a
              href="https://fr.trustpilot.com/review/lescerveaux.com"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
        )
      )}
    </>
  )
}

export default TrustBox
