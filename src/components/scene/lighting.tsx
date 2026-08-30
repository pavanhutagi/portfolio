"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";

import { frameState } from "@/stores/frame-state";
import { useQualitySettings } from "@/stores/scene-store";

/**
 * Scene lighting.
 *
 * A three-point rig: one shadow-casting key light, plus two coloured rim lights
 * that orbit slowly to keep specular highlights moving across the centerpiece.
 * Only the key light casts shadows — each additional shadow-casting light means
 * another full depth render of the scene every frame.
 */
export function Lighting() {
  const { shadows, shadowMapSize } = useQualitySettings();

  const coolRim = useRef<PointLight>(null);
  const warmRim = useRef<PointLight>(null);

  useFrame(() => {
    if (frameState.hidden) return;

    const t = frameState.elapsed;

    if (coolRim.current) {
      coolRim.current.position.set(Math.sin(t * 0.32) * 5.2, 2.1, Math.cos(t * 0.32) * 5.2);
    }

    if (warmRim.current) {
      warmRim.current.position.set(
        Math.sin(t * 0.24 + Math.PI) * 6.4,
        -1.4,
        Math.cos(t * 0.24 + Math.PI) * 6.4
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.16} color="#7d8fb8" />

      <directionalLight
        position={[5.5, 8, 4.5]}
        intensity={2.4}
        color="#ffffff"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        // A tight ortho frustum around the subject keeps texel density high, which
        // matters far more for shadow quality than raw map resolution.
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-bias={-0.0009}
        shadow-normalBias={0.022}
      />

      <pointLight ref={coolRim} intensity={26} distance={18} decay={2} color="#4fd6e8" />
      <pointLight ref={warmRim} intensity={18} distance={20} decay={2} color="#f0a35e" />

      {/* Fills the shadowed side so it reads as unlit rather than solid black. */}
      <hemisphereLight args={["#334463", "#0b0d14", 0.42]} />
    </>
  );
}
