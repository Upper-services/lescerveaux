import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const PlayAnimation = () => {
  const router = useRouter();
  const soundRef = useRef(null);

  return (
    <div className="PlayAnimation__wrp">
      <span className="PlayAnimation__text text-blue-500">LES CERVEAUX</span>
    </div>
  );
};

export default PlayAnimation;
