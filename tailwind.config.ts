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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#fdf2f2",
          100: "#fde3e3",
          200: "#fbb8b8",
          300: "#f98080",
          400: "#f65454",
          500: "#e41e1e",
          600: "#c86765",
          700: "#944342",
          800: "#7c1e1e",
          900: "#641717",
        },
        secondary: {
          50: "#f5f6f7",
          100: "#ebedf0",
          200: "#d2d5dd",
          300: "#b3b7c4",
          400: "#606377",
          500: "#343541",
          600: "#2b2c36",
          700: "#24252d",
          800: "#1e1f24",
          900: "#18181c",
        },
        background: {
          light: "#D4D4D4",
          dark: "#121212",
        },
        text: {
          light: "#1E1E1E",
          dark: "#D4D4D4",
        },
        border: {
          light: "#111111",
          dark: "#111111",
        },
        particles: {
          light: "#A5A5A5",
          dark: "#282828",
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
