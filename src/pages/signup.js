import { getProviders, signIn } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import Fade from "react-reveal/Fade";
import { auth } from "../../firebase";

function Signup({ providers }) {
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const register = () => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
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
          <h2 className="mt-8 mb-4 text-left font-bold text-2xl">Signup</h2>
          <form className="flex flex-col">
            <input
              className="px-2.5 py-4 mb-4 font-medium rounded border border-gray-500 outline-none bg-gray-700"
              placeholder="First Name"
              ref={fNameRef}
            />
            <input
              className="px-2.5 py-4 mb-4 font-medium rounded border border-gray-500 outline-none bg-gray-700"
              placeholder="Last Name"
              ref={lNameRef}
            />
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
              onClick={register}
              type="submit"
            >
              Signup
            </button>
          </form>
          <h4 className="text-left mt-6 font-semibold text-gray-400">
            Already a member?{" "}
            <span
              className="cursor-pointer text-gray-300 font-bold"
              onClick={() => router.push("/login")}
            >
              Log in
            </span>
          </h4>
        </div>

        {Object.values(providers).map((provider) => (
          <Fade left>
            <div key={provider.name}></div>
          </Fade>
        ))}
      </section>
    </>
  );
}

export default Signup;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
