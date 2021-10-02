import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Fade from 'react-reveal/Fade'
import { auth } from '../../firebase'
import Plans from '../components/Plans'
import validator from 'validator'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import DOMPurify from 'dompurify'

function Signup({ providers }) {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [passwordShown, setPasswordShown] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        router.push('/')
      }
    })

    return unsubscribe
  }, [])

  const Continue = (e) => {
    e.preventDefault()
    if (step === 1) {
      const dirty = username
      const clean = DOMPurify.sanitize(username)
      setUsername(clean)
      if (
        validator.isEmpty(username, { ignore_whitespace: true }) ||
        dirty !== clean
      ) {
        alert('Please enter a valid username!')
        return
      }
    }
    if (step === 2) {
      const dirty = email
      const clean = DOMPurify.sanitize(email)
      setEmail(clean)
      if (!validator.isEmail(email) || dirty !== clean) {
        alert('Please enter a valid email!')
        return
      }
    }
    setStep(step + 1)
  }

  const Previous = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  const register = (e) => {
    e.preventDefault()
    if (step === 3) {
      if (!validator.isStrongPassword(password)) {
        alert(
          'The password must be atleast 8 chars long, 1 uppercase, 1 number & 1 symbol!'
        )
        return
      }
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        })
        // setStep(step + 1);
        router.push('/')
      })
      .catch((err) => alert(err.message))
  }

  if (user) {
    return <div>{/* <p>Initialising User...</p> */}</div>
  }

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
            onClick={() => router.push('/login')}
          >
            Log In
          </button>
          <Image
            src="/images/logo.png"
            width="200"
            height="100"
            className="cursor-pointer"
            objectFit="contain"
            onClick={() => router.push('/')}
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
              required={true}
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
            Already a member?{' '}
            <button onClick={() => router.push('/login')}>Log In</button>
          </h4>
        </section>
      )
    case 2:
      return (
        <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Sign Up | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <button
            className="hidden md:inline-flex absolute right-20 font-semibold"
            onClick={() => router.push('/login')}
          >
            Log In
          </button>
          <Image
            src="/images/logo.png"
            width="200"
            height="100"
            className="cursor-pointer"
            objectFit="contain"
            onClick={() => router.push('/')}
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
              required
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
            Already a member?{' '}
            <button onClick={() => router.push('/login')}>Log In</button>
          </h4>
        </section>
      )
    case 3:
      return (
        <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
          <Head>
            <title>Sign Up | Lescerveaux</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Image
            src="/images/logo.png"
            width="200"
            height="100"
            className="cursor-pointer"
            objectFit="contain"
            onClick={() => router.push('/')}
          />

          <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
            <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
              Step {step} of 4
            </small>
            <label htmlFor="email" className="text-xl font-semibold mb-6">
              Create a password
            </label>
            <div className="relative bg-[#30343E] rounded border border-transparent focus-within:border-white/30 mb-4 overflow-hidden">
              <input
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#30343E] px-4 pl-2.5 py-3 outline-none placeholder-[#A2A3A6]"
              />
              {passwordShown ? (
                <EyeIcon
                  className="absolute right-2.5 inset-y-0 my-auto h-5 text-gray-400 cursor-pointer"
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              ) : (
                <EyeOffIcon
                  className="absolute right-2.5 inset-y-0 my-auto h-5 text-gray-400 cursor-pointer"
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              )}
            </div>
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
      )
    // case 4:
    //   return (
    //     <section className="relative text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
    //       <Head>
    //         <title>Membership | Lescerveaux</title>
    //         <link rel="icon" href="/favicon.ico" />
    //       </Head>

    //       <Image
    //         src="/images/logo.png"
    //         width="200"
    //         height="100"
    //         className="cursor-pointer"
    //         objectFit="contain"
    //         onClick={() => router.push("/")}
    //       />

    //       <div className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
    //         <small className="text-gray-300 tracking-widest text-[10px] uppercase font-medium">
    //           Step {step} of 4
    //         </small>

    //         <Plans />
    //       </div>
    //     </section>
    //   );
    default:
    // do nothing
  }
}

export default Signup
