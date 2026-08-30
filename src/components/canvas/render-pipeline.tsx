"use client";

import { useEffect, useMemo } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { fxaa } from "three/addons/tsl/display/FXAANode.js";
import { film } from "three/addons/tsl/display/FilmNode.js";
import { ao } from "three/addons/tsl/display/GTAONode.js";
import { smaa } from "three/addons/tsl/display/SMAANode.js";
import { float, mrt, normalView, output, pass, vec2, vec3, vec4 } from "three/tsl";
import { RenderPipeline as ThreeRenderPipeline } from "three/webgpu";
import type { Node } from "three/webgpu";

import { frameState } from "@/stores/frame-state";
import { useQualitySettings } from "@/stores/scene-store";

const BLOOM = { strength: 0.62, radius: 0.72, threshold: 0.82 } as const;

/**
 * Chromatic aberration parameters.
 *
 * `center` has to be passed explicitly. The addon documents its `center` default as
 * "if null, uses screen center", but it never implements that fallback: it wraps the
 * null in `nodeObject(null)`, which stays null, and then calls `.build()` on it while
 * compiling — so invoking `chromaticAberration(color)` with defaults throws and takes
 * the whole node graph down with it. Strength and scale are both well below the addon
 * defaults of 1.0 and 1.1, which separate the channels far enough that thin bright
 * geometry — the grid lines especially — fringes like a miscalibrated display rather
 * than reading as lens character.
 */
const ABERRATION = { strength: 0.15, center: [0.5, 0.5] as const, scale: 0.28 } as const;

/** A `vec4` colour node — the currency every stage of the chain trades in. */
type ColorNode = Node<"vec4">;

/**
 * The effect classes in `three/addons` are declared as bare `TempNode` subclasses,
 * so they do not carry the chainable method extensions that `Node<T>` adds even
 * though every one of them is a `vec4` node at runtime. This re-attaches the type
 * without scattering double casts through the chain.
 */
const asColor = (node: object): ColorNode => node as ColorNode;

/**
 * Node-based post-processing.
 *
 * `RenderPipeline` replaces the legacy `EffectComposer` chain. Rather than a
 * linear list of full-screen passes, the chain is a graph of TSL nodes that three
 * compiles into as few GPU passes as it can — and it targets WebGPU natively while
 * still running on the WebGL2 fallback, which `EffectComposer` cannot do.
 *
 * The whole graph is rebuilt only when the quality tier changes, never per frame.
 * Recompiling shaders during scroll would be visible as a hitch, so effects are
 * switched by rebuilding once on tier change and then left alone.
 */
export function RenderPipeline() {
  const renderer = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const settings = useQualitySettings();

  const pipeline = useMemo(() => {
    const instance = new ThreeRenderPipeline(renderer as never);
    const scenePass = pass(scene, camera);

    // Ambient occlusion reads view-space normals, which only exist if the scene
    // pass writes them into a second render target alongside colour.
    if (settings.ambientOcclusion) {
      scenePass.setMRT(mrt({ output, normal: normalView }));
    }

    let color: ColorNode = scenePass.getTextureNode("output");

    if (settings.ambientOcclusion) {
      const occlusion = ao(
        scenePass.getTextureNode("depth"),
        scenePass.getTextureNode("normal"),
        camera
      );

      // Occlusion is a scalar, and GTAO renders it into a single-channel
      // (`RedFormat`) target. Multiplying the colour by that texture directly would
      // scale red by the occlusion term and multiply green and blue by zero, turning
      // the whole scene red. Broadcasting the red channel across rgb — and leaving
      // alpha at 1 — is what applies it as a brightness term.
      const shade = occlusion.getTextureNode();
      color = asColor(color.mul(vec4(vec3(shade.r), 1)));
    }

    if (settings.bloom) {
      // Added rather than mixed, so bright emissive geometry blooms without
      // washing out the darks that give the scene its depth.
      color = asColor(color.add(bloom(color, BLOOM.strength, BLOOM.radius, BLOOM.threshold)));
    }

    if (settings.chromaticAberration) {
      color = asColor(
        chromaticAberration(
          color,
          float(ABERRATION.strength),
          vec2(...ABERRATION.center),
          float(ABERRATION.scale)
        )
      );
    }

    if (settings.filmGrain) {
      color = asColor(film(color));
    }

    // Anti-aliasing operates on perceptual (post-tone-mapping, sRGB) values. The
    // pipeline's automatic output transform normally runs last, so it is disabled
    // and applied explicitly before the AA pass instead.
    if (settings.antiAlias === "none") {
      instance.outputNode = color;
    } else {
      instance.outputColorTransform = false;
      const displayReady = asColor(color.renderOutput());
      instance.outputNode = asColor(
        settings.antiAlias === "smaa" ? smaa(displayReady) : fxaa(displayReady)
      );
    }

    return instance;
  }, [
    renderer,
    scene,
    camera,
    settings.ambientOcclusion,
    settings.bloom,
    settings.chromaticAberration,
    settings.filmGrain,
    settings.antiAlias,
  ]);

  useEffect(
    () => () => {
      pipeline.dispose();
    },
    [pipeline]
  );

  // A positive priority hands the render loop to this callback: React Three Fiber
  // stops calling `gl.render()` itself, so the pipeline is the only thing drawing.
  useFrame(() => {
    if (frameState.hidden) return;
    pipeline.render();
  }, 1);

  return null;
}
