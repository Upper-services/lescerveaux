import { PencilIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Header from "../components/Header";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectSubscription, setSubscription } from "../slices/appSlice";
import { useEffect } from "react";
import moment from "moment";
import DOMPurify from "dompurify";

function Account() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/");
      }
    });

    return unsubscribe;
  }, []);

  // Testing subscription Active or No
  const subscription = useSelector(selectSubscription);

  useEffect(() => {
    if (user) {
      db.collection("customers")
        .doc(user?.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            dispatch(
              setSubscription({
                role: subscription.data().role,
                current_period_end: subscription
                  .data()
                  .current_period_end?.toDate()
                  .getTime(),
                current_period_start: subscription
                  .data()
                  .current_period_start?.toDate()
                  .getTime(),
                status: subscription.data().status,
                cancel_at: subscription.data().cancel_at?.toDate().getTime(),
                ended_at: subscription.data().ended_at?.toDate().getTime(),
              })
            );
          });
        });
    }
  }, [user?.uid]);

  // ---------------------------------------------- Test Code Above ---------------------------------------------------------------

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const goToBillingPortal = async () => {
    const app = firebase.app();
    const functionRef = app
      .functions("us-central1")
      .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");

    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/account`,
    });

    window.location.assign(data.url);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <Head>
        <title>Account Settings | Lescerveaux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <>
          <Header />

          <section className="max-w-2xl mx-auto pt-20 px-9">
            <h1 className="text-[32px] font-semibold mb-3">Account</h1>
            <div className="border border-[#31343e] rounded text-[15px] font-medium mb-8">
              <div className="bg-[#31343e] py-1.5 px-4 text-[#a8a9ad] rounded-tl rounded-tr cursor-default">
                Account Details
              </div>
              <div className="px-4 py-3 flex justify-between items-center border-b border-[#31343e] cursor-pointer active:bg-[#222531]">
                <h4>{user?.displayName || "Add a username"}</h4>
                <div className="bg-[#f9f9f9] w-6 h-6 flex items-center justify-center text-black rounded-full hover:scale-105 transition ease-out">
                  <PencilIcon className="h-5" />
                </div>
              </div>

              <div className="px-4 py-3 flex justify-between items-center border-b border-[#31343e] cursor-pointer active:bg-[#222531]">
                <h4>{user?.email}</h4>
                <div className="bg-[#f9f9f9] w-6 h-6 flex items-center justify-center text-black rounded-full hover:scale-105 transition ease-out">
                  <PencilIcon className="h-5" />
                </div>
              </div>

              <div className="px-4 py-3 flex justify-between items-center border-b border-[#31343e] cursor-pointer active:bg-[#222531]">
                <h4>Password: *******</h4>
                <div className="bg-[#f9f9f9] w-6 h-6 flex items-center justify-center text-black rounded-full hover:scale-105 transition ease-out">
                  <PencilIcon className="h-5" />
                </div>
              </div>

              <button
                className="px-4 py-4 w-full font-medium text-[#67bdff] hover:text-[#94d0ff]"
                onClick={() => {
                  auth.signOut();
                  dispatch(setSubscription(null));
                  router.push("/");
                }}
              >
                Log out
              </button>
            </div>

            <div className="border border-[#31343e] rounded text-[15px] font-medium">
              <div className="bg-[#31343e] py-1.5 px-4 text-[#a8a9ad] rounded-tl rounded-tr cursor-default">
                Subscription
              </div>

              <div className="px-4 py-3 flex flex-col gap-y-4 sm:flex-row sm:items-center justify-between">
                <div className="cursor-default space-y-1.5">
                  <h4>Lescerveaux</h4>
                  <p
                    className={`text-xs capitalize ${
                      subscription?.status === "active"
                        ? "text-[#50e3c2]"
                        : "text-[red]"
                    }`}
                  >
                    {subscription?.status || "Not Active"}
                  </p>
                  {subscription?.status === "active" ? (
                    <p className="text-xs">
                      {subscription?.cancel_at
                        ? `Expires at ${moment(subscription?.cancel_at).format(
                            "lll"
                          )}`
                        : `Renews at ${moment(
                            subscription?.current_period_end
                          ).format("lll")}`}
                    </p>
                  ) : (
                    <p className="text-xs">
                      {subscription?.status === "canceled"
                        ? `Canceled at ${moment(subscription?.ended_at).format(
                            "lll"
                          )}`
                        : "Please complete your subscription"}
                    </p>
                  )}
                </div>
                <button
                  className="font-medium self-start sm:self-auto text-[#67bdff] hover:text-[#94d0ff]"
                  onClick={goToBillingPortal}
                >
                  Manage on Stripe
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}

export default Account;
