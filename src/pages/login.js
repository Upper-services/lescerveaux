import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Fade from 'react-reveal/Fade'
import { auth } from '../../firebase'
import validator from 'validator'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'

function Login({ providers }) {
  const [step, setStep] = useState(1)
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
      if (!validator.isEmail(email)) {
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

  const login = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error) => alert(error.message))
  }

  if (user) {
    return <div>{/* <p>Initialising User...</p> */}</div>
  }

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
            width="200"
            objectFit="contain"
            height="100"
            className="cursor-pointer"
            onClick={() => router.push('/')}
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
            New to Lescerveaux?{' '}
            <button onClick={() => router.push('/signup')}>Sign up</button>
          </h4>
        </section>
      )
    case 2:
      return (
        <>
          <section className="text-center pt-20 min-h-screen bg-[#1A1C29] px-6">
            <Head>
              <title>Login | Lescerveaux</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
              src="/images/logo.png"
              width="200"
              objectFit="contain"
              height="100"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />

            <form className="flex text-left flex-col justify-center max-w-md mx-auto mt-8">
              <label htmlFor="email" className="text-xl font-semibold mb-6">
                Enter your password
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
        </>
      )
    default:
    // do nothing
  }
}

export default Login
