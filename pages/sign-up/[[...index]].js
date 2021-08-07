import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <video
        autoPlay
        loop
        playsInline
        className="absolute z-[-1] inset-0 object-cover"
      >
        <source src="/videos/Snow-night.mp4" type="video/mp4" />
      </video>
      <div className="p-10">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </section>
  );
}
