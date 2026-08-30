import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
    // Playwright owns everything under `e2e/`; running those files here would
    // start a second browser runner inside jsdom.
    exclude: ["e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html"],
      // The renderer, scene graph and pipeline need a real GPU to execute, so they
      // are verified by the Playwright suite rather than counted here.
      include: ["src/lib/**", "src/config/**", "src/stores/**"],
    },
  },
});
