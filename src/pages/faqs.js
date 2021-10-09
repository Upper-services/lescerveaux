import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import Question from "../components/Question";
import Image from "next/image";

function Faqs() {
  return (
    <div className="relative min-h-screen !min-w-max">
      <Head>
        <title>Faqs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-24 md:pt-36 flex flex-col items-center space-y-10 pb-60">
        <img
          src="/images/faqs.svg"
          alt=""
          className="h-40 md:h-64"
          loading="lazy"
        />
        <h4 className="text-xl font-semibold tracking-wide">
          Frequently Asked Questions
        </h4>
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-6 px-10 mx-auto">
          <Question
            text="Les Cerveaux, c'est une formation en ligne ?"
            reply=""
          />
          <Question text="Comment fonctionne la communauté ?" reply="" />
          <Question
            text="Que se passe-t-il après être devenu un Cerveau ?"
            reply=""
          />
          <Question
            text="Je n’ai pas beaucoup de temps, est-ce difficile à suivre ?"
            reply=""
          />
          <Question
            text="Comment savoir si les cerveaux sont faits pour moi ?"
            reply=""
          />
          <Question text="Est-il possible d'annuler à tout moment ?" reply="" />
        </div>
      </div>

      <Footer absolute />
    </div>
  );
}

export default Faqs;
