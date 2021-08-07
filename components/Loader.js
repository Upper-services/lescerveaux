import { BoltLoader } from "react-awesome-loaders";

function BoltLoaderComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BoltLoader
        className={"loaderbolt"}
        boltColor={"#2563EB"}
        backgroundBlurColor={"#E0E7FF"}
        desktopSize={"100px"}
        mobileSize={"60px"}
      />
    </div>
  );
}

export default BoltLoaderComponent;
