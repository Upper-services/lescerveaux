import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth, db } from '../../firebase'
import Plans from '../components/Plans'
import { selectSubscription, setSubscription } from '../slices/appSlice'

function CompletePurchase() {
  const [showPlans, setShowPlans] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const [user] = useAuthState(auth)

  const ref = useRef(null)

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

  // Testing subscription Active or No
  const subscription = useSelector(selectSubscription)

  useEffect(() => {
    if (user) {
      db.collection('customers')
        .doc(user?.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            dispatch(
              setSubscription({
                role: subscription.data().role,
                current_period_end:
                  subscription.data().current_period_end.seconds,
                current_period_start:
                  subscription.data().current_period_start.seconds,
                status: subscription.data().status,
              })
            )
          })
        })
    }
  }, [user?.uid])

  // ---------------------------------------------- Test Code Above ---------------------------------------------------------------

  return (
    <>
      {user && subscription?.status !== 'active' && (
        <>
          {!showPlans ? (
            <div className="relative px-10 md:px-10 pt-16 flex items-center min-h-screen">
              <button
                className="absolute right-10 top-10 font-semibold text-sm"
                onClick={() => {
                  auth.signOut()
                  dispatch(setSubscription(null))
                  router.push('/')
                }}
              >
                Log out
              </button>
              <div className="flex flex-col space-y-8 max-w-lg mr-8">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={200}
                  height={100}
                  objectFit="contain"
                  className="cursor-pointer"
                  objectPosition="left"
                  onClick={() => router.push('/')}
                />
                <h1 className="font-semibold text-3xl">
                  You're only one step away from Lescerveaux 🚀
                </h1>
                <h2 className="font-medium">
                  Please complete your subscription to get access to all the
                  courses.
                </h2>
                <button
                  className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 rounded hover:bg-[#0485ee]"
                  onClick={() => setShowPlans(true)}
                >
                  Complete Subscription
                </button>
              </div>
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
            </div>
          ) : (
            <div className="flex text-left flex-col justify-center max-w-md mx-auto mt-24">
              <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
                Step 1 of 1
              </small>

              <Plans />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CompletePurchase
