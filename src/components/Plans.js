import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { selectSubscription, setSubscription } from '../slices/appSlice'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useCollection } from 'react-firebase-hooks/firestore'
const stripePromise = loadStripe(
  'pk_test_51Ir0r1DGLKmXj6KYvQS6K6CubOSl7TOAZ9i2p7FdC9g6yDsEytYolvq6btY8EUdxv2xeZs2e13jlo8hW0ixa7qP9006FYw6meh'
)

function Plans({ products }) {
  // const [subscription, setSubscription] = useState(null);
  const subscription = useSelector(selectSubscription)
  const [user] = useAuthState(auth)
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   db.collection('products')
  //     .where('active', '==', true)
  //     .get()
  //     .then((querySnapshot) => {
  //       const products = {}
  //       querySnapshot.forEach(async (productDoc) => {
  //         products[productDoc.id] = productDoc.data()
  //         const priceSnap = await productDoc.ref.collection('prices').get()
  //         priceSnap.docs.forEach((price) => {
  //           products[productDoc.id].prices = {
  //             priceId: price.id,
  //             priceData: price.data(),
  //           }
  //         })
  //       })
  //       setProducts(products)
  //     })
  // }, [])

  useEffect(() => {
    db.collection('customers')
      .doc(user?.uid)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          // setSubscription({
          //   role: subscription.data().role,
          //   current_period_end: subscription.data().current_period_end.seconds,
          //   current_period_start:
          //     subscription.data().current_period_start.seconds,
          // });
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
  }, [user?.uid])

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data()
      console.log(snap.data())

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the firebase console.
        alert(`An error occured: ${error.message}`)
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          'pk_test_51Ir0r1DGLKmXj6KYvQS6K6CubOSl7TOAZ9i2p7FdC9g6yDsEytYolvq6btY8EUdxv2xeZs2e13jlo8hW0ixa7qP9006FYw6meh'
        )
        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  const createCheckoutSession = async (priceId) => {
    const stripe = await stripePromise

    // Call the backend to create the checkout session...
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      priceId: priceId,
      email: user.email,
    })

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result.error) {
      alert(result.error.message)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Start learning today</h2>
      {products.map((product) => (
        <>
          <div className="text-xs font-medium space-y-2.5 mb-8">
            <p>
              {product.name}for just {product.price}/month.
            </p>
            <p className="text-gray-400">
              Cancel anytime, effective at the end of the billing period.
            </p>
          </div>
          <div
            className={`flex items-center justify-between bg-[#30343E] border-2 border-transparent rounded p-2.5 cursor-pointer mb-6 transition duration-200 ${
              active && 'border-[#0283ED] bg-[#153150]'
            }`}
            onClick={() => setActive(!active)}
          >
            <div>
              <h4 className="font-semibold text-sm mb-1.5">Monthly</h4>
              <p className="text-xs text-gray-300">{product.price}</p>
            </div>
            {!active ? (
              <div className="h-4 w-4 border-2 rounded-full" />
            ) : (
              <CheckCircleIcon className="h-6 text-[#0283ED]" />
            )}
          </div>
          <div className={`flex flex-col justify-between`}>
            <button
              className={`bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6 ${
                !active && 'bg-gray-500 cursor-not-allowed hover:bg-gray-500'
              }`}
              type="submit"
              onClick={() => createCheckoutSession(product.priceId)}
            >
              Checkout
            </button>
          </div>
        </>
      ))}
      <p className="text-[11px] mb-6 font-medium">
        By clicking "Agree & Subscribe", you will be redirected to stripe's
        secure checkout page where you will need to enter your respective
        payment information. Note that, you will be able to cancel at any time,
        effective at the end of the billing period.
      </p>
    </div>
  )
}

export default Plans
