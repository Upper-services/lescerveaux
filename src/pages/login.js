// import { getProviders } from "next-auth/client";
// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase";
// import { useForm } from "react-hook-form";

// function Login({ providers }) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [step, setStep] = useState(1);
//   const router = useRouter();
//   const [user, loading] = useAuthState(auth);

//   const onSubmit = ({ email, password }) => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         router.push("/");
//       })
//       .catch((error) => alert(error.message));
//   };

//   useEffect(() => {
//     if (user) {
//       router.push("/");
//     }
//   }, [user]);

//   const Continue = (e) => {
//     e.preventDefault();
//     setStep(step + 1);
//   };

//   const Previous = (e) => {
//     e.preventDefault();
//     setStep(step - 1);
//   };

//   switch (step) {
//     case 1:
//       return (
//         <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Login | Lescerveaux</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>

//           <Image
//             src="/images/logo.png"
//             width="100"
//             height="100"
//             className="cursor-pointer"
//             onClick={() => router.push("/")}
//           />

//           <form
//             className="flex text-left flex-col justify-center max-w-md mx-auto mt-8"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <label className="text-xl font-semibold mb-6">
//               Log in with your email
//             </label>

//             <input
//               type="email"
//               placeholder="Email"
//               className={`bg-[#30343E] rounded px-4 pl-2.5 py-3 border outline-none placeholder-[#A2A3A6] ${
//                 errors.email
//                   ? "border-red-500 mb-0.5"
//                   : "border-transparent focus:border-white/30 mb-7"
//               }`}
//               {...register("email", { required: true })}
//             />
//             {errors.email && (
//               <span className="text-red-500 font-medium text-xs mb-7">
//                 Email is required
//               </span>
//             )}
//             <button
//               className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6"
//               type="submit"
//               onClick={Continue}
//             >
//               Continue
//             </button>
//           </form>
//           <h4 className="text-sm text-left max-w-md mx-auto font-medium">
//             New to Lescerveaux?{" "}
//             <button
//               onClick={() => router.push("/signup")}
//               className="font-medium hover:underline hover:text-[#94d0ff] text-sm"
//             >
//               Sign up
//             </button>
//           </h4>
//         </section>
//       );
//     case 2:
//       return (
//         <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Login | Lescerveaux</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//           <Image
//             src="/images/logo.png"
//             width="100"
//             height="100"
//             className="cursor-pointer"
//             onClick={() => router.push("/")}
//           />

//           <form
//             className="flex text-left flex-col justify-center max-w-md mx-auto mt-8"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <label htmlFor="email" className="text-xl font-semibold mb-6">
//               Enter your password
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className={`bg-[#30343E] rounded px-4 pl-2.5 py-3 border  outline-none placeholder-[#A2A3A6] ${
//                 errors.password
//                   ? "border-red-500 mb-0.5"
//                   : "border-transparent focus:border-white/30 mb-2"
//               }`}
//               {...register("password", { required: true })}
//             />
//             {errors.password && (
//               <span className="text-red-500 font-medium text-xs mb-3">
//                 Password is required
//               </span>
//             )}
//             <p className="text-xs max-w-sm mb-8">(case sensitive)</p>

//             <div className="flex space-x-3">
//               <a
//                 className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] cursor-pointer flex justify-center items-center"
//                 onClick={Previous}
//               >
//                 Previous
//               </a>
//               <button
//                 className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee]"
//                 type="submit"
//                 // onClick={login}
//               >
//                 Log In
//               </button>
//             </div>
//             <a
//               href="#"
//               className="text-[#67bdff] font-medium hover:underline hover:text-[#94d0ff] text-sm mt-6"
//             >
//               Forgot password?
//             </a>
//           </form>
//         </section>
//       );
//     default:
//     // do nothing
//   }
// }

// export default Login;

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

import { getProviders } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";

function Login({ providers }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const Continue = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const Previous = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const login = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => alert(error.message));
  };

  switch (step) {
    case 1:
      return (
        <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Login | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Log in with your email
            </label>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#30343E] rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none mb-7 placeholder-[#A2A3A6]"
            />

            <button
              className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6"
              type="submit"
              onClick={Continue}
            >
              Continue
            </button>
          </form>
          <h4 className="text-sm text-left max-w-md mx-auto">
            New to Lescerveaux?{" "}
            <button onClick={() => router.push("/signup")}>Sign up</button>
          </h4>
        </section>
      );
    case 2:
      return (
        <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Login | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Enter your password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#30343E] rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none mb-4 placeholder-[#A2A3A6]"
            />
            <p className="text-xs max-w-sm mb-8">(case sensitive)</p>

            <div className="flex space-x-3">
              <a
                className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] cursor-pointer flex justify-center items-center"
                onClick={Previous}
              >
                Previous
              </a>
              <button
                className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee]"
                type="submit"
                onClick={login}
              >
                Log In
              </button>
            </div>
          </form>
        </section>
      );
    default:
    // do nothing
  }
}

export default Login;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
