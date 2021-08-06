import { SignIn } from "@clerk/clerk-react";
import { getProviders, signIn } from "next-auth/client";

export default function SignInPage({ providers }) {
  return (
    <>
      <SignIn path="/sign-in" routing="path" />
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, { callbackUrl: "http://localhost:3000" })
            }
            className="bg-white text-gray-500 font-semibold p-2 rounded absolute top-0 right-1/2 border"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }
