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

    if (theme === "dark") {
      config.background.color.value = "#121212";
      config.particles.color.value = "#252525";
      config.particles.shape.stroke.color = "#252525";
      config.particles.line_linked.color = "#252525";
    } else {
      config.background.color.value = "#ebebeb";
      config.particles.color.value = "#d3d3d3";
      config.particles.shape.stroke.color = "#d3d3d3";
      config.particles.line_linked.color = "#d3d3d3";
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
