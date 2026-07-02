"use client";

import { useCallback, useEffect, useState } from "react";

import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import { useAppContext } from "@/context/app-context";

import particlesConfigJson from "../configs/particles-config.json";

export default function ParticlesBackground() {
  const [particlesConfig, setParticlesConfig] = useState();
  const { theme } = useAppContext();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const config = JSON.parse(JSON.stringify(particlesConfigJson));

    // Keep the canvas transparent so the body gradient + grid show through.
    config.background.color.value = "transparent";

    if (theme === "dark") {
      config.particles.color.value = "#00e5ff";
      config.particles.shape.stroke.color = "#00e5ff";
      config.particles.line_linked.color = "#0e5f73";
    } else {
      config.particles.color.value = "#00b8d9";
      config.particles.shape.stroke.color = "#00b8d9";
      config.particles.line_linked.color = "#9db8c4";
    }

    setParticlesConfig(config);
  }, [theme]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10"
      options={particlesConfig}
    />
  );
}
