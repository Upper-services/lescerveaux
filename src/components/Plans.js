import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

function Plans() {
  const [subscription, setSubscription] = useState(null);
  const [products, setProducts] = useState([]);
  const [user] = useAuthState(auth);
  const [active, setActive] = useState(false);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user?.uid]);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the firebase console.
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51JN28RCBQH7aHMWD4xbnDaoxTsfKWeGrv8ky2ridSvZiLMrWNVjtN81z6FupttkQwafy4lOyvyFvYRcyzZ4jD6OG00qn4lwRGG"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  // const cancelSubscription = () => {
  //   const deleted = await stripe.subscriptions.del(
  //     db.collection("customers").doc(user?.uid).collection("subscriptions").
  //   );
  // }

  // const cancelSubscription = async () => {
  //   await stripe.subscriptions.del("sub_K1SF5BT6aFBK2n");
  // };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Start learning today</h2>
      <div className="text-xs font-medium space-y-2.5 mb-8">
        <p>Les CERVEAUX for just €19.00/month.</p>
        <p className="text-gray-400">
          Cancel anytime, effective at the end of the billing period.
        </p>
      </div>

      <div className="flex items-center justify-between bg-gray-600 border border-transparent rounded p-2.5 cursor-pointer">
        <div>
          <h4 className="font-semibold text-sm mb-1.5">Monthly</h4>
          <p className="text-xs text-gray-300">€19.00</p>
        </div>
        {!active ? (
          <div className="h-4 w-4 border-2 rounded-full" />
        ) : (
          <CheckCircleIcon />
        )}
      </div>

      {Object.entries(products).map(([productId, productData]) => {
        // add some logic to check if the user's subscription is active...
        const isCurrentPackage = productData?.name.includes(subscription?.role);
        return (
          <div className={`flex flex-col justify-between`} key={productId}>
            <button
              className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6"
              type="submit"
              OnClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Agree & Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
