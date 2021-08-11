import { db } from "../firebase";

function Plan({ productData }) {
  const loadCheckout = async (priceId) => {
    const docRef = await db.collection("customers").doc();
  };

  return (
    <div className="flex justify-between p-5 opacity-80 hover:opacity-100">
      <div>
        <h5 className="text-sm font-semibold">{productData.name}</h5>
        <h6>{productData.description}</h6>
      </div>

      <button
        onClick={() => loadCheckout(productData.prices.priceId)}
        className="py-2.5 px-5 text-white bg-blue-600 font-semibold"
      >
        Subscribe
      </button>
    </div>
  );
}

export default Plan;
