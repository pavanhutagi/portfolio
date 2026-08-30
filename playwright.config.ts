import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  // The frame-rate assertions time real work, so parallel workers competing for the
  // same CPU would make the measurements meaningless.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 20_000 },
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          args: [
            // Headless Chromium has no physical GPU in CI. These flags enable
            // ANGLE-over-SwiftShader so WebGL2 and WebGPU still initialise, which is
            // what lets the scene be exercised at all — with the caveat that the
            // resulting frame rates reflect software rasterisation, not real hardware.
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
            "--enable-unsafe-webgpu",
            "--enable-features=Vulkan,VulkanFromANGLE",
            "--disable-dev-shm-usage",
          ],
        },
      },
    },
  ],

  // Tests run against a production build: the dev server's double-invoked effects
  // and unminified bundles would distort every timing measured here.
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
