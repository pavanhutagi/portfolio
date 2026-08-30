"use client";

import { useEffect, useMemo } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { fxaa } from "three/addons/tsl/display/FXAANode.js";
import { film } from "three/addons/tsl/display/FilmNode.js";
import { ao } from "three/addons/tsl/display/GTAONode.js";
import { smaa } from "three/addons/tsl/display/SMAANode.js";
import { mrt, output, pass, transformedNormalView } from "three/tsl";
import { RenderPipeline as ThreeRenderPipeline } from "three/webgpu";
import type { Node } from "three/webgpu";

import { frameState } from "@/stores/frame-state";
import { useQualitySettings } from "@/stores/scene-store";

const BLOOM = { strength: 0.62, radius: 0.72, threshold: 0.82 } as const;

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
      scenePass.setMRT(mrt({ output, normal: transformedNormalView }));
    }

    let color: ColorNode = scenePass.getTextureNode("output");

    if (settings.ambientOcclusion) {
      const occlusion = ao(
        scenePass.getTextureNode("depth"),
        scenePass.getTextureNode("normal"),
        camera
      );
      color = asColor(color.mul(occlusion.getTextureNode()));
    }

    if (settings.bloom) {
      // Added rather than mixed, so bright emissive geometry blooms without
      // washing out the darks that give the scene its depth.
      color = asColor(color.add(bloom(color, BLOOM.strength, BLOOM.radius, BLOOM.threshold)));
    }

    if (settings.chromaticAberration) {
      color = asColor(chromaticAberration(color));
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
