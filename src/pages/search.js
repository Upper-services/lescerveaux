import { db } from "../../firebase";
import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

function Search() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "lescerveaux-com",
    },
  });

  const myVideo = cld.video(
    "1-%20LIVRES/2-%20Les%20tr%C3%A9sors%20de%20guerre/%C3%80%20LA%20GUERRE%20COMME%20%C3%80%20LA%20GUERRE/MENSONGE_Pourquoi_NE_PAS_%C3%8ATRE_GENTIL_REDPILL_-_MGTOW_fr_-_NOFAP_france_-_NO_FAP_fran%C3%A7ais_abmgkk"
  );

  return (
    <div>
      <AdvancedVideo cldVid={myVideo} controls />
    </div>
  );
}

export default Search;
