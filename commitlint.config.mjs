/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      1,
      "always",
      [
        "scene",
        "shaders",
        "camera",
        "ui",
        "motion",
        "state",
        "perf",
        "config",
        "deps",
        "ci",
        "docs",
      ],
    ],
    "body-max-line-length": [0],
  },
};

export default config;
