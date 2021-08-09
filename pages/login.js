import { getProviders, signIn } from "next-auth/client";
import Fade from "react-reveal/Fade";

function Login({ providers }) {
  return (
    <>
      <section className="relative xl:flex p-10 space-y-12 text-center xl:space-x-28 min-h-screen items-center justify-center">
        <video
          autoPlay
          loop
          playsInline
          className="hidden xl:inline absolute z-[-1] inset-0"
        >
          <source src="/videos/Snow-night.mp4" type="video/mp4" />
        </video>

        {Object.values(providers).map((provider) => (
          <Fade left>
            <div
              key={provider.name}
              className="flex xl:inline items-center flex-col max-w-lg mx-auto after:w-full after:h-0.5 after:bg-linear-gradient after:mt-12"
            >
              <button
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "http://localhost:3000" })
                }
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-1"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-semibold">
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          </Fade>
        ))}
      </section>
    </>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
