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
        // Primary brand color with variations
        primary: {
          50: "#fdf2f2",
          100: "#fde3e3",
          200: "#fbb8b8",
          300: "#f98080",
          400: "#f65454",
          500: "#e41e1e", // Main primary color
          600: "#c81e1e",
          700: "#a41919",
          800: "#7c1e1e",
          900: "#641717",
          950: "#4c1111",
        },
        // Secondary brand color with variations
        secondary: {
          50: "#f5f6f7",
          100: "#ebedf0",
          200: "#d2d5dd",
          300: "#b3b7c4",
          400: "#606377",
          500: "#343541", // Main secondary color
          600: "#2b2c36",
          700: "#24252d",
          800: "#1e1f24",
          900: "#18181c",
          950: "#121215",
        },
        // Accent color with variations
        accent: {
          50: "#e9eaef",
          100: "#d3d5df",
          200: "#bcbfcf",
          300: "#a6aabf",
          400: "#8f94af",
          500: "#606375", // Main accent color
          600: "#4d4f5e",
          700: "#3a3c47",
          800: "#272830",
          900: "#131419",
          950: "#0a0a0d",
        },
        // Neutral colors for text, backgrounds, etc.
        neutral: {
          50: "#e6e6e6",
          100: "#d9d9d9",
          200: "#bfbfbf",
          300: "#a6a6a6",
          400: "#8c8c8c",
          500: "#121212", // Main neutral color
          600: "#0f0f0f",
          700: "#0c0c0c",
          800: "#090909",
          900: "#060606",
          950: "#030303",
        },
        // Success, error, warning, and info colors
        success: {
          50: "#eef4f7",
          100: "#dde9ef",
          200: "#bbd3df",
          300: "#99bdcf",
          400: "#77a7bf",
          500: "#7590a9", // Main success color
          600: "#5e7387",
          700: "#475665",
          800: "#2f3a44",
          900: "#181d22",
          950: "#0c0e11",
        },
        error: {
          50: "#f9ecec", // Lightest tint of #c95f5f
          100: "#f3d9d9", // Very light tint
          200: "#e8b3b3", // Light tint
          300: "#dd8d8d", // Medium-light tint
          400: "#d27676", // Slight tint
          500: "#c95f5f", // Main error color
          600: "#a14c4c", // Slight shade
          700: "#793939", // Medium shade
          800: "#512626", // Dark shade
          900: "#291313", // Very dark shade
          950: "#150909", // Darkest shade
        },
        warning: {
          50: "#f7ece3", // Lightest tint of #d98e5d
          100: "#f0d9c7", // Very light tint
          200: "#e6b38f", // Light tint
          300: "#e0a176", // Medium-light tint
          400: "#dc9769", // Slight tint
          500: "#d98e5d", // Main warning color
          600: "#b0724a", // Slight shade
          700: "#875638", // Medium shade
          800: "#5d3a25", // Dark shade
          900: "#2e1d13", // Very dark shade
          950: "#170f09", // Darkest shade
        },
        info: {
          50: "#f4eef9", // Lightest tint of #a97bcd
          100: "#e9ddf3", // Very light tint
          200: "#d3bbe7", // Light tint
          300: "#bd99db", // Medium-light tint
          400: "#b38ad4", // Slight tint
          500: "#a97bcd", // Main info color
          600: "#8762a4", // Slight shade
          700: "#654a7b", // Medium shade
          800: "#443152", // Dark shade
          900: "#221929", // Very dark shade
          950: "#110c14", // Darkest shade
        },
        // Background colors
        background: {
          light: "#EBEBEB",
          dark: "#121212",
          paper: "#FFFFFF",
          paperDark: "#1E1E1E",
          subtle: "#F5F5F5",
          subtleDark: "#1A1A1A",
          elevated: "#DBDBDB",
          elevatedDark: "#262626",
          overlay: "rgba(255, 255, 255, 0.8)",
          overlayDark: "rgba(0, 0, 0, 0.8)",
        },
        // Text colors
        text: {
          primary: "#0f172a",
          primaryDark: "#f8fafc",
          secondary: "#475569",
          secondaryDark: "#94a3b8",
          disabled: "#9ca3af",
          disabledDark: "#6b7280",
          link: "#2563eb",
          linkDark: "#60a5fa",
          code: "#6d28d9",
          codeDark: "#a78bfa",
        },
        // Particles colors
        particles: {
          light: "#D3D3D3",
          dark: "#252525",
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
