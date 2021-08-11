// import { getProviders, signIn } from "next-auth/client";
// import Fade from "react-reveal/Fade";

// function Login({ providers }) {
//   return (
//     <>
//       <section className="relative xl:flex p-10 space-y-12 text-center min-h-screen items-center justify-center">
//         <video
//           autoPlay
//           loop
//           playsInline
//           className="hidden xl:inline absolute z-[-1] inset-0"
//         >
//           <source src="/videos/Snow-night.mp4" type="video/mp4" />
//         </video>

//         {Object.values(providers).map((provider) => (
//           <Fade left>
//             <div
//               key={provider.name}
//               className="flex xl:inline items-center flex-col max-w-lg mx-auto after:w-full after:h-0.5 after:bg-linear-gradient after:mt-12"
//             >
//               <button
//                 onClick={() =>
//                   signIn(provider.id, { callbackUrl: "http://localhost:3000" })
//                 }
//                 className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
//               >
//                 <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-1"></span>
//                 <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-semibold">
//                   Sign in with {provider.name}
//                 </span>
//               </button>
//             </div>
//           </Fade>
//         ))}
//       </section>
//     </>
//   );
// }

// export default Login;

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

import { getProviders, signIn } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";

function Login({ providers }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const login = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <section className="text-center pt-32 min-h-screen bg-[#1C1B29] px-8">
        <div className="max-w-xl mx-auto">
          <Image
            src="/images/logo.png"
            alt=""
            width={100}
            height={100}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <h2 className="mt-8 mb-4 text-left font-bold text-2xl">
            Log in with your email
          </h2>
          <form className="flex flex-col">
            <input
              type="email"
              className="px-2.5 py-4 mb-4 font-medium rounded border border-gray-500 outline-none bg-gray-700"
              placeholder="Email"
              ref={emailRef}
            />
            <input
              type="password"
              className="px-2.5 py-4 mb-6 font-medium rounded border border-gray-500 outline-none bg-gray-700"
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              className="bg-blue-600 uppercase text-xl font-bold py-3.5 px-6 w-full rounded hover:bg-[#0485ee] tracking-wider"
              onClick={login}
              type="submit"
            >
              Login
            </button>
          </form>
          <h4 className="text-left mt-6 font-semibold text-gray-400">
            New to Lescerveaux?{" "}
            <span
              className="cursor-pointer text-gray-300 font-bold"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </h4>
        </div>

        {/* {Object.values(providers).map((provider) => (
          <Fade left>
            <div key={provider.name}></div>
          </Fade>
        ))} */}
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
