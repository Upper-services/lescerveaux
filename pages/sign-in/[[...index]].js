import { SignIn } from "@clerk/clerk-react";
import { getProviders, signIn } from "next-auth/client";

export default function SignInPage({ providers }) {
  return (
    <>
      <section className="relative flex space-x-28 min-h-screen items-center justify-center">
        <video autoPlay loop playsInline className="absolute z-[-1] inset-0">
          <source src="/videos/Snow-night.mp4" type="video/mp4" />
        </video>

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, { callbackUrl: "http://localhost:3000" })
              }
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-1"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-semibold">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}

        <div>
          <SignIn path="/sign-in" routing="path" />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
