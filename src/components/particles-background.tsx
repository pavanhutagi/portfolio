"use client";

import { useCallback, useEffect, useState } from "react";

import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particlesConfigJson from "../configs/particles-config.json";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useAppContext } from "@/context/app-context";

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
      config.background.color.value = colors.dark.background.DEFAULT;
      config.particles.color.value = colors.dark.particles.DEFAULT;
      config.particles.shape.stroke.color = colors.dark.particles.DEFAULT;
      config.particles.line_linked.color = colors.dark.particles.DEFAULT;
    } else {
      config.background.color.value = colors.background.DEFAULT;
      config.particles.color.value = colors.particles.DEFAULT;
      config.particles.shape.stroke.color = colors.particles.DEFAULT;
      config.particles.line_linked.color = colors.particles.DEFAULT;
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
