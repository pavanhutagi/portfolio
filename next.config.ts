import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // The React Compiler auto-memoizes components, which matters a lot here: the DOM
  // overlay must never re-render during a scroll-driven frame or the canvas drops frames.
  reactCompiler: true,

  typedRoutes: true,

  // `three` and its addons ship untranspiled ESM with deep subpath imports
  // (`three/webgpu`, `three/tsl`, `three/addons/*`).
  transpilePackages: ["three"],

  experimental: {
    // Only pull the icons actually referenced instead of the whole barrel file.
    optimizePackageImports: ["lucide-react", "motion", "radix-ui"],

    // Next 16 defaults this to `true`, which shells out to a `tsc` binary from the
    // `typescript` package. Here `typescript` is aliased to the TypeScript 6 API
    // package (see README > TypeScript) and only ships `tsc6`, so the CLI path
    // cannot find a binary. The API path works with that alias, and `npm run
    // typecheck` still uses the much faster TypeScript 7 native compiler.
    useTypeScriptCli: false,
  },

  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },

  headers: () =>
    Promise.resolve([
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // Models and textures are content-hashed at build time, so they can be cached hard.
        source: "/models/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/textures/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]),
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
