"use client";

import { useEffect, useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Color, type Mesh } from "three";
import { mix, mx_noise_float, positionLocal, time, vec3 } from "three/tsl";
import { MeshPhysicalNodeMaterial } from "three/webgpu";

import { damp } from "@/lib/math";
import { frameState } from "@/stores/frame-state";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Placeholder hero object.
 *
 * Stands in for whatever model the finished site puts at the centre of the shot.
 * It exists mainly to prove the pipeline end to end: a TSL node material feeding
 * emissive values into bloom, receiving real lighting and casting a shadow.
 *
 * Replace the geometry with a compressed GLB (see `scripts/optimize-models.mjs`)
 * once the content is decided; the material and rotation logic can stay.
 */
export function Centerpiece() {
  const mesh = useRef<Mesh>(null);

  const material = useMemo(() => {
    const nodeMaterial = new MeshPhysicalNodeMaterial({
      color: new Color("#141a26"),
      metalness: 0.92,
      roughness: 0.19,
      // Iridescence gives the silhouette a shifting edge colour, so the object
      // stays legible against a dark background without needing a rim light per side.
      iridescence: 1,
      iridescenceIOR: 1.9,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });

    // Emissive veins driven by animated 3D noise. Values above 1 are what the
    // bloom pass keys off, so this is deliberately allowed to overshoot.
    const veins = mx_noise_float(positionLocal.mul(2.4).add(vec3(0, time.mul(0.18), 0)));
    const glow = veins.smoothstep(0.42, 0.95);

    const accent = new Color("#4fd6e8");
    const violet = new Color("#9b7cf0");

    nodeMaterial.emissiveNode = mix(
      vec3(0, 0, 0),
      mix(vec3(accent.r, accent.g, accent.b), vec3(violet.r, violet.g, violet.b), glow),
      glow
    ).mul(2.6);

    return nodeMaterial;
  }, []);

  useEffect(
    () => () => {
      material.dispose();
    },
    [material]
  );

  useFrame((_, delta) => {
    if (frameState.hidden || !mesh.current) return;

    const dt = Math.min(delta, 1 / 30);
    const reducedMotion = useSceneStore.getState().reducedMotion;

    if (reducedMotion) return;

    mesh.current.rotation.y += dt * 0.18;

    // Scroll velocity nudges the object's tilt, so the world reacts to input
    // instead of looping independently of it.
    const targetTilt = frameState.scrollVelocity * 0.006 + frameState.smoothPointerY * 0.12;
    mesh.current.rotation.x = damp(mesh.current.rotation.x, targetTilt, 3, dt);
  });

  return (
    <mesh ref={mesh} position={[0, 0.35, 0]} castShadow receiveShadow material={material}>
      <torusKnotGeometry args={[0.92, 0.29, 220, 36, 2, 3]} />
    </mesh>
  );
}
