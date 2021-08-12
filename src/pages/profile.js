import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Header from "../components/Header";
import Plans from "../components/Plans";

function Profile() {
  const [user] = useAuthState(auth);

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
              {user?.email}
            </h2>
            <div>
              <h3 className="font-semibold my-4">Plans</h3>
              <hr className="border-gray-600" />
              <Plans />
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
