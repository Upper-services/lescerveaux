import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import HeaderLinks from "./HeaderLinks";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <Image
        src="https://raw.githubusercontent.com/lukef7fywmrp/disney-clone/2867c47cdae53ce5c529e0f27cd9b0b04c15c911/public/images/logo.svg"
        alt=""
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <SignedOut>
        {session && (
          <>
            <HeaderLinks />
            <img
              src={session.user.image}
              className="h-12 w-12 rounded-full object-cover cursor-pointer ml-auto"
              onClick={signOut}
            />
          </>
        )}
      </SignedOut>

      <SignedIn>
        <HeaderLinks />
        <div className="ml-auto">
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}

export default Header;
