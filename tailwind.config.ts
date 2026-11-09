import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        background: "#090c10",
        foreground: "#f4f4f6",
        gold: {
          50: "#fff9eb",
          100: "#feefc7",
          200: "#fde08a",
          300: "#fbc743",
          400: "#f5a714",
          500: "#e58a0a",
          600: "#c76705",
          700: "#9e4807",
          800: "#80380d",
          900: "#6d2e0f",
        },
        champagne: {
          light: "#f7e7ce",
          DEFAULT: "#e6c9a2",
          dark: "#b39268",
        },
      },
    },
  },
  plugins: [],
};
export default config;
