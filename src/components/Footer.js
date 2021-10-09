import Image from "next/image";

function Footer({ absolute }) {
  return (
    <footer
      className={`mt-20 md:mt-6 py-6 px-6 flex flex-col bg-black ${
        absolute && "absolute w-full bottom-0"
      }`}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={120}
        height={60}
        objectFit="contain"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 md:gap-x-6 gap-y-4">
        <a href="" className="footer-link">
          Privacy Policy
        </a>
        <a href="" className="footer-link">
          Cookies Policy
        </a>
        <a href="" className="footer-link">
          UK & EU Privacy Rights
        </a>
        <a href="" className="footer-link">
          About Les Cerveaux
        </a>
        <a href="" className="footer-link">
          Subscriber Agreement
        </a>
        <a href="" className="footer-link">
          Help
        </a>
      </div>
      <p className="text-xs md:text-sm text-center text-gray-400 mt-4">
        &copy; Les Cerveaux. All rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
