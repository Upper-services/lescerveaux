import { useDispatch } from "react-redux";
import { db } from "../../firebase";

export function checkSubscription(user) {
  const dispatch = useDispatch();

  if (user) {
    return db
      .collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
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
          );
        });
      });
  }
}
