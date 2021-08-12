import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Stripe from "stripe";

function Plans() {
  const [subscription, setSubscription] = useState(null);
  const [products, setProducts] = useState([]);
  const [user] = useAuthState(auth);
  const stripe = new Stripe(
    "sk_test_51JN28RCBQH7aHMWDwwinxqj3CdcbM4LJuR61nBrR5ytdD8qa2Ip1v9oNtegkp62aXWCeBvfHKDvq5YVhMoYdH6E400ZfqpcEj6"
  );

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

  const cancelSubscription = async () => {
    await stripe.subscriptions.del("sub_K1SF5BT6aFBK2n");
  };

  return (
    <div>
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        // add some logic to check if the user's subscription is active...
        const isCurrentPackage = productData?.name.includes(subscription?.role);
        return (
          <div className={`flex justify-between p-5`} key={productId}>
            <div>
              <h5 className="text-sm font-semibold">{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              className={`py-2.5 px-5 text-white bg-blue-600 font-semibold ${
                isCurrentPackage && "bg-gray-500"
              }`}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
            <button onClick={() => cancelSubscription()}>
              Cancel Subscription
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
