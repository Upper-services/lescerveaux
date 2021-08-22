// import { getProviders, signIn } from "next-auth/client";
// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useRef, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase";
// import Plans from "../components/Plans";
// import { useForm } from "react-hook-form";

// function Signup({ providers }) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [step, setStep] = useState(1);
//   const router = useRouter();
//   const emailRef = useRef();
//   const [user, loading] = useAuthState(auth);

//   const Continue = (e) => {
//     e.preventDefault();
//     setStep(step + 1);
//   };

//   const Previous = (e) => {
//     e.preventDefault();
//     setStep(step - 1);
//   };

//   const onSubmit = ({ email, password, username }) => {
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((authUser) => {
//         authUser.user.updateProfile({
//           // Access the first name of the user
//           displayName: username.split(" ")[0],
//         });
//         setStep(step + 1);
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

//   switch (step) {
//     case 1:
//       return (
//         <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Sign Up | Lescerveaux</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//           <button
//             className="hidden md:inline-flex absolute right-20 font-semibold"
//             onClick={() => router.push("/login")}
//           >
//             Log In
//           </button>
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
//             <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
//               Step {step} of 4
//             </small>
//             <label className="text-xl font-semibold mb-6">
//               Enter your username
//             </label>

//             <input
//               placeholder="Username"
//               className={`bg-[#30343E] rounded px-4 pl-2.5 py-3 border outline-none placeholder-[#A2A3A6] ${
//                 errors.username
//                   ? "border-red-500 mb-0.5"
//                   : "border-transparent focus:border-white/30 mb-7"
//               }`}
//               {...register("username", { required: true })}
//             />
//             {errors.username && (
//               <span className="text-red-500 font-medium text-xs mb-7">
//                 Username is required
//               </span>
//             )}

//             {/* Agreement Check */}

//             <button
//               className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6"
//               type="submit"
//               onClick={Continue}
//             >
//               Continue
//             </button>
//           </form>

//           <h4 className="text-sm text-left max-w-md mx-auto font-medium">
//             Already a member?{" "}
//             <button
//               onClick={() => router.push("/login")}
//               className="font-medium hover:underline hover:text-[#94d0ff] text-sm"
//             >
//               Log In
//             </button>
//           </h4>
//         </section>
//       );
//     case 2:
//       return (
//         <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Sign Up | Lescerveaux</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//           <button
//             className="hidden md:inline-flex absolute right-20 font-semibold"
//             onClick={() => router.push("/login")}
//           >
//             Log In
//           </button>
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
//             <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
//               Step {step} of 4
//             </small>
//             <label className="text-xl font-semibold mb-6">
//               Enter your email
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
//               ref={emailRef}
//             />
//             {errors.email && (
//               <span className="text-red-500 font-medium text-xs mb-7">
//                 Email is required
//               </span>
//             )}

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
//                 onClick={Continue}
//               >
//                 Continue
//               </button>
//             </div>
//           </form>
//         </section>
//       );
//     case 3:
//       return (
//         <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Sign Up | Lescerveaux</title>
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
//             <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
//               Step {step} of 4
//             </small>
//             <label htmlFor="email" className="text-xl font-semibold mb-6">
//               Create a password
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className={`bg-[#30343E] rounded px-4 pl-2.5 py-3 border  outline-none placeholder-[#A2A3A6] ${
//                 errors.password
//                   ? "border-red-500 mb-0.5"
//                   : "border-transparent focus:border-white/30 mb-2"
//               }`}
//               {...register("password", { required: true, minLength: 6 })}
//             />
//             {errors.password && (
//               <span className="text-red-500 font-medium text-xs mb-3">
//                 Password is required
//               </span>
//             )}
//             <p className="text-xs max-w-sm mb-8">
//               Use a minimum of 6 characters (case sensitive) with at least one
//               number or special character.
//             </p>
//             {/* <div className="flex items-center space-x-3 mb-8">
//               <span className="border-l-2 h-10" />
//               <div className="font-medium">
//                 <h5 className="text-xs text-gray-400 tracking-wide">
//                   You'll be using this email to log in:
//                 </h5>
//                 <h4 className="text-sm">{emailRef.current.value}</h4>
//               </div>
//             </div> */}
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
//               >
//                 Continue
//               </button>
//             </div>
//           </form>
//         </section>
//       );
//     case 4:
//       return (
//         <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
//           <Head>
//             <title>Membership | Lescerveaux</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>

//           <Image
//             src="/images/logo.png"
//             width="100"
//             height="100"
//             className="cursor-pointer"
//             onClick={() => router.push("/")}
//           />

//           <div className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
//             <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
//               Step {step} of 4
//             </small>

//             <Plans />
//           </div>
//         </section>
//       );
//     default:
//     // do nothing
//   }
// }

// export default Signup;

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

import { getProviders, signIn } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";
import Plans from "../components/Plans";

function Signup({ providers }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
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

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          // Access the first name of the user
          displayName: username.split(" ")[0],
        });
        setStep(step + 1);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  switch (step) {
    case 1:
      return (
        <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Sign Up | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <button
            className="hidden md:inline-flex absolute right-20 font-semibold"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
              Step {step} of 4
            </small>
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Enter your username
            </label>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#30343E] rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none mb-4 placeholder-[#A2A3A6]"
            />

            <button
              className="bg-blue-600 uppercase text-sm font-semibold tracking-wider py-2.5 px-6 w-full rounded hover:bg-[#0485ee] mb-6"
              type="submit"
              onClick={Continue}
            >
              Agree & Continue
            </button>
          </form>
          <h4 className="text-sm text-left max-w-md mx-auto md:hidden">
            Already a member?{" "}
            <button onClick={() => router.push("/login")}>Log In</button>
          </h4>
        </section>
      );
    case 2:
      return (
        <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Sign Up | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <button
            className="hidden md:inline-flex absolute right-20 font-semibold"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
              Step {step} of 4
            </small>
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Enter your email
            </label>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#30343E] rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none mb-4 placeholder-[#A2A3A6]"
            />

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
                onClick={Continue}
              >
                Continue
              </button>
            </div>
          </form>
          <h4 className="text-sm text-left max-w-md mx-auto md:hidden">
            Already a member?{" "}
            <button onClick={() => router.push("/login")}>Log In</button>
          </h4>
        </section>
      );
    case 3:
      return (
        <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Sign Up | Lescerveaux</title>
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
            <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
              Step {step} of 4
            </small>
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Create a password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#30343E] rounded px-4 pl-2.5 py-3 border border-transparent focus:border-white/30 outline-none mb-4 placeholder-[#A2A3A6]"
            />
            <p className="text-xs max-w-sm mb-8">
              Use a minimum of 6 characters (case sensitive) with at least one
              number or special character.
            </p>
            <div className="flex items-center space-x-3 mb-8">
              <span className="border-l-2 h-10" />
              <div className="font-medium">
                <h5 className="text-xs text-gray-400 tracking-wide">
                  You'll be using this email to log in:
                </h5>
                <h4 className="text-sm">{email}</h4>
              </div>
            </div>
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
                onClick={register}
              >
                Continue
              </button>
            </div>
          </form>
        </section>
      );
    case 4:
      return (
        <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Membership | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
              Step {step} of 4
            </small>

            <Plans />
          </div>
        </section>
      );
    default:
    // do nothing
  }
}

export default Signup;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
