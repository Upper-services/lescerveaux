import { BookLoader } from "react-awesome-loaders";

function Loader() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <BookLoader
        boxColor={""}
        background={"linear-gradient(50deg, #2563eb, #2563eb)"}
        desktopSize={"100px"}
        mobileSize={"60px"}
        textColor={"#2563eb"}
        text={`"L'identité de chacun est en jeu"`}
      />
    </div>
  );
}

export default Loader;
