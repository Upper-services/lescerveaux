import { SignUp } from "@clerk/clerk-react";
import Bounce from "react-reveal/Bounce";

export default function SignUpPage() {
  return (
    <section className="relative sm:p-10 xl:p-0 xl:flex min-h-screen items-center justify-center">
      <video
        autoPlay
        loop
        playsInline
        className="hidden xl:inline absolute z-[-1] inset-0 object-cover"
      >
        <source src="/videos/Snow-night.mp4" type="video/mp4" />
      </video>
      <Bounce left>
        <div className="xl:p-10">
          <SignUp path="/sign-up" routing="path" />
        </div>
      </Bounce>
    </section>
  );
}
