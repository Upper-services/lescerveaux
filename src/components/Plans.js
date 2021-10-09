import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCollection } from "react-firebase-hooks/firestore";
const stripePromise = loadStripe(
  "pk_test_51Ir0r1DGLKmXj6KYvQS6K6CubOSl7TOAZ9i2p7FdC9g6yDsEytYolvq6btY8EUdxv2xeZs2e13jlo8hW0ixa7qP9006FYw6meh"
);

function Plans({ products }) {
  // const [subscription, setSubscription] = useState(null);
  const subscription = useSelector(selectSubscription);
  const [user] = useAuthState(auth);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const createCheckoutSession = async (priceId) => {
    const stripe = await stripePromise;

    // Call the backend to create the checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      priceId: priceId,
      email: user.email,
    });

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Choose the plan that's right for you</h1>
      <div>
        <div className="flex space-x-2">
          <CheckIcon className="h-6 text-blue-500" />
          <p>Watch all you want. Ad-free.</p>
        </div>
        <div className="flex space-x-2">
          <CheckIcon className="h-6 text-blue-500" />
          <p>Recommendations just for you.</p>
        </div>
        <div className="flex space-x-2">
          <CheckIcon className="h-6 text-blue-500" />
          <p>Change or cancel your plan anytime.</p>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="mt-36">
          <h4 className="border-b">Monthly price</h4>
          <h4>Categories</h4>
        </div>

        <div className="flex space-x-8">
          {products.map((product) => (
            <div className="">
              <div className="bg-blue-500 rounded w-32 h-32 flex items-center justify-center px-5 font-semibold">
                {product.name}
              </div>
              <h4>{product.price}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plans;
