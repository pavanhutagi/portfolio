"use client";

import { useCallback, useEffect, useState } from "react";

import Particles from "react-tsparticles";
import resolveConfig from "tailwindcss/resolveConfig";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import { useAppContext } from "@/context/app-context";

import tailwindConfig from "../../tailwind.config";
import particlesConfigJson from "../configs/particles-config.json";

export default function ParticlesBackground() {
  const [particlesConfig, setParticlesConfig] = useState();
  const { theme } = useAppContext();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const fullConfig = resolveConfig(tailwindConfig);
    const colors: any = fullConfig.theme.colors;
    const config = JSON.parse(JSON.stringify(particlesConfigJson));

    if (theme === "dark") {
      config.background.color.value = colors.background.dark;
      config.particles.color.value = colors.particles.dark;
      config.particles.shape.stroke.color = colors.particles.dark;
      config.particles.line_linked.color = colors.particles.dark;
    } else {
      config.background.color.value = colors.background.light;
      config.particles.color.value = colors.particles.light;
      config.particles.shape.stroke.color = colors.particles.light;
      config.particles.line_linked.color = colors.particles.light;
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
