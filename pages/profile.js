import { useEffect, useState } from "react";
import Header from "../components/Header";
import Plan from "../components/Plan";
import { db } from "../firebase";

function Profile() {
  const [products, setProducts] = useState([]);

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

  console.log(products);

  return (
    <div className="">
      <Header />
      <main className="max-w-2xl mx-auto pt-12">
        <h1 className="text-4xl mb-4">Edit Profile</h1>
        <div className="flex space-x-4">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLQVKtLvxTcroPgQLPJvSf7cVYgfThihxxNd_sFfLg=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            className="h-20"
          />
          <div>
            <h2 className="bg-gray-500 w-72 h-9 text-sm flex items-center pl-3">
              stevef7fywmrp@gmail.com
            </h2>
            <div>
              <h3 className="font-semibold my-4">Plans</h3>
              <hr className="border-gray-600" />
              <div>
                {Object.entries(products).map(([productId, productData]) => {
                  // add some logic to check if the user's subscription is active...
                  return <Plan productData={productData} />;
                })}
              </div>
              <button className="bg-blue-600 font-bold py-1.5 px-6 w-full rounded hover:bg-[#0485ee] tracking-wider">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
