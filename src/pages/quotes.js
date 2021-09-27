import Head from "next/head";
import Header from "../components/Header";
import Quote from "../components/Quote";

function Quotes() {
  return (
    <div>
      <Head>
        <title>Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="grid gap-8 items-start justify-center pt-44 min-h-screen">
        <Quote
          book="La Puissance De La Persuasion par Napoleon Hill"
          author="Napoleon Hill"
          quote="Le temps le plus profitable d’une personne est celui où elle n’est pas directement rémunérée.
"
        />
        <Quote
          book="La Vérité Et Rien D'Autre : Autobiographie"
          author="Mike Tyson"
          quote="Parce que faire une chose qu'on déteste comme si on l'appréciait est une étape nécessaire sur le chemin de la grandeur."
        />
        <Quote
          book="What The Hell Is F.U. Money? par Dan Loke"
          author="Dan Loke"
          quote="Don't just work hard, work hard at working smart."
        />
        <Quote
          book="Le Principe 80/20 par Richard Koch"
          author="Richard Koch"
          quote="Si nous utilisons efficacement 20% de notre temps seulement, nous n’en manquerons jamais !"
        />
        <Quote
          book="Deep Work par Cal Newport"
          author="Cal Newport"
          quote="Ne pas utiliser internet pour vous divertir."
        />
        <Quote
          book="Que Ferait Freud À Ma Place ? par Sarah Tomley"
          author="Sarah Tomley"
          quote="Rien n’est aussi fatiguant que de remettre perpétuellement à plus tard une tâche inachevée. William James."
        />
        <Quote
          book="Le Succès Par La Pensée Constructive par Napoleon Hill et W. Clement Stone"
          author="W. Clement Stone"
          quote="Ne considérez pas le temps passé à réfléchir comme du temps perdu."
        />
        <Quote
          book="Les Mini-Habitudes par Stephen Guise"
          author="Stephen Guise"
          quote="Pour effectuer des changements durables, vous devez cesser de lutter contre votre cerveau."
        />
        <Quote
          book="La Puissance De La Persuasion par Napoleon Hill"
          author="Napoleon Hill"
          quote="L’esprit n’est jamais fatigué, mais il est parfois ennuyé par ce qui l’alimente."
        />
        <Quote
          book="E-Myth par Michael E. Gerber"
          author="Michael E. Gerber"
          quote="Les jeux de la vie reflètent les buts de la vie. Robert S. de Roop."
        />
        <Quote
          book="Les Mini-Habitudes par Stephen Guise"
          author="Stephen Guise"
          quote="La répétition est le langage de l’inconscient."
        />
        <Quote
          book="La Puissance De La Persuasion par Napoleon Hill"
          author="Napoleon Hill"
          quote="Une fois avoir examiner chacune des facettes de ce que vous craignez, agissez sans attendre. La procrastination risque tout bonnement de susciter plus de doute et de peur."
        />
        <Quote
          book="The Compound Effect par Darren Hardy"
          author="Darren Hardy"
          quote="Attention feeds the habit."
        />
        <Quote
          book="Les Mini-Habitudes par Stephen Guise"
          author="Stephen Guise"
          quote="Croire que vous devez être motivé pour passer à l’action est destructeur. Le problème ne se pose pas lorsque vous aimeriez être motivé, mais lorsque vous ne pouvez rien faire sans l’être. Voilà la façon parfaite d’être entraîné dans la spirale de la presse. À être paresseux, on se sent paresseux ; si c’est toujours ainsi que l’on se sent et que l’on compte sur la motivation, on continue d’être paresseux. Il n’y a pas d’issue possible !"
        />
        <Quote book author quote />
        <Quote book author quote />
        <Quote book author quote />
        <Quote book author quote />
      </div>
    </div>
  );
}

export default Quotes;
