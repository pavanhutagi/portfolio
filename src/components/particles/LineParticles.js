import "./LineParticles.css";

import particlesConfigJson from "@/configs/particles-config.json";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function LineParticles() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  let particlesConfig = JSON.parse(JSON.stringify(particlesConfigJson));

  return (
    <>
      <Particles
        id="tsparticles1"
        init={particlesInit}
        options={particlesConfig}
        className="particles"
      />
    </>
  );
}
