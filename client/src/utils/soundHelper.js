import React from "react";
import useSound from "use-sound";

import clickOne from "../assets/sounds/click1.wav";

const BoopButton = () => {
  const [play] = useSound(clickOne);

  return <button onClick={play}>Boop!</button>;
};

export default BoopButton;

