import { getProviders, signIn } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";

function Signup({ providers }) {
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

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/");
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
              Step {step} of 3
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
              Step {step} of 3
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
                type="submit"
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
    // never forget the default case, otherwise VS code would be mad!
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
