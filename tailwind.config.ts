import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ["var(--font-oxanium)"],
      },
      colors: {
        primary: {
          DEFAULT: "#C86765",
        },
        secondary: {
          DEFAULT: "#606377",
        },
        background: {
          DEFAULT: "#D4D4D4",
        },
        text: {
          DEFAULT: "#1E1E1E",
        },
        border: {
          DEFAULT: "#111111",
        },
        particles: {
          DEFAULT: "#A5A5A5",
        },

        dark: {
          primary: {
            DEFAULT: "#C86765",
          },
          secondary: {
            DEFAULT: "#606377",
          },
          background: {
            DEFAULT: "#111111",
          },
          text: {
            DEFAULT: "#D4D4D4",
          },
          border: {
            DEFAULT: "#111111",
          },
          particles: {
            DEFAULT: "#464646",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
